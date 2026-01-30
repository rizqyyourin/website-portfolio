<template>
  <div style="background-color: #000; min-height: 100vh;">
    <ClientOnly>
      <LoadingScreen :is-loading="isLoading" :progress="progress" />
      <template #placeholder>
        <!-- Loading screen for SSR - matches LoadingScreen exactly -->
        <div class="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden ssr-loading-bg">
          <div class="relative z-10 text-center">
            <!-- Logo -->
            <div class="relative w-32 h-32 mx-auto mb-8 ssr-spin">
              <div class="absolute inset-0 border-4 border-red-600 transform skew-x-12"></div>
              <div class="absolute inset-0 border-4 border-white transform -skew-x-12 ssr-pulse"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                 <span class="text-4xl font-black text-white italic">Yourin</span>
              </div>
            </div>
            <!-- Loading Text -->
            <div class="overflow-hidden mb-8 ssr-slide-up">
                 <h2 class="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase transform -skew-x-12">
                   <span class="inline-block bg-red-600 px-4 text-black ssr-shadow-white">
                     LOADING
                   </span>
                 </h2>
            </div>
            <!-- Loading Bar - animates from 0% to 70% -->
            <div class="w-64 h-4 bg-gray-900 border-2 border-white transform -skew-x-12 mx-auto mb-4 overflow-hidden ssr-shadow-red">
              <div class="h-full bg-red-600 ssr-progress-bar"></div>
            </div>
            <!-- Status - no percentage during SSR -->
            <p class="text-red-500 font-mono text-sm md:text-base ssr-pulse-fast">
                >> INITIALIZING METAVERSE_NAVIGATOR...
            </p>
          </div>
          <!-- Corner Decorations -->
          <div class="absolute top-0 left-0 w-32 h-32 border-t-8 border-l-8 border-white rounded-tl-3xl opacity-50"></div>
          <div class="absolute bottom-0 right-0 w-32 h-32 border-b-8 border-r-8 border-red-600 rounded-br-3xl opacity-50"></div>
        </div>
      </template>
    </ClientOnly>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useLoading } from '~/composables/useLoading'
import LoadingScreen from '~/components/ui/LoadingScreen.vue'

const { isLoading, progress, startLoading, finishLoading, setProgress } = useLoading()

useHead({
  bodyAttrs: {
    style: 'background-color: #000;'
  }
})

onMounted(() => {
  // Continue from where SSR left off (SSR bar animates to 70%)
  progress.value = 70
  isLoading.value = true
  
  let currentProgress = 70
  let interval: NodeJS.Timeout | null = null
  
  // Continue progress from 70% to 95%
  interval = setInterval(() => {
    if (currentProgress < 95) {
      currentProgress += Math.random() * 8 + 2 // 2-10% increment, slower
      if (currentProgress > 95) currentProgress = 95
      progress.value = currentProgress
    }
  }, 150)

  const finish = () => {
    if (interval) clearInterval(interval)
    progress.value = 100
    // Give time for 100% to be visible before hiding
    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }

  // Handle page load
  const handleLoad = () => {
    setTimeout(finish, 400)
  }

  if (document.readyState === 'complete') {
    handleLoad()
  } else {
    window.addEventListener('load', handleLoad, { once: true })
    // Fallback max 3 seconds
    setTimeout(finish, 3000)
  }
})
</script>

<style>
/* SSR Loading Screen Animations */
.ssr-loading-bg {
  background-color: #000000 !important;
}

.ssr-spin {
  animation: ssrSpin 8s linear infinite;
}

.ssr-pulse {
  animation: ssrPulse 2s ease-in-out infinite;
}

.ssr-pulse-fast {
  animation: ssrPulse 1.5s ease-in-out infinite;
}

.ssr-slide-up {
  animation: ssrSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.ssr-shadow-white {
  box-shadow: 4px 4px 0px 0px white;
}

.ssr-shadow-red {
  box-shadow: 4px 4px 0px 0px #dc2626;
}

.ssr-progress-bar {
  width: 0%;
  animation: ssrProgressBar 2s ease-out forwards;
}

@keyframes ssrSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes ssrPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes ssrSlideUp {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes ssrProgressBar {
  0% { width: 0%; }
  100% { width: 70%; }
}
</style>
