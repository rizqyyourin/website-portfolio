<template>
  <section id="skills" class="py-20 md:py-32 bg-zinc-900 overflow-hidden relative">
    <!-- Background Elements P5 Style -->
    <div class="absolute inset-0 z-0 pointer-events-none opacity-20">
       <div class="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-50"></div>
       <div class="absolute -bottom-20 -left-20 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
       <div class="absolute top-20 right-20 w-72 h-72 bg-gray-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
      
      <!-- P5 Header -->
      <div data-aos="p5-drop" data-aos-duration="700" class="mb-16 transform -skew-x-12 ml-4 md:ml-12 inline-block max-md:skew-x-0 max-md:ml-0 max-md:flex max-md:flex-col max-md:items-center max-md:w-full">
        <h2 class="text-6xl md:text-8xl font-black text-white bg-black px-8 py-2 inline-block shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] max-md:shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] tracking-tighter">
          SKILLS
        </h2>
        <div data-aos="p5-drop" data-aos-delay="150" data-aos-duration="600" class="mt-2 bg-white text-black px-4 py-1 inline-block text-xl font-bold uppercase tracking-widest transform skew-x-12 translate-x-4 max-md:skew-x-0 max-md:translate-x-0">
          Phantoms of Logic
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-12 items-start">
        
        <!-- P5 Menu (Left Side) -->
        <div class="w-full lg:w-1/3 flex perspective-1000">
          
          <!-- Mobile: single active tab centered -->
          <div
            data-aos="p5-slot-drop"
            data-aos-duration="650"
            data-aos-delay="200"
            class="flex lg:hidden w-full p5-mobile-card-pad"
          >
            <transition :name="slideTransition" mode="out-in">
              <div :key="activeSkillsTab" class="relative w-full h-24">
                <div class="absolute inset-0 bg-red-600 border-2 border-red-600 transform -skew-x-12 max-md:skew-x-0 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] max-md:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"></div>
                <div class="absolute inset-0 flex items-center justify-between px-6">
                  <span class="text-2xl font-black italic uppercase tracking-tighter text-white transform skew-x-12 transition-all duration-300">
                    {{ activeSkillsTab }}
                  </span>
                  <svg class="w-8 h-8 text-white animate-spin-slow transform skew-x-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/></svg>
                </div>
              </div>
            </transition>
          </div>

          <!-- Desktop: full list -->
          <div class="hidden lg:flex flex-col w-full gap-4">
            <button 
              v-for="(tab, index) in tabs" 
              :key="tab"
              data-aos="p5-slot-drop"
              :data-aos-delay="250 + index * 80"
              data-aos-duration="550"
              @click="selectTab(tab)"
              class="group relative h-20 w-full transition-all duration-300 ease-out transform hover:-translate-x-2 focus:outline-none"
            >
            <!-- Skewed Background -->
            <div 
              class="absolute inset-0 bg-black border-2 border-white transform -skew-x-12 transition-all duration-300"
              :class="activeSkillsTab === tab ? 'bg-red-600 border-red-600 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] scale-105 z-10' : 'hover:bg-zinc-800'"
            ></div>
            
            <!-- Text Content (Unskewed) -->
            <div class="absolute inset-0 flex items-center justify-between px-8 text-white font-black italic tracking-wider text-2xl md:text-3xl uppercase z-20 pointer-events-none">
              <span class="transform skew-x-12 group-hover:translate-x-2 transition-transform duration-300">
                 {{ tab }}
              </span>
              <!-- P5 Star Icon Selection Indicator -->
              <svg v-if="activeSkillsTab === tab" class="w-8 h-8 text-white animate-spin-slow transform skew-x-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/></svg>
            </div>
          </button>
          </div>
        </div>

        <!-- Content Area (Right Side) -->
        <div 
          data-aos="p5-rise"
          data-aos-delay="300"
          data-aos-duration="750"
          class="w-full lg:w-2/3 relative min-h-[400px] p5-mobile-safe p5-mobile-card-pad overflow-hidden touch-pan-y"
          @touchstart.passive="onTouchStart"
          @touchend.passive="onTouchEnd"
        >
           <!-- Comic Panel Border -->
           <div class="absolute -inset-4 border-4 border-white transform -skew-x-2 opacity-50 pointer-events-none max-md:hidden"></div>
           
           <transition :name="slideTransition" mode="out-in">
             <div :key="activeSkillsTab" class="relative">
                <!-- Background Slash -->
                <div class="absolute inset-0 bg-white/5 transform -skew-x-12 max-md:skew-x-0 z-0"></div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10 p-4 max-md:px-2 max-md:gap-4">
                  <div 
                    v-for="(skill, index) in currentSkills" 
                    :key="`${activeSkillsTab}-${skill.name}`"
                    class="skills-reveal-item group relative bg-black/80 border-2 border-white/20 p-6 transform transition-all duration-300 hover:scale-105 hover:bg-black hover:border-red-500 hover:shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] overflow-hidden"
                    :style="{ '--reveal-delay': `${index * 80}ms` }"
                  > 
                    <!-- Dynamic Diagonal Background on Hover -->
                    <div class="absolute inset-0 bg-red-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out -z-10 skew-y-12"></div>

                    <div class="flex flex-col items-center text-center relative z-10">
                      <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 border-4 border-black group-hover:border-white transition-colors">
                        <img :src="skill.icon" :alt="skill.name" loading="lazy" class="w-12 h-12 object-contain" />
                      </div>
                      <h4 class="text-2xl font-black text-white italic uppercase tracking-wider mb-1 bg-black px-2 transform -skew-x-6 max-md:skew-x-0 group-hover:bg-white group-hover:text-red-600 transition-colors">
                        {{ skill.name }}
                      </h4>
                      <p class="text-sm font-bold text-gray-400 group-hover:text-black mt-2 font-mono">
                        {{ skill.description }}
                      </p>
                    </div>
                  </div>
                </div>
             </div>
           </transition>

           <!-- Swipe Hint (mobile only, until first interaction) -->
           <p v-if="!hasInteracted" class="lg:hidden text-center text-xs font-mono text-white/50 mt-8 relative z-20 animate-pulse">
             &laquo; swipe to switch &raquo;
           </p>

           <!-- Swipe Indicator Dots (mobile only) -->
           <div class="flex lg:hidden justify-center gap-2 relative z-20" :class="hasInteracted ? 'mt-8' : 'mt-2'" role="tablist" aria-label="Skill categories">
             <button
               v-for="tab in tabs"
               :key="tab"
               role="tab"
               :aria-selected="activeSkillsTab === tab"
               :aria-label="tab"
               @click="selectTab(tab)"
               class="w-2 h-2 rounded-full transition-all duration-300"
               :class="activeSkillsTab === tab ? 'bg-red-600 w-6' : 'bg-white/30'"
             ></button>
           </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { skills } from '~/data/content'

const activeSkillsTab = ref('languages')
const slideDirection = ref<'next' | 'prev'>('next')
const hasInteracted = ref(false)

const tabs = computed(() => Object.keys(skills))

const currentSkills = computed(() => {
  return skills[activeSkillsTab.value as keyof typeof skills]
})

const currentIndex = computed(() => tabs.value.indexOf(activeSkillsTab.value))

const slideTransition = computed(() =>
  slideDirection.value === 'next' ? 'skills-slide-next' : 'skills-slide-prev'
)

function selectTab(tab: string) {
  hasInteracted.value = true
  if (tab === activeSkillsTab.value) return

  const newIndex = tabs.value.indexOf(tab)
  if (newIndex > currentIndex.value) slideDirection.value = 'next'
  else if (newIndex < currentIndex.value) slideDirection.value = 'prev'

  activeSkillsTab.value = tab
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

  if (Math.abs(deltaX) < 50 || Math.abs(deltaY) > Math.abs(deltaX)) return

  if (deltaX > 0) {
    const next = tabs.value[currentIndex.value + 1]
    if (next) selectTab(next)
  } else {
    const prev = tabs.value[currentIndex.value - 1]
    if (prev) selectTab(prev)
  }
}
</script>

<style scoped>
/* Direction-aware tab switch — no skew flip */
.skills-slide-next-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.skills-slide-next-leave-active {
  transition: all 0.28s cubic-bezier(0.55, 0, 1, 0.45);
}

.skills-slide-next-enter-from {
  opacity: 0;
  transform: translateX(40px);
}

.skills-slide-next-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}

.skills-slide-prev-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.skills-slide-prev-leave-active {
  transition: all 0.28s cubic-bezier(0.55, 0, 1, 0.45);
}

.skills-slide-prev-enter-from {
  opacity: 0;
  transform: translateX(-40px);
}

.skills-slide-prev-leave-to {
  opacity: 0;
  transform: translateX(40px);
}

@media (max-width: 767px) {
  .skills-slide-next-enter-from {
    transform: translateX(28px);
  }

  .skills-slide-next-leave-to {
    transform: translateX(-28px);
  }

  .skills-slide-prev-enter-from {
    transform: translateX(-28px);
  }

  .skills-slide-prev-leave-to {
    transform: translateX(28px);
  }
}

/* Skill card cascade reveal */
@keyframes skills-reveal {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.skills-reveal-item {
  animation: skills-reveal 0.45s cubic-bezier(0.16, 1, 0.3, 1) backwards;
  animation-delay: var(--reveal-delay, 0ms);
}

@media (max-width: 767px) {
  @keyframes skills-reveal {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .skills-reveal-item {
    animation-duration: 0.38s;
  }
}

/* Slow Spin for Star */
.animate-spin-slow {
  animation: spin 3s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg) skewX(12deg);
  }
  to {
    transform: rotate(360deg) skewX(12deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .skills-reveal-item {
    animation: none;
  }

  .skills-slide-next-enter-active,
  .skills-slide-next-leave-active,
  .skills-slide-prev-enter-active,
  .skills-slide-prev-leave-active {
    transition-duration: 0.01ms !important;
  }
}
</style>
