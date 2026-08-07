<template>
  <div class="relative w-full overflow-x-auto pb-4 select-none">
    
    <!-- Skill Tree Container Frame (Vertical Tree Layout) -->
    <div 
      ref="canvasContainer"
      class="relative w-full min-h-[380px] p-3 sm:p-8 bg-black/80 border-2 border-white/20 rounded-none backdrop-blur-md min-w-[340px]"
    >
      <!-- Background P5 Grid Pattern -->
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none"></div>

      <!-- SVG Path Overlay Layer (Vertical Connections - z-20 so dots & lines are never clipped) -->
      <svg 
        class="absolute inset-0 w-full h-full pointer-events-none z-20"
        :viewBox="`0 0 ${canvasWidth} ${canvasHeight}`"
      >
        <defs>
          <filter id="p5-tree-glow-v" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- Base / Inactive Lines -->
        <g>
          <template v-for="conn in computedPaths" :key="`base-${conn.from}-${conn.to}`">
            <path 
              :d="conn.path" 
              fill="none" 
              stroke="#52525b" 
              stroke-width="2"
              stroke-linecap="round"
            />
            <!-- Start Node Connection Dot -->
            <circle 
              :cx="conn.startX" 
              :cy="conn.startY" 
              r="3.5" 
              fill="#71717a" 
            />
            <!-- End Node Connection Dot -->
            <circle 
              :cx="conn.endX" 
              :cy="conn.endY" 
              r="3.5" 
              fill="#a1a1aa" 
            />
          </template>
        </g>

        <!-- Active Glowing Lines (Rendered on top on hover) -->
        <g v-if="hoveredNodeId">
          <template v-for="conn in activePaths" :key="`active-${conn.from}-${conn.to}`">
            <path 
              :d="conn.path" 
              fill="none" 
              stroke="#dc2626" 
              stroke-width="3.5"
              stroke-dasharray="6, 4"
              filter="url(#p5-tree-glow-v)"
              class="animate-p5-flow"
            />
            <!-- Active Start Connection Dot -->
            <circle 
              :cx="conn.startX" 
              :cy="conn.startY" 
              r="4.5" 
              fill="#ef4444" 
            />
            <!-- Active End Connection Dot -->
            <circle 
              :cx="conn.endX" 
              :cy="conn.endY" 
              r="4.5" 
              fill="#ef4444" 
            />
          </template>
        </g>
      </svg>

      <!-- Vertical Category Tree Nodes Layout (Top-to-Bottom Levels) -->
      <div class="flex flex-col items-center justify-center gap-10 sm:gap-14 relative z-10 w-full py-2 sm:py-4">
        <div 
          v-for="level in activeLevels" 
          :key="level"
          class="flex flex-row flex-nowrap items-center justify-center gap-2 sm:gap-6 w-full max-w-4xl px-1"
        >
          <!-- Nodes in this Vertical Level -->
          <div
            v-for="node in getNodesByLevel(level)"
            :key="node.id"
            :ref="(el) => setNodeRef(node.id, el)"
            @mouseenter="hoveredNodeId = node.id"
            @mouseleave="hoveredNodeId = null"
            class="group relative bg-zinc-950 border-2 transition-all duration-300 p-2 sm:p-4 flex-1 min-w-[100px] max-w-[170px] sm:max-w-[280px] transform -skew-x-3 sm:-skew-x-6 hover:scale-105 overflow-hidden"
            :class="getNodeClass(node)"
          >
            <!-- Hover Red Fill Animation -->
            <div class="absolute inset-0 bg-red-600 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out -z-10"></div>

            <div class="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-3.5 relative z-10">
              <!-- Icon Container -->
              <div class="w-8 h-8 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center border-2 border-black group-hover:border-white transition-colors flex-shrink-0">
                <img :src="node.icon" :alt="node.name" class="w-5 h-5 sm:w-7 sm:h-7 object-contain" />
              </div>

              <!-- Content Info -->
              <div class="flex-1 min-w-0">
                <h4 class="text-[11px] sm:text-base font-black italic uppercase text-white group-hover:text-black truncate mb-0.5">
                  {{ node.name }}
                </h4>
                <p class="text-[9px] sm:text-xs font-mono text-zinc-400 group-hover:text-zinc-950 leading-tight line-clamp-2">
                  {{ node.description }}
                </p>
              </div>
            </div>

            <!-- Active Star Indicator -->
            <div v-if="hoveredNodeId === node.id" class="absolute top-1 right-1 z-20">
              <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 group-hover:text-black animate-spin-slow" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import type { SkillNode, SkillConnection } from '~/data/content'

const props = defineProps<{
  nodes: SkillNode[]
  connections: SkillConnection[]
}>()

const canvasContainer = ref<HTMLElement | null>(null)
const nodeRefs = ref<Record<string, HTMLElement>>({})
const hoveredNodeId = ref<string | null>(null)

const canvasWidth = ref(800)
const canvasHeight = ref(600)

const setNodeRef = (id: string, el: any) => {
  if (el) {
    nodeRefs.value[id] = el as HTMLElement
  }
}

// Compute levels dynamically based on tree depth in active category
const nodeLevelMap = computed(() => {
  const map: Record<string, number> = {}
  const activeIds = new Set(props.nodes.map(n => n.id))

  props.nodes.forEach(node => {
    const prereqsInCat = node.prereqIds.filter(id => activeIds.has(id))
    if (prereqsInCat.length === 0) {
      map[node.id] = 0
    } else {
      map[node.id] = 1
    }
  })

  // Second pass for deeper trees (Level 2, Level 3)
  let changed = true
  let passes = 0
  while (changed && passes < 5) {
    changed = false
    passes++
    props.nodes.forEach(node => {
      const prereqsInCat = node.prereqIds.filter(id => activeIds.has(id))
      if (prereqsInCat.length > 0) {
        const maxParentLevel = Math.max(...prereqsInCat.map(pId => map[pId] ?? 0))
        if (map[node.id] !== maxParentLevel + 1) {
          map[node.id] = maxParentLevel + 1
          changed = true
        }
      }
    })
  }

  return map
})

const activeLevels = computed(() => {
  const levels = Array.from(new Set(Object.values(nodeLevelMap.value)))
  return levels.sort((a, b) => a - b)
})

const getNodesByLevel = (level: number) => {
  return props.nodes.filter(n => (nodeLevelMap.value[n.id] ?? 0) === level)
}

const nodeCoords = ref<Record<string, { x: number; y: number; width: number; height: number }>>({})

const updateCoordinates = () => {
  if (!canvasContainer.value) return
  const containerRect = canvasContainer.value.getBoundingClientRect()
  canvasWidth.value = containerRect.width
  canvasHeight.value = containerRect.height

  const coords: Record<string, { x: number; y: number; width: number; height: number }> = {}

  for (const [id, el] of Object.entries(nodeRefs.value)) {
    if (el) {
      const rect = el.getBoundingClientRect()
      coords[id] = {
        x: rect.left - containerRect.left,
        y: rect.top - containerRect.top,
        width: rect.width,
        height: rect.height
      }
    }
  }

  nodeCoords.value = coords
}

onMounted(() => {
  nextTick(() => {
    updateCoordinates()
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateCoordinates)
    }
  })
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateCoordinates)
  }
})

watch(() => props.nodes, () => {
  nodeRefs.value = {}
  nextTick(updateCoordinates)
}, { deep: true })

// Compute ancestors of hovered node
const ancestorNodeIds = computed(() => {
  if (!hoveredNodeId.value) return new Set<string>()
  const ancestors = new Set<string>([hoveredNodeId.value])
  const queue = [hoveredNodeId.value]
  while (queue.length > 0) {
    const curr = queue.shift()!
    props.connections.forEach(conn => {
      if (conn.to === curr && !ancestors.has(conn.from)) {
        ancestors.add(conn.from)
        queue.push(conn.from)
      }
    })
  }
  return ancestors
})

// Compute descendants of hovered node
const descendantNodeIds = computed(() => {
  if (!hoveredNodeId.value) return new Set<string>()
  const descendants = new Set<string>([hoveredNodeId.value])
  const queue = [hoveredNodeId.value]
  while (queue.length > 0) {
    const curr = queue.shift()!
    props.connections.forEach(conn => {
      if (conn.from === curr && !descendants.has(conn.to)) {
        descendants.add(conn.to)
        queue.push(conn.to)
      }
    })
  }
  return descendants
})

const activeNodeIds = computed(() => {
  if (!hoveredNodeId.value) return new Set<string>()
  return new Set([...ancestorNodeIds.value, ...descendantNodeIds.value])
})

const computedPaths = computed(() => {
  return props.connections.map(conn => {
    const fromCoord = nodeCoords.value[conn.from]
    const toCoord = nodeCoords.value[conn.to]

    if (!fromCoord || !toCoord) {
      return { from: conn.from, to: conn.to, path: '', startX: 0, startY: 0, endX: 0, endY: 0 }
    }

    // Vertical line: from bottom center of parent to top center of child
    const startX = fromCoord.x + fromCoord.width / 2
    const startY = fromCoord.y + fromCoord.height
    const endX = toCoord.x + toCoord.width / 2
    const endY = toCoord.y

    const dy = Math.abs(endY - startY) * 0.5
    const path = `M ${startX} ${startY} C ${startX} ${startY + dy}, ${endX} ${endY - dy}, ${endX} ${endY}`

    return {
      from: conn.from,
      to: conn.to,
      path,
      startX,
      startY,
      endX,
      endY
    }
  })
})

// Filter only active paths for glowing overlay
const activePaths = computed(() => {
  if (!hoveredNodeId.value) return []
  return computedPaths.value.filter(conn => {
    const isAncestorConn = ancestorNodeIds.value.has(conn.from) && ancestorNodeIds.value.has(conn.to)
    const isDescendantConn = descendantNodeIds.value.has(conn.from) && descendantNodeIds.value.has(conn.to)
    return isAncestorConn || isDescendantConn
  })
})

const getNodeClass = (node: SkillNode) => {
  const isHovered = hoveredNodeId.value === node.id
  const isInActivePath = activeNodeIds.value.has(node.id)

  if (isHovered) {
    return 'border-red-600 shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] z-30'
  }
  if (isInActivePath) {
    return 'border-red-500/80 shadow-[4px_4px_0px_0px_rgba(220,38,38,0.8)] z-20'
  }
  return 'border-white/20 hover:border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)]'
}
</script>

<style scoped>
@keyframes p5-dash-flow {
  to {
    stroke-dashoffset: -20;
  }
}

.animate-p5-flow {
  animation: p5-dash-flow 1.2s linear infinite;
}
</style>
