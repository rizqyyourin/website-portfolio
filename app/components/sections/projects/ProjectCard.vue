<template>
  <component
    :is="project.link && project.link !== '#' ? 'a' : 'article'"
    v-bind="project.link && project.link !== '#' ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' } : {}"
    :data-aos="'p5-rise'"
    :data-aos-delay="80 + (index * 120)"
    :data-aos-duration="700"
    class="group block relative shrink-0 w-[76vw] max-w-[300px] md:max-w-none md:w-auto snap-center perspective-1000 mx-1 md:mx-0 h-full cursor-pointer"
    @mouseenter="startCarousel"
    @mouseleave="stopCarousel"
  >
    <!-- Card Wrapper -->
    <article class="relative h-full transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-1 max-md:px-1">
      
      <!-- Red Shadow Block -->
      <div class="absolute inset-0 bg-red-600 transform translate-x-3 translate-y-3 -skew-x-3 max-md:translate-x-1 max-md:translate-y-1 max-md:skew-x-0 transition-transform group-hover:translate-x-5 group-hover:translate-y-5"></div>
      
      <!-- Main Card Content -->
      <div class="relative h-full bg-zinc-900 border-2 border-white flex flex-col transform -skew-x-3 max-md:skew-x-0 overflow-hidden group-hover:border-red-400 transition-colors">
         
         <!-- Image Section with Cutout Effect & Smooth Horizontal Carousel -->
         <div class="relative h-56 bg-zinc-800 overflow-hidden border-b-2 border-white group-hover:border-red-400 transition-colors">
            <div class="absolute inset-0 bg-red-600/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

            <!-- Horizontal Sliding Images Track -->
            <div 
              v-if="imageList.length > 0"
              class="flex h-full w-full transition-transform duration-500 ease-out"
              :style="{ transform: `translateX(-${activeImageIndex * 100}%)` }"
            >
              <div 
                v-for="(imgSrc, imgIdx) in imageList" 
                :key="imgSrc"
                class="w-full h-full shrink-0 relative"
              >
                <img 
                  :src="imgSrc" 
                  :alt="`${project.title} screenshot ${imgIdx + 1}`" 
                  loading="lazy" 
                  class="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500" 
                />
              </div>
            </div>
            <div v-else class="w-full h-full flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]">
               <span class="text-zinc-700 font-black text-4xl opacity-50">NO SIGNAL</span>
            </div>

            <!-- Carousel Bottom Indicators (Small circles) -->
            <div 
              v-if="hasMultipleImages" 
              class="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-full border border-white/10 transition-opacity duration-300"
              :class="isHovered ? 'opacity-100' : 'opacity-70'"
            >
              <button 
                v-for="(_, imgIdx) in imageList" 
                :key="imgIdx"
                type="button"
                @click.stop.prevent="activeImageIndex = imgIdx"
                class="rounded-full transition-all duration-300 focus:outline-none"
                :class="[
                  imgIdx === activeImageIndex 
                    ? 'w-2.5 h-2.5 bg-red-600 border border-white shadow-[0_0_8px_rgba(220,38,38,0.9)] scale-110' 
                    : 'w-2 h-2 bg-zinc-500/70 hover:bg-white'
                ]"
                :aria-label="`Go to slide ${imgIdx + 1}`"
              ></button>
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
            <div class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 transform rotate-12 pointer-events-none">
               <div class="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-pulse">
                  <span class="text-white font-black text-[10px] text-center leading-tight">TAKE<br>YOUR<br>HEART</span>
               </div>
            </div>
         </div>
      </div>
    </article>
  </component>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

export interface Project {
  title: string
  description: string
  image: string
  images?: string[]
  link?: string
  tags: string[]
}

const props = defineProps<{
  project: Project
  index: number
}>()

const activeImageIndex = ref(0)
const isHovered = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

const imageList = computed(() => {
  if (props.project.images && props.project.images.length > 0) {
    return props.project.images
  }
  return props.project.image ? [props.project.image] : []
})

const hasMultipleImages = computed(() => imageList.value.length > 1)

function startCarousel() {
  isHovered.value = true
  if (hasMultipleImages.value) {
    stopTimer()
    timer = setInterval(() => {
      activeImageIndex.value = (activeImageIndex.value + 1) % imageList.value.length
    }, 1800)
  }
}

function stopCarousel() {
  isHovered.value = false
  stopTimer()
  activeImageIndex.value = 0
}

function stopTimer() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

// Preload images for seamless hover transitions
onMounted(() => {
  if (hasMultipleImages.value) {
    imageList.value.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }
})

onUnmounted(() => {
  stopTimer()
})
</script>
