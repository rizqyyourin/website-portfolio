<template>
  <section id="projects" class="py-24 md:py-32 bg-zinc-900 relative overflow-hidden">
    <!-- Background Patterns -->
    <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-30 pointer-events-none"></div>
    <div class="absolute -right-20 top-40 w-96 h-96 bg-red-600 rounded-full blur-[128px] opacity-20 pointer-events-none"></div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
      
      <!-- P5 Header -->
      <div data-aos="p5-slide-right" data-aos-duration="650" class="mb-16 text-center md:text-left max-md:px-2">
         <div class="inline-block transform -skew-x-12 max-md:skew-x-0 bg-white px-2 mb-2">
            <span class="text-black font-black text-sm tracking-widest uppercase transform skew-x-12 max-md:skew-x-0">Projects</span>
         </div>
         <h2 data-aos="p5-zoom-in" data-aos-delay="150" data-aos-duration="750" class="text-6xl md:text-8xl font-black text-white italic tracking-tighter uppercase transform -skew-x-6 max-md:skew-x-0 text-shadow-red max-md:text-shadow-none">
            MISSION LOG
         </h2>
         <p data-aos="p5-rise" data-aos-delay="300" data-aos-duration="650" class="text-xl text-gray-300 font-bold font-mono mt-4 transform -skew-x-6 max-md:skew-x-0 border-l-4 border-red-600 pl-4 max-md:border-l-0 max-md:pl-0 inline-block bg-black/50 p-2">
            Showcase of projects and secure web applications.
         </p>
      </div>

      <div class="flex flex-row md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 overflow-x-auto md:overflow-visible snap-x snap-mandatory hide-scrollbar pb-12 pt-4 px-6 md:px-0 p5-mobile-safe">
        <template v-for="(project, index) in projects" :key="project.title">
          <a v-if="project.link && project.link !== '#'" :href="project.link" target="_blank" rel="noopener noreferrer" :data-aos="'p5-rise'" :data-aos-delay="80 + (index * 120)" :data-aos-duration="700" class="group block relative shrink-0 w-[76vw] max-w-[300px] md:max-w-none md:w-auto snap-center perspective-1000 mx-1 md:mx-0 h-full">
             <!-- Card Wrapper -->
             <article class="relative h-full transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-1 max-md:px-1">
                
                <!-- Red Shadow Block -->
                <div class="absolute inset-0 bg-red-600 transform translate-x-3 translate-y-3 -skew-x-3 max-md:translate-x-1 max-md:translate-y-1 max-md:skew-x-0 transition-transform group-hover:translate-x-5 group-hover:translate-y-5"></div>
                
                <!-- Main Card Content -->
                <div class="relative h-full bg-zinc-900 border-2 border-white flex flex-col transform -skew-x-3 max-md:skew-x-0 overflow-hidden group-hover:border-red-400 transition-colors">
                   
                   <!-- Image Section with Cutout Effect -->
                   <div class="relative h-56 bg-zinc-800 overflow-hidden border-b-2 border-white group-hover:border-red-400 transition-colors">
                      <div class="absolute inset-0 bg-red-600/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <img v-if="project.image" :src="project.image" :alt="project.title" class="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110" />
                      <div v-else class="w-full h-full flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]">
                         <span class="text-zinc-700 font-black text-4xl opacity-50">NO SIGNAL</span>
                      </div>
                     
                   </div>

                   <!-- Content Section -->
                   <div class="p-6 flex flex-col flex-grow relative">
                      <!-- Title -->
                      <h3 class="text-2xl font-black text-white italic uppercase mb-2 group-hover:text-red-500 transition-colors relative z-10">
                         {{ project.title }}
                      </h3>
                      
                      <!-- Description -->
                      <p class="text-sm text-gray-400 font-medium mb-4 flex-grow font-mono leading-relaxed relative z-10">
                         {{ project.description }}
                      </p>
                      
                      <!-- Tags -->
                      <div class="flex flex-wrap gap-2 relative z-10">
                         <span v-for="tag in project.tags" :key="tag" class="inline-block px-2 py-1 text-xs font-bold bg-white text-black transform -skew-x-12 border border-black hover:bg-red-600 hover:text-white transition-colors">
                            <span class="inline-block transform skew-x-12">#{{ tag }}</span>
                         </span>
                      </div>

                      <!-- Hover "Take Your Heart" Badge -->
                      <div class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 transform rotate-12">
                         <div class="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-pulse">
                            <span class="text-white font-black text-[10px] text-center leading-tight">TAKE<br>YOUR<br>HEART</span>
                         </div>
                      </div>
                   </div>
                </div>
             </article>
          </a>
          
          <!-- Static Card (No Link) -->
          <article v-else :data-aos="'p5-rise'" :data-aos-delay="80 + (index * 120)" :data-aos-duration="700" class="group relative shrink-0 w-[76vw] max-w-[300px] md:max-w-none md:w-auto snap-center h-full transform transition-transform duration-500 hover:-translate-y-2 hover:rotate-1 mx-1 md:mx-0 max-md:px-1">
              <!-- Red Shadow Block -->
              <div class="absolute inset-0 bg-red-600 transform translate-x-3 translate-y-3 -skew-x-3 max-md:translate-x-1 max-md:translate-y-1 max-md:skew-x-0 transition-transform group-hover:translate-x-5 group-hover:translate-y-5"></div>
              <!-- Main Card Content -->
              <div class="relative h-full bg-zinc-900 border-2 border-white flex flex-col transform -skew-x-3 max-md:skew-x-0 overflow-hidden group-hover:border-red-400 transition-colors">
                   <!-- Image Section -->
                   <div class="relative h-56 bg-zinc-800 overflow-hidden border-b-2 border-white group-hover:border-red-400 transition-colors">
                      <div class="absolute inset-0 bg-red-600/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <img v-if="project.image" :src="project.image" :alt="project.title" class="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110" />
                      <div v-else class="w-full h-full flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]">
                         <span class="text-zinc-700 font-black text-4xl opacity-50">NO SIGNAL</span>
                      </div>
                   </div>
                   <!-- Content Section -->
                   <div class="p-6 flex flex-col flex-grow relative">
                      <h3 class="text-2xl font-black text-white italic uppercase mb-2 group-hover:text-red-500 transition-colors relative z-10">{{ project.title }}</h3>
                      <p class="text-sm text-gray-400 font-medium mb-4 flex-grow font-mono leading-relaxed relative z-10">{{ project.description }}</p>
                      <div class="flex flex-wrap gap-2 relative z-10">
                         <span v-for="tag in project.tags" :key="tag" class="inline-block px-2 py-1 text-xs font-bold bg-white text-black transform -skew-x-12 border border-black hover:bg-red-600 hover:text-white transition-colors">
                            <span class="inline-block transform skew-x-12">#{{ tag }}</span>
                         </span>
                      </div>
                   </div>
              </div>
          </article>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { projects } from '~/data/content'
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

.text-shadow-red {
   text-shadow: 4px 4px 0px rgba(220, 38, 38, 1);
}

@media (max-width: 767px) {
  .text-shadow-none {
    text-shadow: none;
  }
}
</style>
