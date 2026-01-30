<template>
  <Transition 
    enter-active-class="transition-opacity duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-all duration-700 ease-in-out"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0 -translate-y-full"
  >
  <div 
    v-show="isLoading"
    class="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
    style="background-color: #000000;"
  >
    <!-- Background Texture -->
    <div class="absolute inset-0 stardust-bg opacity-20 pointer-events-none"></div>
    
    <!-- Red Overlay/Flash -->
    <div class="absolute inset-0 bg-red-600 mix-blend-multiply opacity-0 animate-flash pointer-events-none"></div>

    <div class="relative z-10 text-center">
      <!-- P5 Rotating Logo / Spinner -->
      <div class="relative w-32 h-32 mx-auto mb-8 animate-spin-slow">
        <div class="absolute inset-0 border-4 border-red-600 transform skew-x-12"></div>
        <div class="absolute inset-0 border-4 border-white transform -skew-x-12 animate-pulse"></div>
        <div class="absolute inset-0 flex items-center justify-center">
           <span class="text-4xl font-black text-white italic">Yourin</span>
        </div>
      </div>

      <!-- Take Your Heart Text -->
      <div class="overflow-hidden mb-8">
           <h2 class="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase transform -skew-x-12">
             <span class="inline-block animate-slide-up bg-red-600 px-4 text-black shadow-[4px_4px_0px_0px_white]">
               LOADING
             </span>
           </h2>
      </div>

      <!-- Loading Bar -->
      <div class="w-64 h-4 bg-gray-900 border-2 border-white transform -skew-x-12 mx-auto mb-4 overflow-hidden shadow-[4px_4px_0px_0px_#dc2626]">
        <div 
          class="h-full bg-red-600 transition-all duration-200 ease-out" 
          :style="{ width: `${safeProgress}%` }"
        ></div>
      </div>
      
      <!-- Typewriter Status -->
      <p class="text-red-500 font-mono text-sm md:text-base animate-pulse">
          >> INITIALIZING METAVERSE_NAVIGATOR... <span class="progress-number">{{ displayProgress }}</span>%
      </p>
    </div>

    <!-- Corner Decorations -->
    <div class="absolute top-0 left-0 w-32 h-32 border-t-8 border-l-8 border-white rounded-tl-3xl opacity-50"></div>
    <div class="absolute bottom-0 right-0 w-32 h-32 border-b-8 border-r-8 border-red-600 rounded-br-3xl opacity-50"></div>
  </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  isLoading: boolean
  progress: number
}>()

const displayProgress = computed(() => Math.round(props.progress || 0))
const safeProgress = computed(() => Math.min(Math.max(props.progress || 0, 0), 100))
</script>

<style scoped>
.stardust-bg {
  background-image: url('https://www.transparenttextures.com/patterns/stardust.png');
}

@keyframes spin-slow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}

@keyframes slide-up {
  0% { transform: translateY(100%); }
  100% { transform: translateY(0); }
}

.animate-slide-up {
  animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes flash {
    0%, 100% { opacity: 0; }
    50% { opacity: 0.3; }
}

.animate-flash {
    animation: flash 0.2s ease-in-out infinite alternate;
}

.progress-number {
  display: inline-block;
  min-width: 2ch;
  animation: fadeInNumber 0.3s ease-out;
}

@keyframes fadeInNumber {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
