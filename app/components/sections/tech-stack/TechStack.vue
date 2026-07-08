<template>
  <section id="tech-stack" class="py-24 md:py-32 bg-zinc-900 relative max-md:overflow-hidden">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
      
      <!-- P5 Section Header -->
      <div
        data-aos="p5-drop"
        data-aos-duration="700"
        class="mb-8 md:mb-12 transform -skew-x-12 ml-4 md:ml-12 border-l-8 border-red-600 pl-4 max-md:skew-x-0 max-md:ml-0 max-md:border-l-0 max-md:pl-0 max-md:text-center max-md:w-full"
      >
        <h2 class="text-5xl md:text-7xl font-black text-white bg-black inline-block px-4 py-1 shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] max-md:shadow-[4px_4px_0px_0px_rgba(220,38,38,1)]">
          ARSENAL
        </h2>
        <div
          data-aos="p5-drop"
          data-aos-delay="150"
          data-aos-duration="600"
          class="text-xl font-bold italic tracking-wider mt-2 bg-white text-black px-2 inline-block transform skew-x-12 max-md:skew-x-0"
        >
          CHOOSE YOUR WEAPON
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">
        <!-- Confidant Menu (Selector) -->
        <div class="md:col-span-4 flex perspective-1000">
          
          <!-- Mobile: active tab — syncs slide direction with content -->
          <div
            data-aos="p5-slot-drop"
            data-aos-duration="650"
            data-aos-delay="200"
            class="flex md:hidden w-full p5-mobile-card-pad"
          >
            <transition :name="slideTransition" mode="out-in">
              <div :key="selectedStack.id" class="relative w-full h-24">
                <div class="absolute inset-0 bg-red-600 border-2 border-red-600 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"></div>
                <div class="absolute inset-0 flex items-center justify-between px-6">
                  <span class="text-xl sm:text-2xl font-black italic uppercase tracking-tighter text-white truncate pr-2">
                    {{ selectedStack.name }}
                  </span>
                  <div class="w-12 h-16 shrink-0 bg-white border-2 border-black shadow-sm flex items-center justify-center">
                    <span class="text-black font-bold text-xs">IX</span>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <!-- Desktop: full list -->
          <div class="hidden md:flex flex-col w-full gap-4">
            <button 
              v-for="(stack, index) in techStacks" 
              :key="stack.id"
              data-aos="p5-slot-drop"
              :data-aos-delay="250 + index * 80"
              data-aos-duration="550"
              @click="selectStack(stack.id)"
              class="group relative w-full h-24 transition-all duration-300 ease-out transform hover:-translate-x-4 focus:outline-none"
            >
              <div 
                class="absolute inset-0 bg-black border-2 border-white transform -skew-x-12 transition-all duration-300"
                :class="selectedStackId === stack.id ? 'bg-red-600 border-red-600 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] scale-105 z-10' : 'hover:bg-zinc-800'"
              ></div>
              
              <div class="absolute inset-0 flex items-center justify-between px-6 z-20 pointer-events-none">
                 <span class="text-3xl font-black italic uppercase tracking-tighter text-white transform skew-x-12 transition-colors">
                    {{ stack.name }}
                 </span>
                 <div class="w-12 h-16 bg-white border-2 border-black transform skew-x-12 rotate-12 group-hover:rotate-0 transition-transform shadow-sm flex items-center justify-center">
                    <span class="text-black font-bold text-xs">IX</span>
                 </div>
              </div>
            </button>
          </div>
        </div>

        <!-- Content Side -->
        <div 
          data-aos="p5-wipe-right"
          data-aos-duration="800"
          data-aos-delay="300"
          class="md:col-span-8 relative p5-mobile-safe p5-mobile-card-pad overflow-hidden touch-pan-y"
          @touchstart.passive="onTouchStart"
          @touchend.passive="onTouchEnd"
        >
           <div class="absolute -inset-6 border-4 border-white transform skew-x-2 opacity-30 pointer-events-none max-md:hidden"></div>
           
           <transition :name="slideTransition" mode="out-in">
            <div
              :key="selectedStack.id"
              class="space-y-6 md:space-y-8 bg-black/50 p-4 md:p-6 backdrop-blur-sm border-2 border-white/20 max-md:skew-x-0 md:transform md:-skew-x-2"
            >
              <div class="text-left relative max-md:text-center">
                <div class="absolute -top-10 -left-10 w-0 h-0 border-l-[50px] border-l-transparent border-t-[50px] border-t-red-600 border-r-[50px] border-r-transparent transform -rotate-45 max-md:hidden"></div>

                <h3 class="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 italic max-md:skew-x-0 md:transform md:skew-x-2 leading-none" v-html="selectedStack.title"></h3>
                <p class="text-base sm:text-xl text-gray-300 font-bold font-mono max-md:skew-x-0 md:transform md:skew-x-2 border-l-4 border-red-600 pl-4 max-md:border-l-0 max-md:pl-0 max-md:px-2">
                  {{ selectedStack.description }}
                </p>
              </div>

              <div class="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4 max-md:skew-x-0 md:transform md:skew-x-2">
                <div 
                  v-for="(item, index) in selectedStack.items" 
                  :key="`${selectedStack.id}-${item.name}`"
                  class="arsenal-equip-item group relative overflow-hidden bg-white border-4 border-black p-3 sm:p-4 transition-all duration-300 active:scale-95 sm:hover:scale-110 sm:hover:rotate-3 sm:hover:shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] z-10"
                  :style="{ '--equip-delay': `${index * (isMobile ? 45 : 60)}ms` }"
                >
                  <div class="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] pointer-events-none z-20"></div>

                  <div class="relative z-10 flex flex-col items-center justify-center h-full space-y-2">
                    <div class="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center sm:group-hover:animate-bounce">
                      <img :src="item.logo" :alt="item.name" loading="lazy" class="w-full h-full object-contain filter drop-shadow-md" />
                    </div>
                    <span class="font-black text-black text-xs sm:text-sm uppercase bg-white px-1 text-center leading-tight">
                      {{ item.name }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
           </transition>

           <!-- Swipe Hint (mobile only, until first interaction) -->
           <p v-if="!hasInteracted" class="md:hidden text-center text-xs font-mono text-white/50 mt-4 animate-pulse">
             &laquo; swipe to switch &raquo;
           </p>

           <!-- Swipe Indicator Dots (mobile only) -->
           <div class="flex md:hidden justify-center gap-2 mt-4" role="tablist" aria-label="Tech stacks">
             <button
               v-for="stack in techStacks"
               :key="stack.id"
               role="tab"
               :aria-selected="selectedStackId === stack.id"
               @click="selectStack(stack.id)"
               class="h-2 rounded-full transition-all duration-300"
               :class="selectedStackId === stack.id ? 'bg-red-600 w-6' : 'bg-white/30 w-2'"
               :aria-label="stack.name"
             ></button>
           </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { techStacks } from '~/data/content'

const selectedStackId = ref('tall')
const slideDirection = ref<'next' | 'prev'>('next')
const isMobile = ref(false)
const hasInteracted = ref(false)

const selectedStack = computed(() => {
  return techStacks.find(s => s.id === selectedStackId.value) || techStacks[0]!
})

const currentIndex = computed(() => techStacks.findIndex(s => s.id === selectedStackId.value))

const slideTransition = computed(() =>
  slideDirection.value === 'next' ? 'arsenal-slide-next' : 'arsenal-slide-prev'
)

function selectStack(id: string) {
  hasInteracted.value = true
  if (id === selectedStackId.value) return

  const newIndex = techStacks.findIndex(s => s.id === id)
  if (newIndex > currentIndex.value) slideDirection.value = 'next'
  else if (newIndex < currentIndex.value) slideDirection.value = 'prev'

  selectedStackId.value = id
}

let touchStartX = 0
let touchStartY = 0

function onTouchStart(e: TouchEvent) {
  touchStartX = e.touches[0]!.clientX
  touchStartY = e.touches[0]!.clientY
}

function onTouchEnd(e: TouchEvent) {
  const touch = e.changedTouches[0]!
  const deltaX = touchStartX - touch.clientX
  const deltaY = touchStartY - touch.clientY

  // Ignore if mostly vertical — don't hijack page scroll
  if (Math.abs(deltaX) < 50 || Math.abs(deltaY) > Math.abs(deltaX)) return

  if (deltaX > 0) {
    const next = techStacks[currentIndex.value + 1]
    if (next) selectStack(next.id)
  } else {
    const prev = techStacks[currentIndex.value - 1]
    if (prev) selectStack(prev.id)
  }
}

function updateMobile() {
  isMobile.value = window.matchMedia('(max-width: 767px)').matches
}

onMounted(() => {
  updateMobile()
  window.addEventListener('resize', updateMobile, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('resize', updateMobile)
})
</script>

<style scoped>
/* Direction-aware panel + mobile tab slide */
.arsenal-slide-next-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.arsenal-slide-next-leave-active {
  transition: all 0.28s cubic-bezier(0.55, 0, 1, 0.45);
}

.arsenal-slide-next-enter-from {
  opacity: 0;
  transform: translateX(40px) skewX(-2deg);
}

.arsenal-slide-next-leave-to {
  opacity: 0;
  transform: translateX(-40px) skewX(-2deg);
}

.arsenal-slide-prev-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.arsenal-slide-prev-leave-active {
  transition: all 0.28s cubic-bezier(0.55, 0, 1, 0.45);
}

.arsenal-slide-prev-enter-from {
  opacity: 0;
  transform: translateX(-40px) skewX(-2deg);
}

.arsenal-slide-prev-leave-to {
  opacity: 0;
  transform: translateX(40px) skewX(-2deg);
}

@media (max-width: 767px) {
  .arsenal-slide-next-enter-from {
    opacity: 0;
    transform: translateX(28px);
  }

  .arsenal-slide-next-leave-to {
    opacity: 0;
    transform: translateX(-28px);
  }

  .arsenal-slide-prev-enter-from {
    opacity: 0;
    transform: translateX(-28px);
  }

  .arsenal-slide-prev-leave-to {
    opacity: 0;
    transform: translateX(28px);
  }
}

/* Tech logo equip cascade */
@keyframes arsenal-equip {
  from {
    opacity: 0;
    transform: scale(0.72) rotate(-8deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

.arsenal-equip-item {
  animation: arsenal-equip 0.45s cubic-bezier(0.16, 1, 0.3, 1) backwards;
  animation-delay: var(--equip-delay, 0ms);
}

@media (max-width: 767px) {
  @keyframes arsenal-equip {
    from {
      opacity: 0;
      transform: scale(0.82) translateY(12px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  .arsenal-equip-item {
    animation-duration: 0.38s;
  }
}

@media (prefers-reduced-motion: reduce) {
  .arsenal-equip-item {
    animation: none;
  }

  .arsenal-slide-next-enter-active,
  .arsenal-slide-next-leave-active,
  .arsenal-slide-prev-enter-active,
  .arsenal-slide-prev-leave-active {
    transition-duration: 0.01ms !important;
  }
}
</style>
