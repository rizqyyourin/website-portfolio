<template>
  <section 
    id="blueprint" 
    ref="sectionRef"
    class="relative bg-zinc-950 border-t-4 border-red-600 h-[500vh]"
  >
    <!-- Background Texture -->
    <div class="absolute inset-0 z-0 pointer-events-none opacity-20">
      <div class="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_15px,rgba(220,38,38,0.12)_15px,rgba(220,38,38,0.12)_30px)]"></div>
      <div class="absolute top-1/3 -left-20 w-80 h-80 bg-red-600 rounded-full mix-blend-screen filter blur-[120px] opacity-30"></div>
    </div>

    <!-- Pinned / Sticky Viewport Container -->
    <div class="sticky top-[76px] md:top-[96px] h-[calc(100vh-76px)] md:h-[calc(100vh-96px)] flex flex-col justify-center py-2 md:py-4 z-20 overflow-visible">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        <!-- Header -->
        <div class="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div class="inline-block transform -skew-x-12 bg-white px-2.5 py-0.5 mb-1.5 shadow-[2px_2px_0px_0px_rgba(220,38,38,1)]">
              <span class="text-black font-black text-xs tracking-widest uppercase">FEATURE SHOWCASE</span>
            </div>
            <h2 class="text-3xl sm:text-5xl md:text-6xl font-black text-white italic tracking-tighter uppercase transform -skew-x-6 leading-none whitespace-nowrap">
              WHAT I MADE
            </h2>
            <p class="text-xs sm:text-sm text-red-500 font-mono font-bold mt-2 transform -skew-x-6 flex items-center gap-1.5">
              <span class="text-zinc-500">//</span>
              <span>Based on Latest Project</span>
            </p>
          </div>

          <!-- Mobile Active Level Indicator Bar -->
          <div class="lg:hidden flex items-center justify-between p-2 bg-black border border-zinc-800">
            <span class="text-xs font-mono font-black text-white flex items-center gap-2">
              <span class="px-1.5 py-0.5 bg-red-600 text-white text-[10px]">0{{ activeStep + 1 }}</span>
              <span>{{ features[activeStep]?.name }}</span>
            </span>
            <div class="flex items-center gap-1">
              <span 
                v-for="(_, idx) in features" 
                :key="idx"
                class="w-2 h-2 rounded-full transition-all duration-300"
                :class="activeStep === idx ? 'bg-red-600 w-4' : 'bg-zinc-700'"
              ></span>
            </div>
          </div>
        </div>

        <!-- 2-Column Layout: Left Vertical Levels + Right Sticky Showcase -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <!-- LEFT: VERTICAL LEVEL TRACKER (DESKTOP) -->
          <div class="hidden lg:flex lg:col-span-3 flex-col gap-2 font-mono relative">
            
            <!-- Vertical Line Connecting Levels -->
            <div class="absolute left-4 top-4 bottom-4 w-0.5 bg-zinc-800 z-0"></div>

            <!-- Level Items -->
            <button
              v-for="(feature, idx) in features"
              :key="feature.id"
              type="button"
              @click="setStep(idx)"
              class="relative z-10 text-left transition-all duration-300 focus:outline-none flex items-center gap-3 p-2.5 rounded group"
              :class="activeStep === idx 
                ? 'bg-red-600 text-white border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transform -skew-x-6 scale-105' 
                : 'bg-black/80 text-zinc-500 border border-zinc-800/80 hover:border-zinc-600 hover:text-zinc-300'"
            >
              <!-- Level Number Badge -->
              <span 
                class="w-6 h-6 rounded flex items-center justify-center text-xs font-black shrink-0 border"
                :class="activeStep === idx 
                  ? 'bg-black text-white border-white' 
                  : 'bg-zinc-900 text-zinc-600 border-zinc-800 group-hover:text-white'"
              >
                0{{ idx + 1 }}
              </span>

              <!-- Level Title -->
              <div class="min-w-0 flex-1">
                <div class="text-xs font-black uppercase tracking-wider truncate">
                  {{ feature.name }}
                </div>
              </div>
            </button>

          </div>

          <!-- RIGHT: STICKY SHOWCASE CARD CONTENT CONTAINER -->
          <div class="lg:col-span-9 relative">
            <Transition name="step-fade" mode="out-in">
              <!-- Showcase 1: WebSocket Real-Time Presence -->
              <div v-if="activeStep === 0" key="step-0">
                <WebSocketCard />
              </div>

              <!-- Showcase 2: Smart Email Editor -->
              <div v-else-if="activeStep === 1" key="step-1">
                <EmailEditorCard />
              </div>

              <!-- Showcase 3: Collaborative Post & Discussion Thread -->
              <div v-else-if="activeStep === 2" key="step-2">
                <ThreadPostCard />
              </div>

              <!-- Showcase 4: SLA Matching & Escalation Engine -->
              <div v-else-if="activeStep === 3" key="step-3">
                <SlaEngineCard />
              </div>

              <!-- Showcase 5: Real-Time Notification Center -->
              <div v-else-if="activeStep === 4" key="step-4">
                <NotificationCenterCard />
              </div>
            </Transition>
          </div>

        </div>

        <!-- Scroll Indicator Hint -->
        <div class="mt-3 sm:mt-4 text-center">
          <span class="text-[11px] font-mono text-gray-500 uppercase tracking-widest inline-flex items-center gap-1.5">
            <span>
              {{ 
                activeStep === 0 
                  ? 'Scroll down for Level 02: Email Editor' 
                  : activeStep === 1 
                    ? 'Scroll down for Level 03: Post & Threads' 
                    : activeStep === 2
                      ? 'Scroll down for Level 04: SLA Engine'
                      : activeStep === 3
                        ? 'Scroll down for Level 05: Notification Center'
                        : 'End of showcase' 
              }}
            </span>
            <span v-if="activeStep < 4" class="animate-bounce">↓</span>
          </span>
        </div>

      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import WebSocketCard from './WebSocketCard.vue'
import EmailEditorCard from './EmailEditorCard.vue'
import ThreadPostCard from './ThreadPostCard.vue'
import SlaEngineCard from './SlaEngineCard.vue'
import NotificationCenterCard from './NotificationCenterCard.vue'

const activeStep = ref(0)
const sectionRef = ref<HTMLElement | null>(null)

const features = [
  { id: 'presence', name: 'User Presence' },
  { id: 'email', name: 'Email Editor' },
  { id: 'thread', name: 'Post & Threads' },
  { id: 'sla', name: 'SLA Engine' },
  { id: 'notif', name: 'Notification Center' }
]

const handleScroll = () => {
  if (!sectionRef.value) return

  const rect = sectionRef.value.getBoundingClientRect()
  const sectionHeight = sectionRef.value.offsetHeight
  const viewportHeight = window.innerHeight

  const stickyOffset = 96
  const scrolledInside = stickyOffset - rect.top
  const maxScrollable = sectionHeight - viewportHeight

  if (maxScrollable > 0) {
    const progress = scrolledInside / maxScrollable
    if (progress < 0.20) {
      activeStep.value = 0
    } else if (progress < 0.40) {
      activeStep.value = 1
    } else if (progress < 0.60) {
      activeStep.value = 2
    } else if (progress < 0.80) {
      activeStep.value = 3
    } else {
      activeStep.value = 4
    }
  }
}

const setStep = (index: number) => {
  activeStep.value = index
  if (!sectionRef.value) return

  const rect = sectionRef.value.getBoundingClientRect()
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const sectionTop = scrollTop + rect.top
  const sectionHeight = sectionRef.value.offsetHeight
  const viewportHeight = window.innerHeight
  const maxScrollable = sectionHeight - viewportHeight

  let targetOffset = sectionTop
  if (index === 1) targetOffset = sectionTop + maxScrollable * 0.25
  if (index === 2) targetOffset = sectionTop + maxScrollable * 0.50
  if (index === 3) targetOffset = sectionTop + maxScrollable * 0.75
  if (index === 4) targetOffset = sectionTop + maxScrollable * 0.98

  window.scrollTo({
    top: targetOffset,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.step-fade-enter-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.step-fade-leave-active {
  transition: all 0.2s cubic-bezier(0.55, 0, 1, 0.45);
}

.step-fade-enter-from {
  opacity: 0;
  transform: translateY(16px) scale(0.98);
}
.step-fade-leave-to {
  opacity: 0;
  transform: translateY(-16px) scale(0.98);
}
</style>
