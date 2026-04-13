<template>
  <section id="tech-stack" class="py-24 md:py-32 bg-zinc-900 relative">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
      
      <!-- P5 Section Header -->
      <div data-aos="fade-right" class="mb-12 transform -skew-x-12 ml-4 md:ml-12 border-l-8 border-red-600 pl-4">
        <h2 class="text-5xl md:text-7xl font-black text-white bg-black inline-block px-4 py-1 shadow-[6px_6px_0px_0px_rgba(220,38,38,1)]">
          ARSENAL
        </h2>
        <div data-aos="fade-right" data-aos-delay="200" class="text-white text-xl font-bold italic tracking-wider mt-2 bg-red-600 text-black px-2 inline-block transform skew-x-12">
          CHOOSE YOUR WEAPON
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        <!-- Confidant Menu (Selector) -->
        <div data-aos="fade-up" data-aos-delay="300" class="md:col-span-4 flex perspective-1000">
          <div class="flex flex-row md:flex-col overflow-x-auto md:overflow-visible w-full gap-4 md:gap-4 pb-6 md:pb-0 snap-x snap-mandatory hide-scrollbar pr-8 md:pr-0">
            <button 
              v-for="(stack, index) in techStacks" 
              :key="stack.id"
              :data-aos="'fade-right'"
              :data-aos-delay="400 + (index * 100)"
              @click="selectedStackId = stack.id"
              class="group relative shrink-0 w-[75vw] max-w-[260px] md:max-w-none md:w-full h-24 snap-start md:snap-center transition-all duration-300 ease-out transform hover:-translate-y-2 md:hover:-translate-y-0 md:hover:-translate-x-4 focus:outline-none ml-2 md:ml-0"
            >
              <!-- Skewed Background -->
              <div 
                class="absolute inset-0 bg-black border-2 border-white transform -skew-x-12 transition-all duration-300"
                :class="selectedStackId === stack.id ? 'bg-red-600 border-red-600 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] scale-105 z-10' : 'hover:bg-zinc-800'"
              ></div>
              
              <!-- Content (Unskewed) -->
              <div class="absolute inset-0 flex items-center justify-between px-6 z-20 pointer-events-none">
                 <span class="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-white transform skew-x-12 transition-colors">
                    {{ stack.name }}
                 </span>
                 <!-- Tarot Card / Icon Mockup -->
                 <div class="w-12 h-16 bg-white border-2 border-black transform skew-x-12 rotate-12 group-hover:rotate-0 transition-transform shadow-sm flex items-center justify-center">
                    <span class="text-black font-bold text-xs">IX</span>
                 </div>
              </div>
            </button>
          </div>
        </div>

        <!-- Content Side -->
        <div data-aos="zoom-in-left" data-aos-delay="500" class="md:col-span-8 relative">
           <!-- Comic Panel Border -->
           <div class="absolute -inset-6 border-4 border-white transform skew-x-2 opacity-30 pointer-events-none"></div>
           
           <transition mode="out-in" name="p5-zoom">
            <div :key="selectedStack.id" class="space-y-8 bg-black/50 p-6 backdrop-blur-sm border-2 border-white/20 transform -skew-x-2">
              <div class="text-left relative">
                <!-- Decorative Triangle -->
                <div class="absolute -top-10 -left-10 w-0 h-0 border-l-[50px] border-l-transparent border-t-[50px] border-t-red-600 border-r-[50px] border-r-transparent transform -rotate-45"></div>

                <h3 class="text-4xl md:text-5xl font-black text-white mb-3 italic transform skew-x-2 leading-none" v-html="selectedStack.title"></h3>
                <p class="text-xl text-gray-300 font-bold font-mono transform skew-x-2 border-l-4 border-red-600 pl-4">
                  {{ selectedStack.description }}
                </p>
              </div>

              <!-- Animated Grid -->
              <transition-group 
                tag="div" 
                name="list"
                class="grid grid-cols-2 sm:grid-cols-4 gap-4 transform skew-x-2"
              >
                <div 
                  v-for="(item, index) in selectedStack.items" 
                  :key="item.name"
                  class="group relative overflow-hidden bg-white border-4 border-black p-4 transition-all duration-300 hover:scale-110 hover:rotate-3 hover:shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] z-10"
                  :style="{ transitionDelay: `${index * 50}ms` }"
                >
                  <!-- Inner Shadow -->
                  <div class="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] pointer-events-none z-20"></div>

                  <div class="relative z-10 flex flex-col items-center justify-center h-full space-y-2">
                    <div class="w-12 h-12 flex items-center justify-center group-hover:animate-bounce">
                      <img :src="item.logo" :alt="item.name" class="w-full h-full object-contain filter drop-shadow-md" />
                    </div>
                    <span class="font-black text-black text-sm uppercase bg-white px-1">
                      {{ item.name }}
                    </span>
                  </div>
                </div>
              </transition-group>
            </div>
           </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { techStacks } from '~/data/content'

// Default to TALL stack
const selectedStackId = ref('tall')

const selectedStack = computed(() => {
  return techStacks.find(s => s.id === selectedStackId.value) || techStacks[0]!
})
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

/* P5 Zoom Animation */
.p5-zoom-enter-active,
.p5-zoom-leave-active {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.p5-zoom-enter-from,
.p5-zoom-leave-to {
  opacity: 0;
  transform: scale(0.8) rotate(-2deg);
}

/* List Items */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
