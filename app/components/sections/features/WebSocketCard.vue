<template>
  <div class="max-w-3xl mx-auto bg-zinc-950 border-2 border-white/80 p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] max-md:shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] transform md:-skew-x-2">
    
    <!-- Header -->
    <div class="mb-6 space-y-2 text-center md:text-left">
      <div class="inline-block bg-red-600 text-white text-[11px] font-black italic tracking-widest px-2.5 py-0.5 uppercase transform -skew-x-6">
        WebSocket Protocol
      </div>
      <h3 class="text-2xl sm:text-3xl font-black italic uppercase tracking-tight text-white">
        Real-Time User Presence
      </h3>
    </div>

    <!-- Interactive Presence Bar Card -->
    <div class="bg-zinc-900 border border-zinc-700 p-5 sm:p-6 space-y-5">
      
      <!-- Top Row: Status Counter & Avatar Stack -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pb-5 border-b border-zinc-800">
        
        <!-- Live Connection & Count Indicator -->
        <div class="flex items-center gap-2.5">
          <span class="relative flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span class="font-mono text-sm font-bold text-white">
            <span class="text-emerald-400">{{ activeUsers.length }} Active {{ activeUsers.length === 1 ? 'Viewer' : 'Viewers' }}</span> in Room
          </span>
        </div>

        <!-- Interactive Google Docs Style Avatar Stack (Max 3 visible + N badge) -->
        <div class="flex items-center -space-x-2 relative">
          
          <TransitionGroup name="avatar-pop">
            <div
              v-for="user in visibleUsers"
              :key="user.id"
              class="relative group cursor-pointer"
            >
              <!-- Avatar Circle -->
              <div
                class="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-black text-xs text-white border-2 border-white shadow-lg transition-transform duration-200 group-hover:scale-125 group-hover:z-30"
                :style="{ backgroundColor: user.color }"
              >
                {{ user.initials }}
              </div>

              <!-- Online Status Dot -->
              <span class="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-zinc-900 bg-emerald-500"></span>

              <!-- Hover Tooltip -->
              <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block whitespace-nowrap bg-black text-white text-xs font-mono border border-white px-2.5 py-1 shadow-lg z-50 pointer-events-none">
                <span :style="{ color: user.color }" class="font-bold">{{ user.name }}</span>
                <span class="text-gray-400 text-[10px] block">{{ user.role }}</span>
              </div>
            </div>
          </TransitionGroup>

          <!-- +N Badge with Scrollable Popover on Hover -->
          <div v-if="overflowCount > 0" class="relative group/overflow cursor-pointer z-20">
            <!-- +N Circle -->
            <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-black text-xs text-white bg-red-600 border-2 border-white shadow-lg transition-transform duration-200 group-hover/overflow:scale-110">
              +{{ overflowCount }}
            </div>

            <!-- Complete Scrollable List Popover on Hover -->
            <div class="absolute right-0 top-full mt-2 w-64 bg-black border-2 border-white shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] z-50 p-2 hidden group-hover/overflow:block">
              <div class="text-[10px] font-mono uppercase text-gray-400 font-bold px-2 py-1 border-b border-zinc-800 flex justify-between items-center">
                <span>All Active Viewers</span>
                <span class="text-emerald-400 font-bold">{{ activeUsers.length }} online</span>
              </div>
              <div class="max-h-48 overflow-y-auto space-y-1 py-1 pr-1 custom-user-scroll">
                <div 
                  v-for="user in activeUsers" 
                  :key="user.id"
                  class="flex items-center gap-2 p-1.5 hover:bg-zinc-900 transition-colors"
                >
                  <div 
                    class="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0 border border-white"
                    :style="{ backgroundColor: user.color }"
                  >
                    {{ user.initials }}
                  </div>
                  <div class="min-w-0 flex-1 text-left">
                    <div class="text-xs font-bold text-white truncate" :style="{ color: user.color }">
                      {{ user.name }}
                    </div>
                    <div class="text-[10px] text-gray-400 font-mono truncate">
                      {{ user.role }}
                    </div>
                  </div>
                  <span class="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      <!-- Live Broadcast Toast Event -->
      <div class="h-6 overflow-hidden flex items-center">
        <Transition name="slide-fade" mode="out-in">
          <div 
            :key="latestEventText"
            class="text-xs font-mono text-gray-300 flex items-center gap-2"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
            <span>{{ latestEventText }}</span>
          </div>
        </Transition>
      </div>

      <!-- Action Buttons (Simple & Clear) -->
      <div class="flex gap-3 pt-2">
        <button
          @click="addUser"
          class="flex-1 py-3 bg-red-600 hover:bg-white text-white hover:text-red-600 font-black italic uppercase tracking-wider text-xs sm:text-sm border border-white transition-colors duration-200 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5"
        >
          + Add User (Join)
        </button>

        <button
          @click="removeUser"
          :disabled="activeUsers.length <= 1"
          class="flex-1 py-3 bg-black hover:bg-zinc-800 disabled:opacity-40 disabled:pointer-events-none text-white font-black italic uppercase tracking-wider text-xs sm:text-sm border border-zinc-700 transition-colors duration-200 shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] active:translate-x-0.5 active:translate-y-0.5"
        >
          - Remove User (Leave)
        </button>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface PresenceUser {
  id: string
  name: string
  initials: string
  role: string
  color: string
}

const userPool: PresenceUser[] = [
  { id: 'u1', name: 'Rizqy (You)', initials: 'RY', role: 'Fullstack Lead', color: '#dc2626' },
  { id: 'u2', name: 'Morgana', initials: 'MO', role: 'Support Agent', color: '#0284c7' },
  { id: 'u3', name: 'Ryuji', initials: 'RJ', role: 'Tech Support', color: '#eab308' },
  { id: 'u4', name: 'Ann', initials: 'AN', role: 'CS Specialist', color: '#ec4899' },
  { id: 'u5', name: 'Yusuke', initials: 'YU', role: 'Supervisor', color: '#8b5cf6' },
  { id: 'u6', name: 'Futaba', initials: 'FU', role: 'Navigator', color: '#10b981' },
  { id: 'u7', name: 'Makoto', initials: 'MA', role: 'Team Strategist', color: '#6366f1' }
]

const activeUsers = ref<PresenceUser[]>([userPool[0]!, userPool[1]!])
const latestEventText = ref<string>('Morgana is viewing this room with you.')

// Show max 3 avatars in the stack
const visibleUsers = computed(() => activeUsers.value.slice(0, 3))

// Remaining overflow count (+N)
const overflowCount = computed(() => Math.max(0, activeUsers.value.length - 3))

const addUser = () => {
  const currentIds = new Set(activeUsers.value.map(u => u.id))
  const next = userPool.find(u => !currentIds.has(u.id))

  if (next) {
    activeUsers.value.push(next)
    latestEventText.value = `⚡ ${next.name} joined the room (presence:member_added)`
  } else {
    const num = activeUsers.value.length + 1
    const guest: PresenceUser = {
      id: `u_${num}`,
      name: `Agent #${num}`,
      initials: `A${num}`,
      role: 'Staff Viewer',
      color: '#f97316'
    }
    activeUsers.value.push(guest)
    latestEventText.value = `⚡ ${guest.name} entered the presence channel`
  }
}

const removeUser = () => {
  if (activeUsers.value.length <= 1) return
  const removed = activeUsers.value.pop()
  if (removed) {
    latestEventText.value = `⚡ ${removed.name} left the room (presence:member_removed)`
  }
}
</script>

<style scoped>
.avatar-pop-enter-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.avatar-pop-leave-active {
  transition: all 0.2s cubic-bezier(0.55, 0, 1, 0.45);
}
.avatar-pop-enter-from {
  opacity: 0;
  transform: scale(0.4) translateY(10px);
}
.avatar-pop-leave-to {
  opacity: 0;
  transform: scale(0.4) translateY(-10px);
}

.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.15s ease-in;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(4px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* Custom Scrollbar for overflow popover */
.custom-user-scroll::-webkit-scrollbar {
  width: 4px;
}
.custom-user-scroll::-webkit-scrollbar-track {
  background: #18181b;
}
.custom-user-scroll::-webkit-scrollbar-thumb {
  background: #dc2626;
}
</style>
