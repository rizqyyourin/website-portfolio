<template>
  <div class="absolute inset-0 pointer-events-none overflow-hidden z-0">
    <div ref="containerRef" class="w-full h-full"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const containerRef = ref<HTMLDivElement | null>(null)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let animFrameId: number | null = null
let isVisible = true

// 3D Elements
let terrainMesh: THREE.LineSegments
let originalPositions: Float32Array
let shardsGroup: THREE.Group
let particles: THREE.Points

// Mouse Parallax
let mouseX = 0
let mouseY = 0
let targetMouseX = 0
let targetMouseY = 0

function initThree() {
  if (!containerRef.value) return

  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight

  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x18181b, 0.08)

  camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
  camera.position.set(0, 2, 7)
  camera.lookAt(0, 0, 0)

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  containerRef.value.appendChild(renderer.domElement)

  // 1. Undulating Cyber Grid Terrain
  const gridWidth = 26
  const gridHeight = 18
  const segsX = 36
  const segsY = 24

  const planeGeo = new THREE.PlaneGeometry(gridWidth, gridHeight, segsX, segsY)
  const wireGeo = new THREE.WireframeGeometry(planeGeo)
  const wireMat = new THREE.LineBasicMaterial({
    color: 0xdc2626,
    transparent: true,
    opacity: 0.35,
    linewidth: 1
  })

  terrainMesh = new THREE.LineSegments(wireGeo, wireMat)
  terrainMesh.rotation.x = -Math.PI / 2.2
  terrainMesh.position.y = -2.2
  scene.add(terrainMesh)

  const posAttr = wireGeo.attributes.position as THREE.BufferAttribute
  originalPositions = new Float32Array(posAttr.array.length)
  originalPositions.set(posAttr.array)

  // 2. Floating 3D Background Shards
  shardsGroup = new THREE.Group()
  scene.add(shardsGroup)

  const shardCount = 14
  for (let i = 0; i < shardCount; i++) {
    const isOcta = i % 2 === 0
    const geo = isOcta ? new THREE.OctahedronGeometry(0.18 + Math.random() * 0.15, 0) : new THREE.TetrahedronGeometry(0.2 + Math.random() * 0.15, 0)
    const isRed = Math.random() > 0.4
    const mat = new THREE.MeshBasicMaterial({
      color: isRed ? 0xdc2626 : 0x27272a,
      wireframe: true
    })
    const mesh = new THREE.Mesh(geo, mat)

    mesh.position.set(
      (Math.random() - 0.5) * 16,
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 6 - 2
    )

    mesh.userData = {
      rotSpeed: {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      },
      floatSpeed: 0.005 + Math.random() * 0.008,
      initialY: mesh.position.y,
      offset: Math.random() * Math.PI * 2
    }

    shardsGroup.add(mesh)
  }

  // 3. Metaverse Data Dust Particles
  const pCount = 60
  const pGeo = new THREE.BufferGeometry()
  const pPos = new Float32Array(pCount * 3)
  const pCols = new Float32Array(pCount * 3)

  for (let i = 0; i < pCount; i++) {
    pPos[i * 3] = (Math.random() - 0.5) * 18
    pPos[i * 3 + 1] = (Math.random() - 0.5) * 8
    pPos[i * 3 + 2] = (Math.random() - 0.5) * 8

    const isRed = Math.random() > 0.5
    pCols[i * 3] = isRed ? 0.86 : 1.0
    pCols[i * 3 + 1] = isRed ? 0.15 : 1.0
    pCols[i * 3 + 2] = isRed ? 0.15 : 1.0
  }

  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
  pGeo.setAttribute('color', new THREE.BufferAttribute(pCols, 3))

  const pMat = new THREE.PointsMaterial({
    size: 0.06,
    vertexColors: true,
    transparent: true,
    opacity: 0.6
  })

  particles = new THREE.Points(pGeo, pMat)
  scene.add(particles)

  window.addEventListener('mousemove', onMouseMove, { passive: true })
  animate()
}

function onMouseMove(e: MouseEvent) {
  targetMouseX = (e.clientX / window.innerWidth) * 2 - 1
  targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1
}

let clock = 0
function animate() {
  if (!isVisible) {
    animFrameId = requestAnimationFrame(animate)
    return
  }

  clock += 0.018

  // Parallax Damping
  mouseX += (targetMouseX - mouseX) * 0.05
  mouseY += (targetMouseY - mouseY) * 0.05

  if (camera) {
    camera.position.x = mouseX * 0.6
    camera.position.y = 2 + mouseY * 0.4
    camera.lookAt(0, 0, 0)
  }

  // Wave Terrain Undulation
  if (terrainMesh && originalPositions) {
    const posAttr = terrainMesh.geometry.attributes.position as THREE.BufferAttribute
    const array = posAttr.array as Float32Array

    for (let i = 0; i < array.length / 3; i++) {
      const origX = originalPositions[i * 3]!
      const origY = originalPositions[i * 3 + 1]!

      const wave = Math.sin(origX * 0.4 + clock) * Math.cos(origY * 0.4 + clock * 0.8) * 0.35
      array[i * 3 + 2] = originalPositions[i * 3 + 2]! + wave
    }
    posAttr.needsUpdate = true
  }

  // Animate Shards
  if (shardsGroup) {
    shardsGroup.children.forEach((child: any) => {
      child.rotation.x += child.userData.rotSpeed.x
      child.rotation.y += child.userData.rotSpeed.y
      child.rotation.z += child.userData.rotSpeed.z
      child.position.y = child.userData.initialY + Math.sin(clock * 1.5 + child.userData.offset) * 0.2
    })
  }

  // Animate Particles
  if (particles) {
    const posAttr = particles.geometry.attributes.position as THREE.BufferAttribute
    const array = posAttr.array as Float32Array
    for (let i = 0; i < array.length / 3; i++) {
      array[i * 3 + 1] += 0.008
      if (array[i * 3 + 1] > 4) array[i * 3 + 1] = -4
    }
    posAttr.needsUpdate = true
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera)
  }

  animFrameId = requestAnimationFrame(animate)
}

function onResize() {
  if (!containerRef.value || !renderer || !camera) return
  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  initThree()
  window.addEventListener('resize', onResize)

  if (containerRef.value && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting
      })
    }, { threshold: 0.05 })
    observer.observe(containerRef.value)
  }
})

onUnmounted(() => {
  if (animFrameId) cancelAnimationFrame(animFrameId)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('mousemove', onMouseMove)
  if (observer) observer.disconnect()

  if (renderer) {
    renderer.dispose()
    if (renderer.domElement && renderer.domElement.parentElement) {
      renderer.domElement.parentElement.removeChild(renderer.domElement)
    }
  }
  scene?.traverse((obj: any) => {
    if (obj.geometry) obj.geometry.dispose()
    if (obj.material) {
      if (Array.isArray(obj.material)) {
        obj.material.forEach((m: any) => m.dispose())
      } else {
        obj.material.dispose()
      }
    }
  })
})
</script>

<style scoped>
</style>
