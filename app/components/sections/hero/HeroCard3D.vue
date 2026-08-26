<template>
  <div class="relative w-full max-w-[420px] h-[520px] mx-auto select-none perspective-1000">
    
    <!-- 3D WebGL Canvas Container -->
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
      @click="onClickCard"
    ></div>

    <!-- Authentic Tech Stack Logo Badges (Fixed positions with real image logos, no circular spinning) -->
    <div class="absolute inset-0 pointer-events-none z-30">
      <!-- Laravel (Top Right) -->
      <div class="absolute -right-6 top-8 w-14 h-14 bg-white rounded-full flex items-center justify-center border-4 border-black animate-float-delay-1 shadow-[4px_4px_0px_0px_#dc2626] p-2">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/3840px-Laravel.svg.png" alt="Laravel logo" class="w-full h-full object-contain" />
      </div>

      <!-- PHP (Bottom Left) -->
      <div class="absolute -left-6 bottom-16 w-14 h-14 bg-white rounded-full flex items-center justify-center border-4 border-black animate-float-delay-2 shadow-[4px_4px_0px_0px_#777bb4] p-2">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/1280px-PHP-logo.svg.png" alt="PHP logo" class="w-full h-full object-contain" />
      </div>

      <!-- JS (Top Left) -->
      <div class="absolute -left-6 top-8 w-12 h-12 bg-white rounded-full flex items-center justify-center border-4 border-black animate-float-delay-3 shadow-[4px_4px_0px_0px_#f0db4f] p-1.5">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="JavaScript logo" class="w-full h-full object-contain" />
      </div>

      <!-- Python (Bottom Right) -->
      <div class="absolute -right-4 bottom-20 w-14 h-14 bg-white rounded-full flex items-center justify-center border-4 border-black animate-float-delay-1 shadow-[4px_4px_0px_0px_#3776ab] p-2">
        <img src="https://images.icon-icons.com/2699/PNG/512/python_logo_icon_168886.png" alt="Python logo" class="w-full h-full object-contain" />
      </div>

      <!-- Go (Top Center-Right) -->
      <div class="absolute right-14 -top-6 w-12 h-12 bg-white rounded-full flex items-center justify-center border-4 border-black animate-float-delay-2 shadow-[4px_4px_0px_0px_#00add8] p-1.5">
        <img src="https://go.dev/blog/go-brand/Go-Logo/PNG/Go-Logo_LightBlue.png" alt="Go logo" class="w-full h-full object-contain" />
      </div>

      <!-- Nuxt (Bottom Center) -->
      <div class="absolute left-1/2 -bottom-6 -translate-x-1/2 w-14 h-14 bg-white rounded-full flex items-center justify-center border-4 border-black animate-float-delay-3 shadow-[4px_4px_0px_0px_#00c58e] p-2">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Nuxt_logo.svg/960px-Nuxt_logo.svg.png" alt="Nuxt logo" class="w-full h-full object-contain" />
      </div>

      <!-- Vue (Left Center) -->
      <div class="absolute -left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full flex items-center justify-center border-4 border-black animate-float-delay-1 shadow-[4px_4px_0px_0px_#42b883] p-2">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/3840px-Vue.js_Logo_2.svg.png" alt="Vue.js logo" class="w-full h-full object-contain" />
      </div>

      <!-- React (Right Center) -->
      <div class="absolute -right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full flex items-center justify-center border-4 border-black animate-float-delay-2 shadow-[4px_4px_0px_0px_#61dafb] p-2">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/960px-React-icon.svg.png" alt="React logo" class="w-full h-full object-contain" />
      </div>

      <!-- Next.js (Top Center-Left) -->
      <div class="absolute left-12 -top-6 w-12 h-12 bg-white rounded-full flex items-center justify-center border-4 border-black animate-float-delay-3 shadow-[4px_4px_0px_0px_#000000] p-1.5">
        <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/nextjs-icon.png" alt="Next.js logo" class="w-full h-full object-contain" />
      </div>
    </div>
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

// 3D Objects
let cardGroup: THREE.Group
let cardMesh: THREE.Mesh
let edgeMesh: THREE.LineSegments
let shardsGroup: THREE.Group
let particles: THREE.Points

// Interaction State
let isDragging = false
let previousMousePosition = { x: 0, y: 0 }
let targetRotation = { x: 0.08, y: -0.2 }
let currentRotation = { x: 0.08, y: -0.2 }
let mouseParallax = { x: 0, y: 0 }
let isFlipped = false
let flipTargetAngle = 0
let flipCurrentAngle = 0

// Shards animation data
interface ShardData {
  mesh: THREE.Mesh
  edges: THREE.LineSegments
  rotSpeed: { x: number; y: number; z: number }
  orbitRadius: number
  orbitSpeed: number
  orbitAngle: number
  orbitY: number
}
const shardsData: ShardData[] = []

// Canvas Texture Generator for Front Card
function createFrontCardTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 600
  canvas.height = 840
  const ctx = canvas.getContext('2d')!

  // Background Dark Gradient
  const grad = ctx.createLinearGradient(0, 0, 600, 840)
  grad.addColorStop(0, '#09090b')
  grad.addColorStop(0.5, '#18181b')
  grad.addColorStop(1, '#000000')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 600, 840)

  // P5 Halftone / Diagonal Red Stripes Accent
  ctx.save()
  ctx.fillStyle = 'rgba(220, 38, 38, 0.18)'
  for (let i = -800; i < 1400; i += 32) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i + 400, 840)
    ctx.lineTo(i + 418, 840)
    ctx.lineTo(i + 18, 0)
    ctx.closePath()
    ctx.fill()
  }
  ctx.restore()

  // Red Dramatic Slash Shape
  ctx.save()
  ctx.fillStyle = '#dc2626'
  ctx.beginPath()
  ctx.moveTo(0, 520)
  ctx.lineTo(600, 360)
  ctx.lineTo(600, 840)
  ctx.lineTo(0, 840)
  ctx.closePath()
  ctx.fill()
  ctx.restore()

  // Outer Border Box
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 14
  ctx.strokeRect(18, 18, 564, 804)

  ctx.strokeStyle = '#dc2626'
  ctx.lineWidth = 4
  ctx.strokeRect(32, 32, 536, 776)

  // Header Banner Skew
  ctx.save()
  ctx.transform(1, 0, -0.2, 1, 60, 60)
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, 320, 48)
  ctx.fillStyle = '#000000'
  ctx.font = '900 24px "Segoe UI", sans-serif'
  ctx.fillText('FULLSTACK DEV', 20, 34)
  ctx.restore()

  // Big Name Text
  ctx.save()
  ctx.fillStyle = '#ffffff'
  ctx.font = '900 72px "Segoe UI", sans-serif'
  ctx.fillText('YOURIN', 56, 188)
  ctx.restore()

  // Profile Silhouette Frame
  ctx.save()
  ctx.fillStyle = '#18181b'
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 6
  ctx.strokeRect(60, 240, 480, 420)
  ctx.fillRect(60, 240, 480, 420)

  // Load and draw profile image
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.src = '/images/profile.jpg'
  img.onload = () => {
    ctx.save()
    ctx.drawImage(img, 70, 250, 460, 400)
    // Red tint overlay
    const tint = ctx.createLinearGradient(0, 250, 0, 650)
    tint.addColorStop(0, 'rgba(220, 38, 38, 0)')
    tint.addColorStop(1, 'rgba(220, 38, 38, 0.45)')
    ctx.fillStyle = tint
    ctx.fillRect(70, 250, 460, 400)
    ctx.restore()
    texture.needsUpdate = true
  }

  // Footer Tagline
  ctx.fillStyle = '#ffffff'
  ctx.font = '900 26px "Segoe UI", sans-serif'
  ctx.fillText('TAKE YOUR CODE TO NEXT LEVEL', 60, 720)

  ctx.fillStyle = '#000000'
  ctx.font = 'bold 16px monospace'
  ctx.fillText('// METAVERSE NAVIGATOR V4.3', 60, 760)

  ctx.restore()

  const texture = new THREE.CanvasTexture(canvas)
  texture.anisotropy = 8
  return texture
}

// Canvas Texture Generator for Back Card (Persona 5 Calling Card Style)
function createBackCardTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 600
  canvas.height = 840
  const ctx = canvas.getContext('2d')!

  // Deep Crimson Background
  ctx.fillStyle = '#dc2626'
  ctx.fillRect(0, 0, 600, 840)

  // Halftone / Black Starburst Pattern
  ctx.fillStyle = '#000000'
  ctx.beginPath()
  ctx.moveTo(300, 420)
  for (let i = 0; i < 16; i++) {
    const angle = (i * Math.PI) / 8
    const r = i % 2 === 0 ? 550 : 220
    ctx.lineTo(300 + Math.cos(angle) * r, 420 + Math.sin(angle) * r)
  }
  ctx.closePath()
  ctx.fill()

  // White Outer Border
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 16
  ctx.strokeRect(20, 20, 560, 800)

  // Ransom Note Letters Top
  const words = [
    { text: 'TAKE', bg: '#ffffff', color: '#000000', rot: -0.08, x: 120, y: 150 },
    { text: 'YOUR', bg: '#000000', color: '#dc2626', rot: 0.05, x: 260, y: 140 },
    { text: 'HEART', bg: '#ffffff', color: '#dc2626', rot: -0.04, x: 400, y: 155 }
  ]

  words.forEach(w => {
    ctx.save()
    ctx.translate(w.x, w.y)
    ctx.rotate(w.rot)
    ctx.fillStyle = w.bg
    ctx.fillRect(-60, -35, 120, 70)
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 4
    ctx.strokeRect(-60, -35, 120, 70)
    ctx.fillStyle = w.color
    ctx.font = '900 32px "Segoe UI", sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(w.text, 0, 0)
    ctx.restore()
  })

  // Center Emblem: Large Phantom Mask Silhouette
  ctx.save()
  ctx.translate(300, 440)
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.moveTo(-160, -20)
  ctx.bezierCurveTo(-160, -100, 160, -100, 160, -20)
  ctx.bezierCurveTo(160, 80, 60, 130, 0, 130)
  ctx.bezierCurveTo(-60, 130, -160, 80, -160, -20)
  ctx.closePath()
  ctx.fill()
  ctx.strokeStyle = '#000000'
  ctx.lineWidth = 8
  ctx.stroke()

  // Mask Eye Slits
  ctx.fillStyle = '#dc2626'
  ctx.beginPath()
  ctx.ellipse(-65, 0, 36, 18, -0.3, 0, Math.PI * 2)
  ctx.ellipse(65, 0, 36, 18, 0.3, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()

  // Bottom Signature
  ctx.save()
  ctx.fillStyle = '#ffffff'
  ctx.font = '900 38px "Segoe UI", sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('THE PHANTOM DEV', 300, 680)

  ctx.fillStyle = '#000000'
  ctx.fillRect(160, 715, 280, 4)

  ctx.fillStyle = '#fef08a'
  ctx.font = 'bold 20px monospace'
  ctx.fillText('YOURIN.MY.ID', 300, 755)
  ctx.restore()

  const texture = new THREE.CanvasTexture(canvas)
  texture.anisotropy = 8
  return texture
}

function initThree() {
  if (!containerRef.value) return

  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight

  // 1. Scene
  scene = new THREE.Scene()

  // 2. Camera
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
  camera.position.z = 7.2

  // 3. Renderer
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = false
  containerRef.value.appendChild(renderer.domElement)

  // 4. Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
  scene.add(ambientLight)

  const redLight = new THREE.PointLight(0xdc2626, 3, 20)
  redLight.position.set(4, 3, 4)
  scene.add(redLight)

  const whiteLight = new THREE.DirectionalLight(0xffffff, 1.5)
  whiteLight.position.set(-4, 5, 5)
  scene.add(whiteLight)

  // 5. Main Card Group
  cardGroup = new THREE.Group()
  scene.add(cardGroup)

  const cardWidth = 3.0
  const cardHeight = 4.2
  const cardDepth = 0.08
  const cardGeo = new THREE.BoxGeometry(cardWidth, cardHeight, cardDepth)

  const frontTexture = createFrontCardTexture()
  const backTexture = createBackCardTexture()

  const sideMaterial = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.4 })
  const topMaterial = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.3 })
  const frontMaterial = new THREE.MeshBasicMaterial({ map: frontTexture })
  const backMaterial = new THREE.MeshBasicMaterial({ map: backTexture })

  const materials = [
    sideMaterial,
    sideMaterial,
    topMaterial,
    topMaterial,
    frontMaterial,
    backMaterial
  ]

  cardMesh = new THREE.Mesh(cardGeo, materials)
  cardGroup.add(cardMesh)

  // White Card Outline Edges
  const edgeGeo = new THREE.EdgesGeometry(cardGeo)
  const edgeMat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 })
  edgeMesh = new THREE.LineSegments(edgeGeo, edgeMat)
  cardMesh.add(edgeMesh)

  // 6. Orbiting 3D Metaverse Shards
  shardsGroup = new THREE.Group()
  scene.add(shardsGroup)

  const shardGeometries = [
    new THREE.OctahedronGeometry(0.22, 0),
    new THREE.TetrahedronGeometry(0.24, 0),
    new THREE.IcosahedronGeometry(0.20, 0),
    new THREE.OctahedronGeometry(0.18, 0),
    new THREE.TetrahedronGeometry(0.20, 0)
  ]

  shardGeometries.forEach((geo, i) => {
    const isRed = i % 2 === 0
    const mat = new THREE.MeshStandardMaterial({
      color: isRed ? 0xdc2626 : 0x27272a,
      roughness: 0.2,
      metalness: 0.8
    })

    const mesh = new THREE.Mesh(geo, mat)
    const wireGeo = new THREE.EdgesGeometry(geo)
    const wireMat = new THREE.LineBasicMaterial({ color: isRed ? 0xffffff : 0xef4444, linewidth: 2 })
    const wire = new THREE.LineSegments(wireGeo, wireMat)
    mesh.add(wire)

    const orbitRadius = 2.4 + (i % 2) * 0.4
    const orbitSpeed = (0.006 + (i % 3) * 0.003) * (i % 2 === 0 ? 1 : -1)
    const orbitAngle = (i / shardGeometries.length) * Math.PI * 2
    const orbitY = ((i - 2) / 2) * 1.6

    mesh.position.set(
      Math.cos(orbitAngle) * orbitRadius,
      orbitY,
      Math.sin(orbitAngle) * orbitRadius
    )

    shardsGroup.add(mesh)

    shardsData.push({
      mesh,
      edges: wire,
      rotSpeed: {
        x: (Math.random() - 0.5) * 0.03,
        y: (Math.random() - 0.5) * 0.03,
        z: (Math.random() - 0.5) * 0.03
      },
      orbitRadius,
      orbitSpeed,
      orbitAngle,
      orbitY
    })
  })

  // 7. Rising Metaverse Ember Particles
  const particleCount = 80
  const pGeometry = new THREE.BufferGeometry()
  const pPositions = new Float32Array(particleCount * 3)
  const pColors = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    pPositions[i * 3] = (Math.random() - 0.5) * 8
    pPositions[i * 3 + 1] = (Math.random() - 0.5) * 8
    pPositions[i * 3 + 2] = (Math.random() - 0.5) * 5

    const isCrimson = Math.random() > 0.35
    if (isCrimson) {
      pColors[i * 3] = 0.86
      pColors[i * 3 + 1] = 0.15
      pColors[i * 3 + 2] = 0.15
    } else {
      pColors[i * 3] = 1.0
      pColors[i * 3 + 1] = 1.0
      pColors[i * 3 + 2] = 1.0
    }
  }

  pGeometry.setAttribute('position', new THREE.BufferAttribute(pPositions, 3))
  pGeometry.setAttribute('color', new THREE.BufferAttribute(pColors, 3))

  const pMaterial = new THREE.PointsMaterial({
    size: 0.065,
    vertexColors: true,
    transparent: true,
    opacity: 0.85
  })

  particles = new THREE.Points(pGeometry, pMaterial)
  scene.add(particles)

  // 8. Global Mouse Parallax Tracker
  window.addEventListener('mousemove', onGlobalMouseMove, { passive: true })

  // 9. Start Animation Loop
  animate()
}

function onGlobalMouseMove(e: MouseEvent) {
  const normX = (e.clientX / window.innerWidth) * 2 - 1
  const normY = -(e.clientY / window.innerHeight) * 2 + 1
  mouseParallax.x = normX * 0.3
  mouseParallax.y = normY * 0.2
}

function onMouseDown(e: MouseEvent) {
  isDragging = true
  previousMousePosition = { x: e.clientX, y: e.clientY }
}

function onMouseMove(e: MouseEvent) {
  if (!isDragging) return
  const deltaX = e.clientX - previousMousePosition.x
  const deltaY = e.clientY - previousMousePosition.y

  targetRotation.y += deltaX * 0.012
  targetRotation.x += deltaY * 0.012

  targetRotation.x = Math.max(-0.5, Math.min(0.5, targetRotation.x))

  previousMousePosition = { x: e.clientX, y: e.clientY }
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
    previousMousePosition = { x: e.touches[0]!.clientX, y: e.touches[0]!.clientY }
  }
}

function onTouchMove(e: TouchEvent) {
  if (!isDragging || e.touches.length !== 1) return
  const deltaX = e.touches[0]!.clientX - previousMousePosition.x
  const deltaY = e.touches[0]!.clientY - previousMousePosition.y

  targetRotation.y += deltaX * 0.015
  targetRotation.x += deltaY * 0.015
  targetRotation.x = Math.max(-0.5, Math.min(0.5, targetRotation.x))

  previousMousePosition = { x: e.touches[0]!.clientX, y: e.touches[0]!.clientY }
}

function onTouchEnd() {
  isDragging = false
}

function onClickCard() {
  if (Math.abs(currentRotation.x - targetRotation.x) > 0.08 || Math.abs(currentRotation.y - targetRotation.y) > 0.08) {
    return
  }
  isFlipped = !isFlipped
  flipTargetAngle += Math.PI
}

let clock = 0
function animate() {
  if (!isVisible) {
    animFrameId = requestAnimationFrame(animate)
    return
  }

  clock += 0.016

  currentRotation.x += (targetRotation.x - currentRotation.x) * 0.08
  currentRotation.y += (targetRotation.y - currentRotation.y) * 0.08
  flipCurrentAngle += (flipTargetAngle - flipCurrentAngle) * 0.08

  const bobbing = Math.sin(clock * 1.6) * 0.1

  if (cardGroup) {
    cardGroup.rotation.x = currentRotation.x + mouseParallax.y * 0.35
    cardGroup.rotation.y = currentRotation.y + flipCurrentAngle + mouseParallax.x * 0.55
    cardGroup.position.y = bobbing
  }

  shardsData.forEach(s => {
    s.orbitAngle += s.orbitSpeed
    s.mesh.position.x = Math.cos(s.orbitAngle) * s.orbitRadius
    s.mesh.position.z = Math.sin(s.orbitAngle) * s.orbitRadius
    s.mesh.position.y = s.orbitY + Math.sin(clock * 2 + s.orbitRadius) * 0.12

    s.mesh.rotation.x += s.rotSpeed.x
    s.mesh.rotation.y += s.rotSpeed.y
    s.mesh.rotation.z += s.rotSpeed.z
  })

  if (particles) {
    const pos = particles.geometry.attributes.position as THREE.BufferAttribute
    const array = pos.array as Float32Array
    for (let i = 0; i < array.length / 3; i++) {
      array[i * 3 + 1] += 0.012
      if (array[i * 3 + 1] > 4.5) {
        array[i * 3 + 1] = -4.5
      }
      array[i * 3] += Math.sin(clock + i) * 0.0025
    }
    pos.needsUpdate = true
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera)
  }

  animFrameId = requestAnimationFrame(animate)
}

function onWindowResize() {
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
  window.addEventListener('resize', onWindowResize)

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
  window.removeEventListener('resize', onWindowResize)
  window.removeEventListener('mousemove', onGlobalMouseMove)
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
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

.animate-float-delay-1 {
  animation: float 4s ease-in-out infinite;
}
.animate-float-delay-2 {
  animation: float 5s ease-in-out infinite 1s;
}
.animate-float-delay-3 {
  animation: float 6s ease-in-out infinite 2s;
}
</style>
