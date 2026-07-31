<template>
  <div class="fixed bottom-4 left-4 z-40 select-none">
    <!-- Sleek Compact P5 Chibi Avatar Stack & Badge -->
    <div 
      class="group relative flex items-center gap-2 bg-black border-2 border-white px-3 py-1.5 transform -skew-x-12 shadow-[3px_3px_0px_0px_rgba(220,38,38,1)] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
      :title="`${activeCount} active ${activeCount === 1 ? 'visitor' : 'visitors'} currently viewing yourin.my.id`"
    >
      <!-- Stack of Max 3 P5 Character Chibi Heads -->
      <div class="flex items-center -space-x-2 transform skew-x-12">
        <div 
          v-for="(headIndex, idx) in visibleHeadsCount" 
          :key="idx"
          class="relative w-8 h-8 flex-shrink-0 transition-transform duration-200 hover:scale-110"
          :style="{ zIndex: 10 - idx }"
          :title="getCharacterName(idx)"
        >
          <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-[0_0_4px_rgba(0,0,0,0.9)]">
            <!-- CHARACTER 0: JOKER -->
            <g v-if="getCharacterType(idx) === 'joker'">
              <!-- Spiky Black Hair -->
              <path d="M 15,45 Q 5,20 25,15 Q 35,5 50,12 Q 65,5 75,15 Q 95,20 85,45 Q 95,65 80,80 Q 50,95 20,80 Q 5,65 15,45 Z" fill="#000000" stroke="#ffffff" stroke-width="3" />
              <!-- Joker White Winged Mask -->
              <path d="M 18,48 C 18,32 82,32 82,48 C 82,65 68,78 50,78 C 32,78 18,65 18,48 Z" fill="#ffffff" />
              <!-- Eye Slits & Red Pupil -->
              <polygon points="24,48 42,42 38,56 26,58" fill="#000000" />
              <polygon points="76,48 58,42 62,56 74,58" fill="#000000" />
              <circle cx="34" cy="49" r="3.5" fill="#dc2626" class="animate-pulse" />
              <circle cx="66" cy="49" r="3.5" fill="#dc2626" class="animate-pulse" />
              <!-- Smile -->
              <path d="M 43,67 Q 50,72 57,67" stroke="#000000" stroke-width="3" fill="none" stroke-linecap="round" />
            </g>

            <!-- CHARACTER 1: MORGANA (MONA) -->
            <g v-else-if="getCharacterType(idx) === 'morgana'">
              <!-- Black Cat Head & Ears -->
              <path d="M 15,35 L 28,8 L 42,28 Q 50,22 58,28 L 72,8 L 85,35 Q 95,60 82,82 Q 50,96 18,82 Q 5,60 15,35 Z" fill="#000000" stroke="#ffffff" stroke-width="3" />
              <!-- Yellow Bandana Accent -->
              <path d="M 22,78 Q 50,94 78,78 L 82,88 Q 50,100 18,88 Z" fill="#eab308" />
              <!-- White Muzzle -->
              <ellipse cx="50" cy="62" rx="22" ry="15" fill="#ffffff" />
              <!-- Cat Eyes (Blue) -->
              <ellipse cx="33" cy="46" rx="9" ry="12" fill="#ffffff" stroke="#000000" stroke-width="2" />
              <ellipse cx="67" cy="46" rx="9" ry="12" fill="#ffffff" stroke="#000000" stroke-width="2" />
              <ellipse cx="33" cy="46" rx="5" ry="8" fill="#0284c7" />
              <ellipse cx="67" cy="46" rx="5" ry="8" fill="#0284c7" />
              <!-- Nose -->
              <polygon points="47,58 53,58 50,62" fill="#000000" />
            </g>

            <!-- CHARACTER 2: RYUJI (SKULL) -->
            <g v-else-if="getCharacterType(idx) === 'ryuji'">
              <!-- Spiky Blond/Yellow Hair -->
              <path d="M 15,40 Q 10,10 32,20 Q 50,0 68,20 Q 90,10 85,40 Q 95,60 82,82 Q 50,95 18,82 Z" fill="#eab308" stroke="#ffffff" stroke-width="3" />
              <!-- Skull Mask (Jaw & Teeth) -->
              <path d="M 20,45 Q 50,30 80,45 L 75,80 Q 50,92 25,80 Z" fill="#e4e4e7" stroke="#000000" stroke-width="3" />
              <!-- Dark Eye Sockets -->
              <polygon points="26,45 44,40 40,56 28,58" fill="#000000" />
              <polygon points="74,45 56,40 60,56 72,58" fill="#000000" />
              <circle cx="34" cy="48" r="3.5" fill="#eab308" class="animate-pulse" />
              <circle cx="66" cy="48" r="3.5" fill="#eab308" class="animate-pulse" />
              <!-- Skull Teeth Grid -->
              <path d="M 35,68 L 65,68 M 42,64 L 42,72 M 50,64 L 50,72 M 58,64 L 58,72" stroke="#000000" stroke-width="2.5" />
            </g>

            <!-- CHARACTER 3: ANN (PANTHER) -->
            <g v-else-if="getCharacterType(idx) === 'panther'">
              <!-- Blonde Hair & Twin Tails Silhouette -->
              <path d="M 10,25 Q 5,60 20,80 Q 50,95 80,80 Q 95,60 90,25 Q 75,5 50,15 Q 25,5 10,25 Z" fill="#fef08a" stroke="#ffffff" stroke-width="3" />
              <!-- Red Panther Mask -->
              <polygon points="15,40 30,15 45,35 55,35 70,15 85,40 78,72 50,82 22,72" fill="#dc2626" stroke="#000000" stroke-width="2" />
              <!-- Eye Cutouts -->
              <polygon points="26,46 42,38 38,56 28,58" fill="#ffffff" />
              <polygon points="74,46 58,38 62,56 72,58" fill="#ffffff" />
              <circle cx="34" cy="48" r="4" fill="#ec4899" class="animate-pulse" />
              <circle cx="66" cy="48" r="4" fill="#ec4899" class="animate-pulse" />
            </g>

            <!-- CHARACTER 4: YUSUKE (FOX) -->
            <g v-else>
              <!-- Dark Blue Hair -->
              <path d="M 18,40 Q 15,10 35,22 Q 50,5 65,22 Q 85,10 82,40 Q 92,60 82,82 Q 50,95 18,82 Z" fill="#1e3a8a" stroke="#ffffff" stroke-width="3" />
              <!-- Kitsune White Mask with Red Markings -->
              <polygon points="22,35 50,18 78,35 72,75 50,88 28,75" fill="#ffffff" stroke="#000000" stroke-width="2.5" />
              <!-- Red Fox Eyebrow Markings -->
              <path d="M 30,32 Q 38,24 44,34 M 70,32 Q 62,24 56,34" stroke="#dc2626" stroke-width="3" fill="none" />
              <!-- Slanted Eyes -->
              <polygon points="30,48 44,42 40,54" fill="#000000" />
              <polygon points="70,48 56,42 60,54" fill="#000000" />
              <circle cx="36" cy="48" r="3" fill="#06b6d4" class="animate-pulse" />
              <circle cx="64" cy="48" r="3" fill="#06b6d4" class="animate-pulse" />
            </g>
          </svg>
        </div>
      </div>

      <!-- +N Badge (Shown if activeCount > 3) -->
      <div 
        v-if="overflowCount > 0"
        class="transform skew-x-12 bg-red-600 border border-white text-white font-black italic text-[11px] px-1.5 py-0.2 tracking-tighter"
      >
        +{{ overflowCount }}
      </div>

      <!-- Live Status Badge Text -->
      <div class="transform skew-x-12 flex items-center gap-1.5 font-sans ml-1">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span class="text-[10px] font-black italic text-red-500 uppercase tracking-wider">
          LIVE
        </span>
      </div>

      <!-- Hover Tooltip -->
      <div class="absolute bottom-full left-0 mb-2 hidden group-hover:block whitespace-nowrap bg-black text-white text-[11px] font-mono border border-white px-2.5 py-1 shadow-[3px_3px_0px_0px_rgba(220,38,38,1)] transform skew-x-12 pointer-events-none">
        <span class="inline-block transform -skew-x-12">
          ⚡ {{ activeCount }} {{ activeCount === 1 ? 'user' : 'users' }} active right now
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePresence } from '~/composables/usePresence'

const { activeCount } = usePresence()

// Max 3 chibi heads displayed
const visibleHeadsCount = computed(() => Math.min(activeCount.value || 1, 3))

// Remaining count badge (+N)
const overflowCount = computed(() => Math.max(0, (activeCount.value || 1) - 3))

// List of Persona 5 Main Characters
const characters = [
  { type: 'joker', name: 'Joker' },
  { type: 'morgana', name: 'Morgana (Mona)' },
  { type: 'ryuji', name: 'Ryuji (Skull)' },
  { type: 'panther', name: 'Ann (Panther)' },
  { type: 'fox', name: 'Yusuke (Fox)' }
]

const getCharacterType = (index: number) => characters[index % characters.length].type
const getCharacterName = (index: number) => characters[index % characters.length].name
</script>
