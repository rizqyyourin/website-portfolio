<template>
  <div class="relative w-full h-[220px] sm:h-[260px] select-none perspective-1000">
    <!-- WebGL 3D Canvas -->
    <div
      ref="containerRef"
      class="w-full h-full cursor-pointer relative z-10"
      @mousemove="onMouseMove"
      @mouseleave="onMouseLeave"
      @click="onClick"
      @touchstart.passive="onTouchStart"
      @touchend.passive="onTouchEnd"
    ></div>

    <!-- Active Hovered Item Label (Floating HUD bottom) -->
    <div
      v-if="hoveredItemName"
      class="absolute bottom-1 left-1/2 -translate-x-1/2 z-20 pointer-events-none transform -skew-x-12 bg-black/90 border border-white px-3 py-0.5 shadow-[2px_2px_0px_0px_rgba(220,38,38,1)] transition-all"
    >
      <span class="text-xs font-black italic uppercase tracking-wider text-white">
        {{ hoveredItemName }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'

interface TechItem {
  name: string
  logo: string
}

const props = defineProps<{
  items: TechItem[]
}>()

const containerRef = ref<HTMLDivElement | null>(null)
const hoveredItemName = ref<string | null>(null)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let animFrameId: number | null = null
let isVisible = true

// Raycasting for individual card hover & click
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2(-1000, -1000)

let cardsGroup: THREE.Group
let hoveredCardIndex: number | null = null
let flippedCardIndex: number | null = null

interface CardObject {
  group: THREE.Group
  mesh: THREE.Mesh
  edge: THREE.LineSegments
  basePosition: THREE.Vector3
  targetPosition: THREE.Vector3
  currentPosition: THREE.Vector3
  targetRotation: THREE.Euler
  currentRotation: THREE.Euler
  flipAngle: number
  targetFlipAngle: number
  item: TechItem
}

const cardObjects: CardObject[] = []

function createFrontCardCanvas(item: TechItem): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 300
  canvas.height = 420
  const ctx = canvas.getContext('2d')!

  // Card Base
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, 300, 420)

  // Inner Black Frame
  ctx.fillStyle = '#09090b'
  ctx.fillRect(10, 10, 280, 400)

  // P5 Red Diagonal Slash Accents
  ctx.save()
  ctx.fillStyle = 'rgba(220, 38, 38, 0.25)'
  for (let i = -200; i < 600; i += 24) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i + 150, 420)
    ctx.lineTo(i + 160, 420)
    ctx.lineTo(i + 10, 0)
    ctx.closePath()
    ctx.fill()
  }
  ctx.restore()

  // Inner White Logo Pad
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(25, 35, 250, 270)
  ctx.strokeStyle = '#000000'
  ctx.lineWidth = 4
  ctx.strokeRect(25, 35, 250, 270)

  // Load Logo Image
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.src = item.logo
  img.onload = () => {
    ctx.save()
    // Center & Fit image in logo pad
    const padX = 40
    const padY = 50
    const padW = 220
    const padH = 240
    ctx.drawImage(img, padX, padY, padW, padH)
    ctx.restore()
    texture.needsUpdate = true
  }

  // Bottom Name Banner
  ctx.save()
  ctx.transform(1, 0, -0.15, 1, 30, 325)
  ctx.fillStyle = '#dc2626'
  ctx.fillRect(0, 0, 240, 55)
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 3
  ctx.strokeRect(0, 0, 240, 55)

  ctx.fillStyle = '#ffffff'
  ctx.font = '900 22px "Segoe UI", sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(item.name.toUpperCase(), 120, 28)
  ctx.restore()

  // White Border
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 6
  ctx.strokeRect(4, 4, 292, 412)

  const texture = new THREE.CanvasTexture(canvas)
  texture.anisotropy = 8
  return texture
}

function createBackCardCanvas(item: TechItem): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 300
  canvas.height = 420
  const ctx = canvas.getContext('2d')!

  // Deep Red Background
  ctx.fillStyle = '#dc2626'
  ctx.fillRect(0, 0, 300, 420)

  // Starburst
  ctx.fillStyle = '#000000'
  ctx.beginPath()
  ctx.moveTo(150, 210)
  for (let i = 0; i < 16; i++) {
    const angle = (i * Math.PI) / 8
    const r = i % 2 === 0 ? 250 : 100
    ctx.lineTo(150 + Math.cos(angle) * r, 210 + Math.sin(angle) * r)
  }
  ctx.closePath()
  ctx.fill()

  // White Border
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 8
  ctx.strokeRect(8, 8, 284, 404)

  // Center Emblem
  ctx.save()
  ctx.translate(150, 190)
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.moveTo(-70, -10)
  ctx.bezierCurveTo(-70, -50, 70, -50, 70, -10)
  ctx.bezierCurveTo(70, 40, 30, 60, 0, 60)
  ctx.bezierCurveTo(-30, 60, -70, 40, -70, -10)
  ctx.closePath()
  ctx.fill()
  ctx.strokeStyle = '#000000'
  ctx.lineWidth = 4
  ctx.stroke()
  ctx.restore()

  // Bottom Label
  ctx.fillStyle = '#ffffff'
  ctx.font = '900 20px "Segoe UI", sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText(item.name.toUpperCase(), 150, 330)

  ctx.fillStyle = '#fef08a'
  ctx.font = 'bold 12px monospace'
  ctx.fillText('ARSENAL WEAPON', 150, 360)

  const texture = new THREE.CanvasTexture(canvas)
  texture.anisotropy = 8
  return texture
}

function buildCards() {
  if (!scene) return

  // Clean old cards
  if (cardsGroup) {
    scene.remove(cardsGroup)
    cardObjects.forEach(obj => {
      obj.mesh.geometry.dispose()
      if (Array.isArray(obj.mesh.material)) {
        obj.mesh.material.forEach((m: any) => m.dispose())
      }
    })
    cardObjects.length = 0
  }

  cardsGroup = new THREE.Group()
  scene.add(cardsGroup)

  const count = props.items.length
  const cardWidth = 1.35
  const cardHeight = 1.9
  const cardDepth = 0.04
  const spacing = 1.6

  const totalWidth = (count - 1) * spacing
  const startX = -totalWidth / 2

  props.items.forEach((item, index) => {
    const group = new THREE.Group()

    const cardGeo = new THREE.BoxGeometry(cardWidth, cardHeight, cardDepth)
    const frontTex = createFrontCardCanvas(item)
    const backTex = createBackCardCanvas(item)

    const sideMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.3 })
    const topMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.3 })
    const frontMat = new THREE.MeshBasicMaterial({ map: frontTex })
    const backMat = new THREE.MeshBasicMaterial({ map: backTex })

    const materials = [sideMat, sideMat, topMat, topMat, frontMat, backMat]
    const mesh = new THREE.Mesh(cardGeo, materials)
    mesh.userData = { cardIndex: index, itemName: item.name }
    group.add(mesh)

    // Outline
    const edgeGeo = new THREE.EdgesGeometry(cardGeo)
    const edgeMat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 })
    const edge = new THREE.LineSegments(edgeGeo, edgeMat)
    mesh.add(edge)

    const posX = startX + index * spacing
    // Slight fan curve
    const rotZ = ((index - (count - 1) / 2) / (count || 1)) * -0.05
    const posY = 0

    group.position.set(posX, posY, 0)
    group.rotation.set(0, 0, rotZ)

    cardsGroup.add(group)

    cardObjects.push({
      group,
      mesh,
      edge,
      basePosition: new THREE.Vector3(posX, posY, 0),
      targetPosition: new THREE.Vector3(posX, posY, 0),
      currentPosition: new THREE.Vector3(posX, posY, 0),
      targetRotation: new THREE.Euler(0, 0, rotZ),
      currentRotation: new THREE.Euler(0, 0, rotZ),
      flipAngle: 0,
      targetFlipAngle: 0,
      item
    })
  })
}

function initThree() {
  if (!containerRef.value) return

  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100)
  camera.position.z = 5.2

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  containerRef.value.appendChild(renderer.domElement)

  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
  scene.add(ambientLight)

  const redPointLight = new THREE.PointLight(0xdc2626, 2.5, 10)
  redPointLight.position.set(2, 2, 3)
  scene.add(redPointLight)

  const dirLight = new THREE.DirectionalLight(0xffffff, 1.0)
  dirLight.position.set(-3, 3, 4)
  scene.add(dirLight)

  buildCards()
  animate()
}

function onMouseMove(e: MouseEvent) {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
}

function onMouseLeave() {
  mouse.x = -1000
  mouse.y = -1000
  hoveredCardIndex = null
  hoveredItemName.value = null
}

function onClick() {
  if (hoveredCardIndex !== null && cardObjects[hoveredCardIndex]) {
    const card = cardObjects[hoveredCardIndex]
    card.targetFlipAngle += Math.PI
    flippedCardIndex = hoveredCardIndex
  }
}

let touchStartTime = 0
function onTouchStart(e: TouchEvent) {
  if (!containerRef.value || e.touches.length !== 1) return
  touchStartTime = Date.now()
  const rect = containerRef.value.getBoundingClientRect()
  mouse.x = ((e.touches[0]!.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((e.touches[0]!.clientY - rect.top) / rect.height) * 2 + 1
}

function onTouchEnd() {
  if (Date.now() - touchStartTime < 300) {
    onClick()
  }
  setTimeout(() => {
    onMouseLeave()
  }, 1200)
}

let clock = 0
function animate() {
  if (!isVisible) {
    animFrameId = requestAnimationFrame(animate)
    return
  }

  clock += 0.016

  // Raycasting to find hovered card
  if (camera && cardsGroup) {
    raycaster.setFromCamera(mouse, camera)
    const meshes = cardObjects.map(c => c.mesh)
    const intersects = raycaster.intersectObjects(meshes)

    if (intersects.length > 0) {
      const idx = intersects[0]!.object.userData.cardIndex as number
      hoveredCardIndex = idx
      hoveredItemName.value = intersects[0]!.object.userData.itemName as string
    } else {
      hoveredCardIndex = null
      hoveredItemName.value = null
    }
  }

  // Update card positions & rotations
  cardObjects.forEach((card, index) => {
    const isHovered = hoveredCardIndex === index
    const bob = Math.sin(clock * 2 + index * 0.8) * 0.05

    // Hover effect: elevate forward and tilt
    if (isHovered) {
      card.targetPosition.z = 0.5
      card.targetPosition.y = card.basePosition.y + 0.12
      card.edge.material = new THREE.LineBasicMaterial({ color: 0xdc2626, linewidth: 3 })
    } else {
      card.targetPosition.z = 0
      card.targetPosition.y = card.basePosition.y + bob
      card.edge.material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 })
    }

    // Interpolation
    card.currentPosition.lerp(card.targetPosition, 0.1)
    card.group.position.copy(card.currentPosition)

    card.flipAngle += (card.targetFlipAngle - card.flipAngle) * 0.1
    card.group.rotation.y = card.flipAngle
  })

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

watch(() => props.items, () => {
  buildCards()
}, { deep: true })

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
