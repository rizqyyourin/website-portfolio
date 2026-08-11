<template>
  <section id="experience" class="py-16 md:py-32 bg-black overflow-hidden relative border-t-4 border-red-600">
    <!-- Background P5 Elements -->
    <div class="absolute inset-0 z-0 pointer-events-none opacity-20">
      <div class="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_15px,rgba(220,38,38,0.15)_15px,rgba(220,38,38,0.15)_30px)]"></div>
      <div class="absolute top-1/4 -right-20 w-80 md:w-96 h-80 md:h-96 bg-red-600 rounded-full mix-blend-screen filter blur-[100px] md:blur-[120px] opacity-40 animate-pulse"></div>
      <div class="absolute bottom-1/4 -left-20 w-80 md:w-96 h-80 md:h-96 bg-zinc-800 rounded-full mix-blend-screen filter blur-[100px] md:blur-[120px] opacity-30"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
      
      <!-- P5 Header Section -->
      <div class="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div data-aos="p5-drop" data-aos-duration="700" class="transform md:-skew-x-12 inline-block">
          <h2 class="text-4xl sm:text-6xl md:text-8xl font-black text-white bg-black border-2 border-white px-5 sm:px-6 md:px-8 py-2 inline-block shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] md:shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] tracking-tighter uppercase max-w-full">
            EXPERIENCE
          </h2>
          <div data-aos="p5-drop" data-aos-delay="150" data-aos-duration="600" class="mt-2 bg-red-600 text-white border-2 border-white px-3 sm:px-4 py-1 inline-block text-base sm:text-lg md:text-xl font-bold uppercase tracking-widest transform md:skew-x-12 md:translate-x-4 shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] md:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            Phantom Chronicles // Mission Logs
          </div>
        </div>

        <!-- Category Filter Tabs (P5 Style) -->
        <div data-aos="fade-left" data-aos-delay="250" class="flex flex-wrap gap-2 sm:gap-3">
          <button
            v-for="filter in filters"
            :key="filter.id"
            @click="activeFilter = filter.id"
            class="relative group px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-black italic uppercase tracking-wider transition-all duration-300 focus:outline-none"
          >
            <div 
              class="absolute inset-0 bg-black border-2 border-white transform md:-skew-x-12 transition-all duration-300"
              :class="activeFilter === filter.id ? 'bg-red-600 border-red-600 shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] sm:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] scale-105 z-10' : 'hover:bg-zinc-800'"
            ></div>
            <span class="relative z-20 transform md:skew-x-12 inline-block text-white">
              {{ filter.label }}
            </span>
          </button>
        </div>
      </div>

      <!-- Timeline Vertical Container -->
      <div class="relative mt-8 md:mt-12">
        <!-- Central Timeline Line (Desktop) -->
        <div class="hidden md:block absolute left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-gradient-to-b from-red-600 via-white to-red-600 z-0">
          <div class="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_8px,rgba(0,0,0,0.4)_8px,rgba(0,0,0,0.4)_16px)]"></div>
        </div>

        <!-- Mobile Left Line -->
        <div class="md:hidden absolute left-3 sm:left-4 top-4 bottom-4 w-1 bg-gradient-to-b from-red-600 via-white to-red-600 z-0"></div>

        <!-- Timeline Items Loop -->
        <div class="space-y-8 md:space-y-16">
          <div 
            v-for="(item, index) in filteredExperiences" 
            :key="item.id"
            class="relative flex flex-col md:flex-row items-start md:items-center"
            :class="[
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            ]"
          >
            <!-- Timeline Center Marker / Star Node -->
            <div class="absolute left-3 sm:left-4 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center top-6 md:top-auto">
              <div class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-black border-2 border-white transform rotate-45 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(220,38,38,1)] md:shadow-[3px_3px_0px_0px_rgba(220,38,38,1)] group hover:rotate-90 transition-transform duration-500">
                <span class="text-red-600 text-sm sm:text-base md:text-xl font-black transform -rotate-45 select-none animate-pulse">★</span>
              </div>
            </div>

            <!-- Card Content Wrapper -->
            <div 
              class="w-full pl-8 sm:pl-11 md:pl-0 md:w-5/12"
              :class="[
                index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'
              ]"
              :data-aos="index % 2 === 0 ? 'p5-slide-right' : 'p5-slide-left'"
              :data-aos-delay="150 + index * 100"
            >
              <!-- Card Outer Wrapper (Skewed only on Desktop) -->
              <div class="group relative transform md:-skew-x-6 hover:-translate-y-1 transition-all duration-300">
                
                <!-- Main Card Box -->
                <div class="bg-zinc-950/95 border-2 border-white p-4 sm:p-6 md:p-8 relative overflow-hidden shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] md:shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] md:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:border-red-500 transition-all duration-300">
                  
                  <!-- Top Badge Bar -->
                  <div 
                    class="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 md:mb-4 transform md:skew-x-6"
                    :class="index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'"
                  >
                    <!-- Rank Badge -->
                    <span class="bg-red-600 text-white font-black italic text-[10px] sm:text-xs tracking-wider px-2 sm:px-3 py-0.5 sm:py-1 border border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase">
                      {{ item.rank }}
                    </span>

                    <!-- Work Type Badge -->
                    <span class="bg-white text-black font-black italic text-[10px] sm:text-xs tracking-wider px-2 sm:px-3 py-0.5 sm:py-1 border border-black uppercase">
                      {{ item.type }} • {{ item.workMode }}
                    </span>

                    <!-- Period Badge -->
                    <span class="bg-zinc-800 text-gray-300 font-mono text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 border border-zinc-700">
                      {{ item.period }}
                    </span>
                  </div>

                  <!-- Role Title & Company -->
                  <div class="transform md:skew-x-6 mb-3 md:mb-4">
                    <h3 class="text-xl sm:text-2xl md:text-3xl font-black text-white italic tracking-tight uppercase group-hover:text-red-500 transition-colors break-words">
                      {{ item.role }}
                    </h3>
                    <div 
                      class="flex flex-wrap items-center gap-2 mt-1 text-base sm:text-lg font-bold text-red-500 tracking-wide" 
                      :class="index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'"
                    >
                      <span>@ {{ item.company }}</span>
                      <a 
                        v-if="item.companyUrl" 
                        :href="item.companyUrl" 
                        target="_blank" 
                        rel="noopener" 
                        class="text-gray-400 hover:text-white transition-colors inline-flex items-center"
                        aria-label="Visit company website"
                      >
                        <svg class="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                        </svg>
                      </a>
                    </div>
                    <p class="text-[11px] sm:text-xs text-gray-400 font-mono mt-1">
                      📍 {{ item.location }}
                    </p>
                  </div>

                  <!-- Summary -->
                  <p class="transform md:skew-x-6 text-xs sm:text-sm text-gray-300 font-medium mb-4 md:mb-5 leading-relaxed">
                    {{ item.summary }}
                  </p>

                  <!-- Highlights List -->
                  <div class="transform md:skew-x-6 space-y-2 sm:space-y-3 mb-5 text-left">
                    <div 
                      v-for="(hl, hIdx) in item.highlights" 
                      :key="hIdx"
                      class="bg-black/60 border-l-4 border-red-600 p-2.5 sm:p-3 text-xs sm:text-sm text-gray-200"
                    >
                      <span class="font-black text-white italic block mb-0.5 text-[11px] sm:text-xs uppercase tracking-wider text-red-400">
                        ★ {{ hl.title }}
                      </span>
                      <span class="text-gray-300 text-xs leading-relaxed block">
                        {{ hl.description }}
                      </span>
                    </div>
                  </div>

                  <!-- Skills / Badges -->
                  <div 
                    class="transform md:skew-x-6 flex flex-wrap gap-1.5 pt-2 border-t border-zinc-800"
                    :class="index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'"
                  >
                    <span 
                      v-for="skill in item.skills" 
                      :key="skill"
                      class="bg-zinc-900 text-gray-300 border border-zinc-700 text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 transform md:-skew-x-6 hover:border-red-500 hover:text-white transition-colors"
                    >
                      #{{ skill }}
                    </span>
                  </div>

                  <!-- Decorative Background Watermark -->
                  <div class="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 text-zinc-900/30 text-5xl sm:text-6xl md:text-7xl font-black italic pointer-events-none select-none z-0 transform md:-skew-x-12">
                    0{{ index + 1 }}
                  </div>

                </div>
              </div>
            </div>

            <!-- Spacer for Empty Side on Desktop -->
            <div class="hidden md:block w-5/12"></div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { experiences } from '~/data/content'

const activeFilter = ref<'all' | 'Internship' | 'Education'>('all')

const filters = [
  { id: 'all', label: 'ALL MISSIONS' },
  { id: 'Internship', label: 'INTERNSHIPS' },
  { id: 'Education', label: 'EDUCATION' }
]

const filteredExperiences = computed(() => {
  if (activeFilter.value === 'all') {
    return experiences
  }
  return experiences.filter(exp => exp.type === activeFilter.value)
})
</script>

<style scoped>
/* P5 responsive styling enhancements */
</style>
