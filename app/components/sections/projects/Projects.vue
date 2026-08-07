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
        <ProjectCard
          v-for="(project, index) in projects"
          :key="project.title"
          :project="project"
          :index="index"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { projects } from '~/data/content'
import ProjectCard from './ProjectCard.vue'
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
