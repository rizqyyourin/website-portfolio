<template>
  <div class="relative max-w-3xl mx-auto bg-zinc-950 border-2 border-white/80 p-5 sm:p-7 shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] max-md:shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] transform md:-skew-x-2 overflow-visible">
    
    <!-- Header -->
    <div class="mb-5 space-y-1.5 text-center md:text-left">
      <div class="inline-block bg-red-600 text-white text-[11px] font-black italic tracking-widest px-2.5 py-0.5 uppercase transform -skew-x-6">
        Event Dispatcher
      </div>
      <h3 class="text-2xl sm:text-3xl font-black italic uppercase tracking-tight text-white">
        Real-Time Notification Center
      </h3>
    </div>

    <!-- Main Container -->
    <div class="bg-zinc-900 border border-zinc-700 p-4 sm:p-5 shadow-inner relative min-h-[380px] flex flex-col justify-between">
      
      <!-- MODE A: DASHBOARD VIEW WITH INTERACTIVE NAVBAR & DROPDOWN -->
      <div v-if="!isFullView" class="space-y-4">
        
        <!-- App Navigation Bar -->
        <div class="bg-black border border-zinc-800 px-3 sm:px-4 py-2.5 flex items-center justify-between gap-3 relative z-30">
          
          <!-- Workspace Title & Live Status -->
          <div class="flex items-center gap-2 text-xs font-mono text-zinc-300">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span class="text-white font-bold">Ticketing Hub</span>
            <span class="text-zinc-600 hidden sm:inline">/</span>
            <span class="text-zinc-400 hidden sm:inline">Live Operations</span>
          </div>

          <!-- Right: Interactive Bell Icon + User Avatar -->
          <div class="flex items-center gap-2.5">
            
            <!-- NOTIFICATION BELL DROPDOWN ANCHOR -->
            <div class="relative notif-dropdown-anchor">
              <button
                type="button"
                @click.stop="isOpenDropdown = !isOpenDropdown"
                title="Toggle Notifications"
                class="w-8 h-8 rounded bg-zinc-900 hover:bg-zinc-800 text-gray-200 hover:text-white border border-zinc-700 flex items-center justify-center transition-colors relative focus:outline-none"
                :class="{ 'border-red-500 bg-zinc-800 text-white shadow-[2px_2px_0px_0px_rgba(220,38,38,1)]': isOpenDropdown }"
              >
                <!-- Bell SVG -->
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                </svg>

                <!-- Unread Counter -->
                <span v-if="unreadCount > 0" class="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-600 border border-white text-white text-[9px] font-black rounded-full flex items-center justify-center">
                  {{ unreadCount }}
                </span>
              </button>

              <!-- FLOATING DROPDOWN CARD -->
              <Transition name="dropdown-pop">
                <div
                  v-if="isOpenDropdown"
                  @click.stop
                  class="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-zinc-950 border-2 border-white shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] z-50 p-2.5 text-left space-y-2 font-mono"
                >
                  <!-- Dropdown Header -->
                  <div class="flex items-center justify-between border-b border-zinc-800 pb-1.5 text-xs">
                    <div class="flex items-center gap-1.5 font-bold text-white">
                      <span>Notifications</span>
                      <span v-if="unreadCount > 0" class="px-1.5 py-0.2 bg-red-600/30 text-red-400 border border-red-500/40 text-[9px] rounded">
                        {{ unreadCount }} new
                      </span>
                    </div>

                    <button
                      type="button"
                      @click="markAllAsRead"
                      :disabled="unreadCount === 0"
                      class="text-[10px] text-zinc-400 hover:text-white disabled:opacity-30 transition-colors"
                    >
                      Mark read
                    </button>
                  </div>

                  <!-- Scrollable Feed -->
                  <div class="space-y-1.5 max-h-44 overflow-y-auto pr-1 custom-notif-scroll">
                    <div
                      v-for="item in notifications.slice(0, 4)"
                      :key="item.id"
                      @click="toggleRead(item)"
                      class="p-2 bg-black border border-zinc-800 hover:border-zinc-700 rounded transition-all cursor-pointer flex items-start gap-2"
                      :class="{ 'border-l-2 border-l-red-600': !item.read }"
                    >
                      <!-- SVG Icon -->
                      <div 
                        class="w-5 h-5 rounded flex items-center justify-center shrink-0 border mt-0.5"
                        :style="{ backgroundColor: `${item.color}15`, borderColor: `${item.color}40`, color: item.color }"
                      >
                        <svg v-if="item.type === 'sla'" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                        </svg>
                        <svg v-else-if="item.type === 'mention'" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                        </svg>
                        <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                      </div>

                      <div class="min-w-0 flex-1">
                        <div class="text-[10px] font-bold text-white truncate flex items-center justify-between">
                          <span>{{ item.title }}</span>
                          <span v-if="!item.read" class="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                        </div>
                        <p class="text-[9px] text-zinc-400 leading-tight truncate">
                          {{ item.desc }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- Dropdown Footer -->
                  <button
                    type="button"
                    @click="openFullView"
                    class="w-full py-1.5 bg-red-600 hover:bg-white text-white hover:text-red-600 text-[11px] font-black uppercase tracking-wider text-center transition-colors border border-white"
                  >
                    View All Notifications ({{ notifications.length }}) →
                  </button>
                </div>
              </Transition>
            </div>

            <!-- User Avatar -->
            <div class="w-7 h-7 rounded-full bg-red-600 border border-white flex items-center justify-center font-black text-[10px] text-white shrink-0">
              RY
            </div>
          </div>

        </div>

        <!-- MINI OPERATIONS DASHBOARD -->
        <div class="space-y-3 font-mono text-xs">
          
          <!-- Mini Stats Row -->
          <div class="grid grid-cols-3 gap-2 sm:gap-3">
            <div class="bg-black border border-zinc-800 p-2.5 rounded">
              <span class="text-zinc-500 block text-[9px] uppercase">Active Queue</span>
              <span class="text-white font-bold text-sm sm:text-base">24 Tickets</span>
            </div>

            <div class="bg-black border border-zinc-800 p-2.5 rounded">
              <span class="text-zinc-500 block text-[9px] uppercase">SLA Compliance</span>
              <span class="text-emerald-400 font-bold text-sm sm:text-base">99.4%</span>
            </div>

            <div class="bg-black border border-zinc-800 p-2.5 rounded">
              <span class="text-zinc-500 block text-[9px] uppercase">Avg 1st Response</span>
              <span class="text-red-400 font-bold text-sm sm:text-base">12 Mins</span>
            </div>
          </div>

          <!-- Mini Active Tickets Table -->
          <div class="bg-black border border-zinc-800 p-3 rounded space-y-2">
            <div class="flex items-center justify-between text-[10px] text-zinc-500 uppercase font-bold border-b border-zinc-800 pb-1.5">
              <span>Priority Incident Feed</span>
              <span>Status</span>
            </div>

            <div class="space-y-1.5 text-[11px]">
              <div class="flex items-center justify-between gap-2 p-1.5 bg-zinc-950 rounded border border-zinc-800/80">
                <div class="flex items-center gap-2 truncate">
                  <span class="w-2 h-2 rounded-full bg-red-500"></span>
                  <span class="text-white font-bold">#TK-9042</span>
                  <span class="text-zinc-400 truncate">Payment Webhook Timeout</span>
                </div>
                <span class="text-[10px] text-emerald-400 font-bold px-1.5 py-0.5 bg-emerald-950/60 border border-emerald-500/40 rounded shrink-0">
                  Assigned @Rizqy
                </span>
              </div>

              <div class="flex items-center justify-between gap-2 p-1.5 bg-zinc-950 rounded border border-zinc-800/80">
                <div class="flex items-center gap-2 truncate">
                  <span class="w-2 h-2 rounded-full bg-yellow-500"></span>
                  <span class="text-white font-bold">#TK-9045</span>
                  <span class="text-zinc-400 truncate">SSO Login Latency Spike</span>
                </div>
                <span class="text-[10px] text-yellow-400 font-bold px-1.5 py-0.5 bg-yellow-950/60 border border-yellow-500/40 rounded shrink-0">
                  Assigned @Morgana
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      <!-- MODE B: FULL NOTIFICATION CENTER CONTAINER (EXPANDED VIEW) -->
      <div v-else class="space-y-3 font-mono text-xs animate-fade-in flex-1 flex flex-col justify-between">
        
        <div class="space-y-3">
          <!-- Full View Header & Back Action -->
          <div class="flex items-center justify-between border-b border-zinc-800 pb-2.5">
            <button
              type="button"
              @click="closeFullView"
              class="px-2.5 py-1 bg-black hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 text-[11px] font-bold rounded flex items-center gap-1 transition-colors"
            >
              ← Back to Dashboard
            </button>

            <button
              type="button"
              @click="markAllAsRead"
              :disabled="unreadCount === 0"
              class="px-2 py-1 text-[10px] text-zinc-400 hover:text-white disabled:opacity-30 transition-colors border border-zinc-800 rounded"
            >
              Mark all as read
            </button>
          </div>

          <!-- Category Filters -->
          <div class="flex flex-wrap items-center gap-1.5 text-[11px]">
            <button
              v-for="cat in categories"
              :key="cat.id"
              type="button"
              @click="activeCategory = cat.id"
              class="px-2.5 py-0.5 border text-[11px] font-bold rounded transition-colors"
              :class="activeCategory === cat.id 
                ? 'bg-red-600 text-white border-white' 
                : 'bg-black text-gray-400 border-zinc-800 hover:text-white'"
            >
              {{ cat.label }}
            </button>
          </div>

          <!-- Full Scrollable Notifications Feed -->
          <div class="space-y-2 max-h-[220px] overflow-y-auto pr-1 custom-notif-scroll">
            <div
              v-for="item in filteredNotifications"
              :key="item.id"
              @click="toggleRead(item)"
              class="p-2.5 bg-black border border-zinc-800 hover:border-zinc-600 rounded transition-all cursor-pointer flex items-start justify-between gap-2.5 group"
              :class="{ 'border-l-2 border-l-red-600 bg-black/95': !item.read }"
            >
              <div class="flex items-start gap-2.5 min-w-0">
                <!-- SVG Icon -->
                <div 
                  class="w-7 h-7 rounded flex items-center justify-center shrink-0 border mt-0.5"
                  :style="{ backgroundColor: `${item.color}15`, borderColor: `${item.color}40`, color: item.color }"
                >
                  <svg v-if="item.type === 'sla'" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                  </svg>
                  <svg v-else-if="item.type === 'mention'" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                  </svg>
                  <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>

                <!-- Text Content -->
                <div class="space-y-0.5 min-w-0">
                  <div class="text-[11px] font-bold text-white flex items-center gap-1.5">
                    <span class="truncate">{{ item.title }}</span>
                    <span v-if="!item.read" class="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                  </div>
                  <p class="text-[10px] text-zinc-400 leading-snug">
                    {{ item.desc }}
                  </p>
                  <span class="text-[9px] text-zinc-600 block">{{ item.time }}</span>
                </div>
              </div>

              <!-- Delete Action -->
              <button
                type="button"
                @click.stop="deleteNotif(item.id)"
                class="text-zinc-600 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Dismiss"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface NotificationItem {
  id: string
  type: 'sla' | 'mention' | 'ticket'
  title: string
  desc: string
  time: string
  read: boolean
  color: string
}

const isOpenDropdown = ref(false)
const isFullView = ref(false)
const activeCategory = ref('all')

const categories = [
  { id: 'all', label: 'All' },
  { id: 'sla', label: 'SLA' },
  { id: 'mention', label: 'Mentions' },
  { id: 'ticket', label: 'Tickets' }
]

const notifications = ref<NotificationItem[]>([
  {
    id: 'n1',
    type: 'sla',
    title: 'SLA Escalation Triggered',
    desc: 'Ticket #TK-9042 escalated to you by SLA Engine due to Critical policy.',
    time: '2m ago',
    read: false,
    color: '#ef4444'
  },
  {
    id: 'n2',
    type: 'mention',
    title: '@Morgana mentioned you',
    desc: 'In Ticket #8092: "@Rizqy please verify the webhook timeout patch."',
    time: '12m ago',
    read: false,
    color: '#a855f7'
  },
  {
    id: 'n3',
    type: 'ticket',
    title: 'VIP Ticket Assigned',
    desc: 'New Enterprise ticket #TK-9045 assigned to your queue.',
    time: '35m ago',
    read: false,
    color: '#06b6d4'
  },
  {
    id: 'n4',
    type: 'mention',
    title: '@Ryuji shared attachment',
    desc: 'Added staging-k6-results.csv to Ticket #8092.',
    time: '3h ago',
    read: true,
    color: '#eab308'
  }
])

const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.read).length
})

const filteredNotifications = computed(() => {
  if (activeCategory.value === 'all') return notifications.value
  return notifications.value.filter(n => n.type === activeCategory.value)
})

const toggleRead = (item: NotificationItem) => {
  item.read = !item.read
}

const markAllAsRead = () => {
  notifications.value.forEach(n => {
    n.read = true
  })
}

const deleteNotif = (id: string) => {
  notifications.value = notifications.value.filter(n => n.id !== id)
}

const openFullView = () => {
  isOpenDropdown.value = false
  isFullView.value = true
}

const closeFullView = () => {
  isFullView.value = false
}

const handleDocumentClick = (e: MouseEvent) => {
  if (!isOpenDropdown.value) return
  const target = e.target as HTMLElement
  if (!target.closest('.notif-dropdown-anchor')) {
    isOpenDropdown.value = false
  }
}

onMounted(() => {
  if (typeof document !== 'undefined') {
    window.addEventListener('click', handleDocumentClick)
  }
})

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    window.removeEventListener('click', handleDocumentClick)
  }
})
</script>

<style scoped>
.dropdown-pop-enter-active {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.dropdown-pop-leave-active {
  transition: all 0.15s ease-in;
}
.dropdown-pop-enter-from,
.dropdown-pop-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.97);
}

.animate-fade-in {
  animation: fadeIn 0.25s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

.custom-notif-scroll::-webkit-scrollbar {
  width: 4px;
}
.custom-notif-scroll::-webkit-scrollbar-track {
  background: #18181b;
}
.custom-notif-scroll::-webkit-scrollbar-thumb {
  background: #dc2626;
}
</style>
