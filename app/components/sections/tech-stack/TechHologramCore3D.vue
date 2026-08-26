<template>
  <div class="relative w-28 h-28 sm:w-36 sm:h-36 shrink-0 select-none">
    <!-- WebGL Canvas -->
    <div
      ref="containerRef"
      class="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
      @mouseleave="onMouseLeave"
      @touchstart.passive="onTouchStart"
      @touchmove.passive="onTouchMove"
      @touchend.passive="onTouchEnd"
    ></div>

    <!-- P5 Corner Accent Marks -->
    <div class="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-red-600 pointer-events-none"></div>
    <div class="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white pointer-events-none"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'

const props = defineProps<{
  stackId: string
}>()

const containerRef = ref<HTMLDivElement | null>(null)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let animFrameId: number | null = null
let isVisible = true

// 3D Matrix Objects
let coreGroup: THREE.Group
let innerMesh: THREE.Mesh
let outerRing1: THREE.LineSegments
let outerRing2: THREE.LineSegments
let particles: THREE.Points

// Interaction State
let isDragging = false
let previousMouse = { x: 0, y: 0 }
let targetRotation = { x: 0.2, y: 0.3 }
let currentRotation = { x: 0.2, y: 0.3 }

function initThree() {
  if (!containerRef.value) return

  const width = containerRef.value.clientWidth || 140
  const height = containerRef.value.clientHeight || 140

  // 1. Scene & Camera
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
  camera.position.z = 4.2

  // 2. Renderer
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  containerRef.value.appendChild(renderer.domElement)

  // 3. Lights
  const ambient = new THREE.AmbientLight(0xffffff, 1.0)
  scene.add(ambient)

  const redLight = new THREE.PointLight(0xdc2626, 3, 10)
  redLight.position.set(2, 2, 2)
  scene.add(redLight)

  // 4. Core Group
  coreGroup = new THREE.Group()
  scene.add(coreGroup)

  // Inner Polyhedral Core
  const coreGeo = new THREE.OctahedronGeometry(0.85, 0)
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x09090b,
    metalness: 0.9,
    roughness: 0.2
  })
  innerMesh = new THREE.Mesh(coreGeo, coreMat)
  coreGroup.add(innerMesh)

  // Inner Crimson Wireframe Edges
  const wireGeo = new THREE.EdgesGeometry(coreGeo)
  const wireMat = new THREE.LineBasicMaterial({ color: 0xdc2626, linewidth: 2 })
  const wire = new THREE.LineSegments(wireGeo, wireMat)
  innerMesh.add(wire)

  // Outer Ring 1 (Gyroscope Ring)
  const ring1Geo = new THREE.RingGeometry(1.25, 1.28, 32)
  const ring1WireGeo = new THREE.EdgesGeometry(ring1Geo)
  const ring1Mat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1.5 })
  outerRing1 = new THREE.LineSegments(ring1WireGeo, ring1Mat)
  outerRing1.rotation.x = Math.PI / 3
  coreGroup.add(outerRing1)

  // Outer Ring 2 (Orthogonal Ring)
  const ring2Geo = new THREE.RingGeometry(1.4, 1.43, 32)
  const ring2WireGeo = new THREE.EdgesGeometry(ring2Geo)
  const ring2Mat = new THREE.LineBasicMaterial({ color: 0xdc2626, linewidth: 1.5 })
  outerRing2 = new THREE.LineSegments(ring2WireGeo, ring2Mat)
  outerRing2.rotation.y = Math.PI / 4
  coreGroup.add(outerRing2)

  // Orbiting Matrix Sparks
  const count = 36
  const pGeo = new THREE.BufferGeometry()
  const pPos = new Float32Array(count * 3)
  const pColors = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const r = 1.0 + Math.random() * 0.6
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(Math.random() * 2 - 1)

    pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    pPos[i * 3 + 2] = r * Math.cos(phi)

    const isRed = Math.random() > 0.4
    pColors[i * 3] = isRed ? 0.86 : 1.0
    pColors[i * 3 + 1] = isRed ? 0.15 : 1.0
    pColors[i * 3 + 2] = isRed ? 0.15 : 1.0
  }

  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
  pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3))

  const pMat = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.9
  })

  particles = new THREE.Points(pGeo, pMat)
  coreGroup.add(particles)

  animate()
}

function onMouseDown(e: MouseEvent) {
  isDragging = true
  previousMouse = { x: e.clientX, y: e.clientY }
}

function onMouseMove(e: MouseEvent) {
  if (!isDragging) return
  const deltaX = e.clientX - previousMouse.x
  const deltaY = e.clientY - previousMouse.y

  targetRotation.y += deltaX * 0.02
  targetRotation.x += deltaY * 0.02

  previousMouse = { x: e.clientX, y: e.clientY }
}

function onMouseUp() {
  isDragging = false
}

function onMouseLeave() {
  isDragging = false
}

function onTouchStart(e: TouchEvent) {
  if (e.touches.length === 1) {
    isDragging = true
    previousMouse = { x: e.touches[0]!.clientX, y: e.touches[0]!.clientY }
  }
}

function onTouchMove(e: TouchEvent) {
  if (!isDragging || e.touches.length !== 1) return
  const deltaX = e.touches[0]!.clientX - previousMouse.x
  const deltaY = e.touches[0]!.clientY - previousMouse.y

  targetRotation.y += deltaX * 0.025
  targetRotation.x += deltaY * 0.025

  previousMouse = { x: e.touches[0]!.clientX, y: e.touches[0]!.clientY }
}

function onTouchEnd() {
  isDragging = false
}

let clock = 0
function animate() {
  if (!isVisible) {
    animFrameId = requestAnimationFrame(animate)
    return
  }

  clock += 0.02

  // Auto idle rotation
  targetRotation.y += 0.008
  targetRotation.x += 0.003

  currentRotation.x += (targetRotation.x - currentRotation.x) * 0.1
  currentRotation.y += (targetRotation.y - currentRotation.y) * 0.1

  if (coreGroup) {
    coreGroup.rotation.x = currentRotation.x
    coreGroup.rotation.y = currentRotation.y
  }

  if (innerMesh) {
    innerMesh.rotation.y += 0.015
    innerMesh.rotation.z += 0.01
  }

  if (outerRing1) {
    outerRing1.rotation.z += 0.02
  }

  if (outerRing2) {
    outerRing2.rotation.x -= 0.015
  }

  if (particles) {
    particles.rotation.y = -clock * 0.3
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera)
  }

  animFrameId = requestAnimationFrame(animate)
}

function onResize() {
  if (!containerRef.value || !renderer || !camera) return
  const width = containerRef.value.clientWidth || 140
  const height = containerRef.value.clientHeight || 140
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

watch(() => props.stackId, () => {
  // Pulse animation on stack change
  targetRotation.y += Math.PI * 0.8
  targetRotation.x += 0.4
})

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
