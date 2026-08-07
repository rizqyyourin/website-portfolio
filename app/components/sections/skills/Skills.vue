<template>
  <section id="skills" class="py-20 md:py-32 bg-zinc-950 overflow-hidden relative">
    <!-- Background Elements P5 Style -->
    <div class="absolute inset-0 z-0 pointer-events-none opacity-20">
       <div class="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-50"></div>
       <div class="absolute -bottom-20 -left-20 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
       <div class="absolute top-20 right-20 w-72 h-72 bg-zinc-800 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
      
      <!-- P5 Header Section -->
      <div class="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div data-aos="p5-drop" data-aos-duration="700" class="transform -skew-x-12 inline-block max-md:skew-x-0">
          <h2 class="text-5xl sm:text-6xl md:text-8xl font-black text-white bg-black px-6 md:px-8 py-2 inline-block shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] max-md:shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] tracking-tighter">
            SKILL TREE
          </h2>
          <div data-aos="p5-drop" data-aos-delay="150" data-aos-duration="600" class="mt-2 bg-white text-black px-4 py-1 inline-block text-lg md:text-xl font-bold uppercase tracking-widest transform skew-x-12 translate-x-4 max-md:skew-x-0 max-md:translate-x-0">
            Phantoms of Logic
          </div>
        </div>
      </div>

      <!-- Category Filter Header (P5 Skewed Tabs - 2x2 grid on mobile, flex on desktop) -->
      <div data-aos="fade-up" data-aos-delay="200" class="mb-8 grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5 sm:gap-4">
        <button
          v-for="cat in categories"
          :key="cat.id"
          @click="activeCategory = cat.id"
          class="relative group px-3.5 sm:px-7 py-2 sm:py-3.5 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none w-full sm:w-auto"
        >
          <!-- Skewed Background Card -->
          <div 
            class="absolute inset-0 bg-black border-2 border-white transform -skew-x-12 transition-all duration-300"
            :class="activeCategory === cat.id ? 'bg-red-600 border-red-600 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] sm:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] scale-105 z-10' : 'hover:bg-zinc-800'"
          ></div>
          
          <!-- Tab Content -->
          <div class="relative z-20 flex items-center justify-center gap-2 text-white font-black italic uppercase tracking-wider text-[11px] sm:text-sm">
            <span class="transform skew-x-12 truncate">{{ cat.label }}</span>
            <svg v-if="activeCategory === cat.id" class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white animate-spin-slow transform skew-x-12 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
            </svg>
          </div>
        </button>
      </div>

      <!-- Active Category Skill Tree Canvas -->
      <div data-aos="p5-rise" data-aos-delay="300" class="relative">
        <transition name="tree-fade" mode="out-in">
          <SkillTreeCanvas
            :key="activeCategory"
            :nodes="currentCategoryNodes"
            :connections="currentCategoryConnections"
          />
        </transition>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SkillTreeCanvas from './SkillTreeCanvas.vue'
import { skillTreeNodes, skillTreeConnections } from '~/data/content'

const activeCategory = ref<string>('languages')

const categories = [
  { id: 'languages', label: 'LANGUAGES' },
  { id: 'databases', label: 'DATABASES' },
  { id: 'devops', label: 'DEVOPS' },
  { id: 'apis', label: 'OTHERS' }
]

const currentCategoryNodes = computed(() => {
  return skillTreeNodes.filter(n => n.category === activeCategory.value)
})

const currentCategoryConnections = computed(() => {
  const activeIds = new Set(currentCategoryNodes.value.map(n => n.id))
  return skillTreeConnections.filter(c => activeIds.has(c.from) && activeIds.has(c.to))
})
</script>

<style scoped>
.animate-spin-slow {
  animation: spin 4s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.tree-fade-enter-active,
.tree-fade-leave-active {
  transition: all 0.25s ease-out;
}

.tree-fade-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.tree-fade-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
