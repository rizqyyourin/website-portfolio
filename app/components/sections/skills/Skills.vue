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
      <div class="mb-16 transform -skew-x-12 ml-4 md:ml-12 inline-block">
        <h2 class="text-6xl md:text-8xl font-black text-white bg-black px-8 py-2 inline-block shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] tracking-tighter">
          SKILLS
        </h2>
        <div class="mt-2 bg-white text-black px-4 py-1 inline-block text-xl font-bold uppercase tracking-widest transform skew-x-12 translate-x-4">
          Phantoms of Logic
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-12 items-start">
        
        <!-- P5 Menu (Left Side) -->
        <div class="w-full lg:w-1/3 flex flex-col gap-4 perspective-1000">
          <button 
            v-for="tab in tabs" 
            :key="tab"
            @click="activeSkillsTab = tab"
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

        <!-- Content Area (Right Side) -->
        <div class="w-full lg:w-2/3 relative min-h-[400px]">
           <!-- Comic Panel Border -->
           <div class="absolute -inset-4 border-4 border-white transform -skew-x-2 opacity-50 pointer-events-none"></div>
           
           <transition mode="out-in" name="p5-slide">
             <div :key="activeSkillsTab" class="relative">
                <!-- Background Slash -->
                <div class="absolute inset-0 bg-white/5 transform -skew-x-12 z-0"></div>

                <div class="grid grid-cols-2 gap-6 relative z-10 p-4">
                  <div 
                    v-for="(skill, index) in currentSkills" 
                    :key="skill.name" 
                    class="group relative bg-black/80 border-2 border-white/20 p-6 transform transition-all duration-300 hover:scale-105 hover:bg-black hover:border-red-500 hover:shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] overflow-hidden"
                    :style="{ animationDelay: `${index * 100}ms` }"
                  > 
                    <!-- Dynamic Diagonal Background on Hover -->
                    <div class="absolute inset-0 bg-red-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out -z-10 skew-y-12"></div>

                    <div class="flex flex-col items-center text-center relative z-10">
                      <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 border-4 border-black group-hover:border-white transition-colors">
                        <img :src="skill.icon" :alt="skill.name" class="w-12 h-12 object-contain" />
                      </div>
                      <h4 class="text-2xl font-black text-white italic uppercase tracking-wider mb-1 bg-black px-2 transform -skew-x-6 group-hover:bg-white group-hover:text-red-600 transition-colors">
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
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { skills } from '~/data/content'

const activeSkillsTab = ref('languages')

const tabs = computed(() => Object.keys(skills))

const currentSkills = computed(() => {
  return skills[activeSkillsTab.value as keyof typeof skills]
})
</script>

<style scoped>
/* Custom P5 Slide Animation */
.p5-slide-enter-active,
.p5-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

.p5-slide-enter-from {
  opacity: 0;
  transform: translateX(50px) skewX(-12deg);
}

.p5-slide-leave-to {
  opacity: 0;
  transform: translateX(-50px) skewX(12deg);
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
</style>
