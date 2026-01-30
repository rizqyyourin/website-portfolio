<template>
  <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
    <!-- P5 Comic Border Top -->
    <div class="h-2 bg-red-600 w-full relative z-50">
       <div class="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.2)_10px,rgba(0,0,0,0.2)_20px)]"></div>
    </div>

    <!-- Main Navbar -->
    <div class="bg-black/90 backdrop-blur-md border-b-4 border-white relative overflow-hidden">
      <!-- Background Noise -->
      <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>

      <nav class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div class="flex justify-between items-center h-20 md:h-24">
          <!-- Logo (Phantom Thief Style) -->
          <NuxtLink to="/" class="group relative perspective-1000">
             <div class="transform -skew-x-12 bg-white border-2 border-red-600 px-4 py-2 shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] group-hover:bg-red-600 group-hover:border-white transition-colors duration-300">
                <span class="font-black text-2xl md:text-3xl text-black italic tracking-tighter transform skew-x-12 group-hover:text-white block">
                   YOURIN
                </span>
             </div>
             <!-- Star decoration -->
             <div class="absolute -top-3 -right-3 text-red-600 text-2xl animate-spin-slow pointer-events-none">★</div>
          </NuxtLink>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center gap-6">
            <a v-for="(item, index) in navigation" 
               :key="item.name"
               :href="item.href"
               :class="['relative px-4 py-2 font-black italic text-lg tracking-wide uppercase transform transition-all duration-300 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]', activeSection === item.href.substring(1) ? 'bg-red-600 text-white -skew-x-12 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]' : 'bg-black text-gray-300 border border-gray-600 hover:bg-white hover:text-black hover:-skew-x-12 hover:border-white']"
            >
              <span :class="[activeSection === item.href.substring(1) || 'hover:skew-x-12']" class="block transform transition-transform">
                 {{ item.name }}
              </span>
            </a>
          </div>

          <!-- Mobile Menu Button -->
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden p-2 transform -skew-x-12 bg-red-600 text-white border-2 border-white shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:bg-white hover:text-red-600"
          >
            <div class="transform skew-x-12">
               <Bars3Icon class="w-8 h-8" />
            </div>
          </button>
        </div>
      </nav>
    </div>

    <!-- Mobile Menu Overlay -->
    <transition name="p5-mobile-menu">
      <div 
        v-if="isMobileMenuOpen"
        class="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center space-y-8"
        @click.self="isMobileMenuOpen = false"
      >
        <!-- Close Button -->
        <button class="absolute top-8 right-8 text-white text-4xl font-black hover:text-red-600 hover:rotate-90 transition-transform" @click="isMobileMenuOpen = false">×</button>

        <div class="flex flex-col space-y-6 w-full max-w-xs">
          <a v-for="(item, index) in navigation"
             :key="item.name"
             :href="item.href"
             @click="isMobileMenuOpen = false"
             class="block w-full bg-red-600 text-white font-black italic text-2xl text-center py-4 transform -skew-x-12 border-2 border-white hover:bg-white hover:text-red-600 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-200"
             :style="{ transitionDelay: `${index * 50}ms` }"
          >
             <span class="inline-block transform skew-x-12">{{ item.name }}</span>
          </a>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { Bars3Icon } from '@heroicons/vue/24/outline'
import { navigation } from '~/data/content'

const isMobileMenuOpen = ref(false)
const activeSection = ref('home')

onMounted(() => {
  const handleScroll = () => {
    // Extract section IDs from navigation
    const sections = navigation.map(item => item.href.substring(1))
    
    for (const section of sections) {
      const element = document.getElementById(section)
      if (element) {
        const rect = element.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom > 100) {
          activeSection.value = section
          break
        }
      }
    }
  }
  
  window.addEventListener('scroll', handleScroll)
  
  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

