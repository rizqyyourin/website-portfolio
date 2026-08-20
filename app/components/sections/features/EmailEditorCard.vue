<template>
  <div class="relative max-w-3xl mx-auto bg-zinc-950 border-2 border-white/80 p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] max-md:shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] transform md:-skew-x-2 overflow-visible">
    
    <!-- Full-Card Success Sweep Animation Overlay -->
    <Transition name="success-sweep">
      <div 
        v-if="isSuccessSent" 
        class="absolute inset-0 z-50 bg-red-600 flex flex-col items-center justify-center p-6 text-center overflow-hidden"
      >
        <!-- Background Slanted Lines -->
        <div class="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.15)_10px,rgba(0,0,0,0.15)_20px)] pointer-events-none"></div>

        <!-- Success Content -->
        <div class="relative z-10 space-y-3 transform -skew-x-6 animate-pop-bounce">
          <div class="inline-block bg-white text-black px-3 py-1 text-xs font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            ★ DISPATCH SUCCESSFUL
          </div>

          <h4 class="text-3xl sm:text-5xl font-black text-white italic tracking-tighter uppercase drop-shadow-[3px_3px_0_#000]">
            EMAIL SENT!
          </h4>

          <div class="bg-black/90 border-2 border-white px-4 py-2 text-xs font-mono text-gray-200 inline-block shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] max-w-md truncate">
            Subj: <span class="text-red-400 font-bold">"{{ emailSubject || 'No Subject' }}"</span>
          </div>

          <div class="text-[11px] font-mono text-white/90">
            Delivered with {{ ccRecipients.length + bccRecipients.length }} @mentioned collaborators
          </div>
        </div>
      </div>
    </Transition>

    <!-- Header -->
    <div class="mb-6 space-y-2 text-center md:text-left">
      <div class="inline-block bg-red-600 text-white text-[11px] font-black italic tracking-widest px-2.5 py-0.5 uppercase transform -skew-x-6">
        Email Engine
      </div>
      <h3 class="text-2xl sm:text-3xl font-black italic uppercase tracking-tight text-white">
        Rich Email Editor
      </h3>
    </div>

    <!-- Interactive Gmail-Style Compose Box -->
    <div class="bg-zinc-900 border border-zinc-700 p-5 sm:p-6 space-y-4 shadow-inner relative">
      
      <!-- Recipients Header (To, Cc, Bcc) -->
      <div class="space-y-3 pb-4 border-b border-zinc-800 text-xs font-mono">
        
        <!-- TO FIELD -->
        <div class="flex flex-wrap items-center gap-2 relative">
          <span class="text-gray-400 w-10 font-bold">To:</span>
          
          <div class="flex flex-wrap items-center gap-1.5 flex-1 min-w-[200px]">
            <span
              v-for="(rec, idx) in toRecipients"
              :key="idx"
              class="bg-black border px-2 py-0.5 rounded text-white flex items-center gap-1.5 text-[11px]"
              :style="{ borderColor: rec.color || '#52525b' }"
            >
              <span v-if="rec.isMention" class="font-bold" :style="{ color: rec.color }">@{{ rec.name }}</span>
              <span v-else class="text-gray-300">{{ rec.email }}</span>
              <button type="button" @click="removeRecipient('to', idx)" class="text-gray-500 hover:text-red-400 font-bold ml-0.5">×</button>
            </span>

            <!-- Floating @ Add Dropdown for TO -->
            <div class="dropdown-anchor relative inline-block">
              <button
                type="button"
                @click.stop="openMentionDropdown('to')"
                class="px-2 py-0.5 bg-zinc-800 hover:bg-red-600 text-gray-300 hover:text-white border border-zinc-700 text-[11px] font-bold rounded transition-colors flex items-center gap-1"
              >
                <span class="text-red-400 font-black">@</span> add
              </button>

              <!-- Scrollable Mention List Popover -->
              <Transition name="pop-in">
                <div
                  v-if="activeTargetField === 'to'"
                  @click.stop
                  class="absolute left-0 top-full mt-2 w-64 bg-black border-2 border-white shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] z-50 p-2 text-left"
                >
                  <div class="text-[10px] font-mono uppercase text-gray-400 font-bold px-2 py-1 border-b border-zinc-800 flex justify-between items-center">
                    <span>Mention in TO</span>
                    <button type="button" @click="activeTargetField = null" class="text-gray-500 hover:text-white">✕</button>
                  </div>
                  
                  <div v-if="availableStaff.length > 0" class="max-h-44 overflow-y-auto space-y-1 py-1 pr-1 custom-user-scroll">
                    <button
                      v-for="member in availableStaff"
                      :key="member.id"
                      type="button"
                      @click="addMentionRecipient('to', member)"
                      class="w-full flex items-center gap-2 p-1.5 hover:bg-zinc-900 transition-colors text-left rounded"
                    >
                      <div
                        class="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0 border border-white"
                        :style="{ backgroundColor: member.color }"
                      >
                        {{ member.initials }}
                      </div>
                      <div class="min-w-0 flex-1">
                        <div class="text-xs font-bold text-white truncate" :style="{ color: member.color }">
                          @{{ member.name }}
                        </div>
                        <div class="text-[10px] text-gray-400 font-mono truncate">
                          {{ member.role }}
                        </div>
                      </div>
                    </button>
                  </div>

                  <div v-else class="py-3 text-center text-[10px] text-gray-400 font-mono">
                    All team members already added
                  </div>
                </div>
              </Transition>
            </div>
          </div>

          <div class="flex items-center gap-1.5 ml-auto">
            <button 
              type="button"
              @click="showCc = !showCc"
              class="px-2 py-0.5 border text-[11px] font-bold uppercase transition-colors"
              :class="showCc ? 'bg-red-600 text-white border-red-500' : 'bg-black text-gray-400 border-zinc-700 hover:text-white'"
            >
              Cc
            </button>
            <button 
              type="button"
              @click="showBcc = !showBcc"
              class="px-2 py-0.5 border text-[11px] font-bold uppercase transition-colors"
              :class="showBcc ? 'bg-red-600 text-white border-red-500' : 'bg-black text-gray-400 border-zinc-700 hover:text-white'"
            >
              Bcc
            </button>
          </div>
        </div>

        <!-- CC FIELD -->
        <Transition name="slide-down">
          <div v-if="showCc" class="flex flex-wrap items-center gap-2 pt-1 relative">
            <span class="text-gray-400 w-10 font-bold">Cc:</span>
            
            <div class="flex flex-wrap items-center gap-1.5 flex-1 min-w-[200px]">
              <span
                v-for="(rec, idx) in ccRecipients"
                :key="idx"
                class="bg-black border px-2 py-0.5 rounded text-white flex items-center gap-1.5 text-[11px]"
                :style="{ borderColor: rec.color || '#52525b' }"
              >
                <span v-if="rec.isMention" class="font-bold" :style="{ color: rec.color }">@{{ rec.name }}</span>
                <span v-else class="text-gray-300">{{ rec.email }}</span>
                <button type="button" @click="removeRecipient('cc', idx)" class="text-gray-500 hover:text-red-400 font-bold ml-0.5">×</button>
              </span>

              <!-- Floating @ Add Dropdown for CC -->
              <div class="dropdown-anchor relative inline-block">
                <button
                  type="button"
                  @click.stop="openMentionDropdown('cc')"
                  class="px-2 py-0.5 bg-zinc-800 hover:bg-red-600 text-gray-300 hover:text-white border border-zinc-700 text-[11px] font-bold rounded transition-colors flex items-center gap-1"
                >
                  <span class="text-red-400 font-black">@</span> add
                </button>

                <!-- Scrollable Mention List Popover -->
                <Transition name="pop-in">
                  <div
                    v-if="activeTargetField === 'cc'"
                    @click.stop
                    class="absolute left-0 top-full mt-2 w-64 bg-black border-2 border-white shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] z-50 p-2 text-left"
                  >
                    <div class="text-[10px] font-mono uppercase text-gray-400 font-bold px-2 py-1 border-b border-zinc-800 flex justify-between items-center">
                      <span>Mention in CC</span>
                      <button type="button" @click="activeTargetField = null" class="text-gray-500 hover:text-white">✕</button>
                    </div>

                    <div v-if="availableStaff.length > 0" class="max-h-44 overflow-y-auto space-y-1 py-1 pr-1 custom-user-scroll">
                      <button
                        v-for="member in availableStaff"
                        :key="member.id"
                        type="button"
                        @click="addMentionRecipient('cc', member)"
                        class="w-full flex items-center gap-2 p-1.5 hover:bg-zinc-900 transition-colors text-left rounded"
                      >
                        <div
                          class="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0 border border-white"
                          :style="{ backgroundColor: member.color }"
                        >
                          {{ member.initials }}
                        </div>
                        <div class="min-w-0 flex-1">
                          <div class="text-xs font-bold text-white truncate" :style="{ color: member.color }">
                            @{{ member.name }}
                          </div>
                          <div class="text-[10px] text-gray-400 font-mono truncate">
                            {{ member.role }}
                          </div>
                        </div>
                      </button>
                    </div>

                    <div v-else class="py-3 text-center text-[10px] text-gray-400 font-mono">
                      All team members already added
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </Transition>

        <!-- BCC FIELD -->
        <Transition name="slide-down">
          <div v-if="showBcc" class="flex flex-wrap items-center gap-2 pt-1 relative">
            <span class="text-gray-400 w-10 font-bold">Bcc:</span>
            
            <div class="flex flex-wrap items-center gap-1.5 flex-1 min-w-[200px]">
              <span
                v-for="(rec, idx) in bccRecipients"
                :key="idx"
                class="bg-black border px-2 py-0.5 rounded text-white flex items-center gap-1.5 text-[11px]"
                :style="{ borderColor: rec.color || '#52525b' }"
              >
                <span v-if="rec.isMention" class="font-bold" :style="{ color: rec.color }">@{{ rec.name }}</span>
                <span v-else class="text-gray-300">{{ rec.email }}</span>
                <button type="button" @click="removeRecipient('bcc', idx)" class="text-gray-500 hover:text-red-400 font-bold ml-0.5">×</button>
              </span>

              <!-- Floating @ Add Dropdown for BCC -->
              <div class="dropdown-anchor relative inline-block">
                <button
                  type="button"
                  @click.stop="openMentionDropdown('bcc')"
                  class="px-2 py-0.5 bg-zinc-800 hover:bg-red-600 text-gray-300 hover:text-white border border-zinc-700 text-[11px] font-bold rounded transition-colors flex items-center gap-1"
                >
                  <span class="text-red-400 font-black">@</span> add
                </button>

                <!-- Scrollable Mention List Popover -->
                <Transition name="pop-in">
                  <div
                    v-if="activeTargetField === 'bcc'"
                    @click.stop
                    class="absolute left-0 top-full mt-2 w-64 bg-black border-2 border-white shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] z-50 p-2 text-left"
                  >
                    <div class="text-[10px] font-mono uppercase text-gray-400 font-bold px-2 py-1 border-b border-zinc-800 flex justify-between items-center">
                      <span>Mention in BCC</span>
                      <button type="button" @click="activeTargetField = null" class="text-gray-500 hover:text-white">✕</button>
                    </div>

                    <div v-if="availableStaff.length > 0" class="max-h-44 overflow-y-auto space-y-1 py-1 pr-1 custom-user-scroll">
                      <button
                        v-for="member in availableStaff"
                        :key="member.id"
                        type="button"
                        @click="addMentionRecipient('bcc', member)"
                        class="w-full flex items-center gap-2 p-1.5 hover:bg-zinc-900 transition-colors text-left rounded"
                      >
                        <div
                          class="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0 border border-white"
                          :style="{ backgroundColor: member.color }"
                        >
                          {{ member.initials }}
                        </div>
                        <div class="min-w-0 flex-1">
                          <div class="text-xs font-bold text-white truncate" :style="{ color: member.color }">
                            @{{ member.name }}
                          </div>
                          <div class="text-[10px] text-gray-400 font-mono truncate">
                            {{ member.role }}
                          </div>
                        </div>
                      </button>
                    </div>

                    <div v-else class="py-3 text-center text-[10px] text-gray-400 font-mono">
                      All team members already added
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </Transition>

        <!-- SUBJECT FIELD (EDITABLE INPUT) -->
        <div class="flex items-center gap-2 pt-1">
          <span class="text-gray-400 w-10 font-bold shrink-0">Subj:</span>
          <input
            v-model="emailSubject"
            type="text"
            placeholder="Type subject line..."
            class="flex-1 bg-black/50 border border-zinc-800 focus:border-red-500 text-white font-bold text-xs font-mono px-2 py-1 focus:outline-none transition-colors"
          />
        </div>

      </div>

      <!-- RICH TEXT CONTENTEDITABLE CANVAS (EMAIL BODY) -->
      <div
        ref="editorRef"
        contenteditable="true"
        @input="onEditorInput"
        @keyup="checkActiveFormats"
        @mouseup="checkActiveFormats"
        @pointerup="checkActiveFormats"
        @focus="checkActiveFormats"
        class="w-full bg-black border border-zinc-800 p-4 text-xs sm:text-sm font-sans text-gray-200 focus:outline-none focus:border-red-500 transition-colors min-h-[140px] max-h-[220px] overflow-y-auto leading-relaxed"
      ></div>

      <!-- BOTTOM TOOLBAR DOCK -->
      <div class="flex flex-wrap items-center justify-between gap-3 pt-1">
        
        <!-- Left Side: Formatting Tools with Reliable Toggle -->
        <div class="flex items-center gap-1 bg-black border border-zinc-800 p-1">
          <!-- Bold -->
          <button
            type="button"
            @mousedown.prevent="execCmd('bold')"
            title="Bold"
            class="w-7 h-7 flex items-center justify-center font-bold border transition-colors text-xs select-none"
            :class="isBold 
              ? 'bg-red-600 text-white border-white shadow-[1px_1px_0px_0px_#ffffff]' 
              : 'bg-zinc-900 text-gray-200 border-zinc-800 hover:bg-zinc-800 hover:text-white'"
          >
            B
          </button>

          <!-- Italic -->
          <button
            type="button"
            @mousedown.prevent="execCmd('italic')"
            title="Italic"
            class="w-7 h-7 flex items-center justify-center italic font-serif border transition-colors text-xs select-none"
            :class="isItalic 
              ? 'bg-red-600 text-white border-white shadow-[1px_1px_0px_0px_#ffffff]' 
              : 'bg-zinc-900 text-gray-200 border-zinc-800 hover:bg-zinc-800 hover:text-white'"
          >
            I
          </button>

          <!-- Underline -->
          <button
            type="button"
            @mousedown.prevent="execCmd('underline')"
            title="Underline"
            class="w-7 h-7 flex items-center justify-center underline border transition-colors text-xs select-none"
            :class="isUnderline 
              ? 'bg-red-600 text-white border-white shadow-[1px_1px_0px_0px_#ffffff]' 
              : 'bg-zinc-900 text-gray-200 border-zinc-800 hover:bg-zinc-800 hover:text-white'"
          >
            U
          </button>

          <!-- Strikethrough -->
          <button
            type="button"
            @mousedown.prevent="execCmd('strikeThrough')"
            title="Strikethrough"
            class="w-7 h-7 flex items-center justify-center line-through border transition-colors text-xs select-none"
            :class="isStrike 
              ? 'bg-red-600 text-white border-white shadow-[1px_1px_0px_0px_#ffffff]' 
              : 'bg-zinc-900 text-gray-200 border-zinc-800 hover:bg-zinc-800 hover:text-white'"
          >
            S
          </button>

          <div class="w-px h-5 bg-zinc-700 mx-1"></div>

          <!-- Color Palette Swatches -->
          <div class="flex items-center gap-1.5 px-1">
            <button
              v-for="c in colorOptions"
              :key="c.name"
              type="button"
              @mousedown.prevent="setColor(c.color)"
              :title="c.name"
              class="w-4 h-4 rounded-full border hover:scale-125 transition-transform"
              :class="selectedColor === c.color ? 'ring-2 ring-white scale-110' : 'border-white/70'"
              :style="{ backgroundColor: c.color }"
            ></button>
          </div>

          <div class="w-px h-5 bg-zinc-700 mx-1"></div>

          <!-- Bullet List -->
          <button
            type="button"
            @mousedown.prevent="execCmd('insertUnorderedList')"
            title="Bullet List"
            class="px-2 h-7 flex items-center justify-center border text-xs transition-colors select-none"
            :class="isList 
              ? 'bg-red-600 text-white border-white shadow-[1px_1px_0px_0px_#ffffff]' 
              : 'bg-zinc-900 text-gray-200 border-zinc-800 hover:bg-zinc-800 hover:text-white'"
          >
            • List
          </button>
        </div>

        <!-- Right Side: Reset Icon + Send Icon -->
        <div class="flex items-center gap-2.5 ml-auto">
          <!-- Reset / Reload Arrow Icon Button -->
          <button
            type="button"
            @click="resetEditor"
            title="Reset to default"
            class="h-9 w-9 bg-black border border-zinc-700 hover:border-white hover:text-white text-gray-400 flex items-center justify-center transition-colors shadow-sm active:translate-x-0.5 active:translate-y-0.5"
          >
            <svg class="w-4 h-4 hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>

          <!-- Modern Send Icon Button (Paper Plane) -->
          <button
            type="button"
            @click="sendEmail"
            title="Send Email"
            class="h-9 px-4 bg-red-600 hover:bg-white text-white hover:text-red-600 border border-white flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 transition-colors group"
          >
            <svg class="w-4 h-4 transform -rotate-45 -translate-y-0.5 group-hover:translate-x-0.5 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Recipient {
  name: string
  email: string
  isMention: boolean
  color?: string
}

interface Staff {
  id: string
  name: string
  initials: string
  email: string
  role: string
  color: string
}

const showCc = ref(true)
const showBcc = ref(false)
const activeTargetField = ref<'to' | 'cc' | 'bcc' | null>(null)
const isSuccessSent = ref(false)
const editorRef = ref<HTMLDivElement | null>(null)

const emailSubject = ref('Re: Ticket #8092 - Payment Webhook Timeout')

// Format active states
const isBold = ref(false)
const isItalic = ref(false)
const isUnderline = ref(false)
const isStrike = ref(false)
const isList = ref(false)
const selectedColor = ref('#ffffff')

const colorOptions = [
  { name: 'White', color: '#ffffff' },
  { name: 'Red', color: '#ef4444' },
  { name: 'Cyan', color: '#06b6d4' },
  { name: 'Yellow', color: '#eab308' },
  { name: 'Green', color: '#10b981' }
]

const staffList: Staff[] = [
  { id: 's1', name: 'Morgana', initials: 'MO', email: 'morgana@team.com', role: 'Support Agent', color: '#0284c7' },
  { id: 's2', name: 'Ryuji', initials: 'RJ', email: 'ryuji@team.com', role: 'Tech Lead', color: '#eab308' },
  { id: 's3', name: 'Ann', initials: 'AN', email: 'ann@team.com', role: 'Customer Success', color: '#ec4899' },
  { id: 's4', name: 'Rizqy', initials: 'RY', email: 'rizqy@team.com', role: 'Fullstack Dev', color: '#dc2626' },
  { id: 's5', name: 'Yusuke', initials: 'YU', email: 'yusuke@team.com', role: 'Supervisor', color: '#8b5cf6' },
  { id: 's6', name: 'Futaba', initials: 'FU', email: 'futaba@team.com', role: 'Navigator', color: '#10b981' },
  { id: 's7', name: 'Makoto', initials: 'MA', email: 'makoto@team.com', role: 'Team Strategist', color: '#6366f1' }
]

const toRecipients = ref<Recipient[]>([
  { name: 'Customer', email: 'customer@enterprise.com', isMention: false }
])

const ccRecipients = ref<Recipient[]>([
  { name: 'Ryuji', email: 'ryuji@team.com', isMention: true, color: '#eab308' },
  { name: 'Ann', email: 'ann@team.com', isMention: true, color: '#ec4899' }
])

const bccRecipients = ref<Recipient[]>([
  { name: 'Morgana', email: 'morgana@team.com', isMention: true, color: '#0284c7' }
])

// Prevent Duplicate Mentions
const currentMentionNames = computed(() => {
  const set = new Set<string>()
  toRecipients.value.forEach(r => set.add(r.name.toLowerCase()))
  ccRecipients.value.forEach(r => set.add(r.name.toLowerCase()))
  bccRecipients.value.forEach(r => set.add(r.name.toLowerCase()))
  return set
})

const availableStaff = computed(() => {
  return staffList.filter(m => !currentMentionNames.value.has(m.name.toLowerCase()))
})

const defaultHtml = `Hi Team,<br><br>The <b>webhook latency issue</b> has been identified and <span style="color: #10b981; font-weight: bold;">successfully patched</span> on production.<br><br>Please verify related payment transactions with the customer.<br><br><i>Best regards,<br>Ahmad Rizqy</i>`

const initEditorContent = () => {
  if (editorRef.value) {
    editorRef.value.innerHTML = defaultHtml
  }
}

const checkActiveFormats = () => {
  if (typeof document === 'undefined') return
  try {
    isBold.value = document.queryCommandState('bold')
    isItalic.value = document.queryCommandState('italic')
    isUnderline.value = document.queryCommandState('underline')
    isStrike.value = document.queryCommandState('strikeThrough')
    isList.value = document.queryCommandState('insertUnorderedList')
  } catch {
    // Ignore if selection is outside
  }
}

const execCmd = (command: string, value: string = '') => {
  if (!editorRef.value) return
  editorRef.value.focus()
  document.execCommand(command, false, value)
  setTimeout(() => {
    checkActiveFormats()
  }, 10)
}

const setColor = (color: string) => {
  selectedColor.value = color
  execCmd('foreColor', color)
}

const onEditorInput = () => {
  checkActiveFormats()
}

// Click outside & Escape handler to close popovers
const handleDocumentClick = (e: MouseEvent) => {
  if (!activeTargetField.value) return
  const target = e.target as HTMLElement
  if (!target.closest('.dropdown-anchor')) {
    activeTargetField.value = null
  }
}

const handleDocumentKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && activeTargetField.value) {
    activeTargetField.value = null
  }
}

onMounted(() => {
  initEditorContent()
  if (typeof document !== 'undefined') {
    document.addEventListener('selectionchange', checkActiveFormats)
    window.addEventListener('click', handleDocumentClick)
    window.addEventListener('keydown', handleDocumentKeyDown)
  }
})

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.removeEventListener('selectionchange', checkActiveFormats)
    window.removeEventListener('click', handleDocumentClick)
    window.removeEventListener('keydown', handleDocumentKeyDown)
  }
})

const openMentionDropdown = (field: 'to' | 'cc' | 'bcc') => {
  if (activeTargetField.value === field) {
    activeTargetField.value = null
  } else {
    activeTargetField.value = field
  }
}

const addMentionRecipient = (field: 'to' | 'cc' | 'bcc', member: Staff) => {
  // Prevent duplicate if already added
  if (currentMentionNames.value.has(member.name.toLowerCase())) {
    activeTargetField.value = null
    return
  }

  const newRec: Recipient = {
    name: member.name,
    email: member.email,
    isMention: true,
    color: member.color
  }

  if (field === 'to') {
    toRecipients.value.push(newRec)
  } else if (field === 'cc') {
    ccRecipients.value.push(newRec)
  } else if (field === 'bcc') {
    bccRecipients.value.push(newRec)
  }

  activeTargetField.value = null
}

const removeRecipient = (field: 'to' | 'cc' | 'bcc', index: number) => {
  if (field === 'to') toRecipients.value.splice(index, 1)
  else if (field === 'cc') ccRecipients.value.splice(index, 1)
  else if (field === 'bcc') bccRecipients.value.splice(index, 1)
}

let sendTimeout: ReturnType<typeof setTimeout> | null = null
const sendEmail = () => {
  isSuccessSent.value = true
  if (sendTimeout) clearTimeout(sendTimeout)
  sendTimeout = setTimeout(() => {
    isSuccessSent.value = false
  }, 2400)
}

const resetEditor = () => {
  emailSubject.value = 'Re: Ticket #8092 - Payment Webhook Timeout'
  toRecipients.value = [{ name: 'Customer', email: 'customer@enterprise.com', isMention: false }]
  ccRecipients.value = [
    { name: 'Ryuji', email: 'ryuji@team.com', isMention: true, color: '#eab308' },
    { name: 'Ann', email: 'ann@team.com', isMention: true, color: '#ec4899' }
  ]
  bccRecipients.value = [{ name: 'Morgana', email: 'morgana@team.com', isMention: true, color: '#0284c7' }]
  activeTargetField.value = null
  isSuccessSent.value = false
  selectedColor.value = '#ffffff'
  initEditorContent()
  checkActiveFormats()
}
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.2s ease-out;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.pop-in-enter-active {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.pop-in-leave-active {
  transition: all 0.15s ease-in;
}
.pop-in-enter-from,
.pop-in-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-4px);
}

/* Full card success animation */
.success-sweep-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.success-sweep-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0, 1, 0.45);
}
.success-sweep-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(20px);
}
.success-sweep-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

@keyframes popBounce {
  0% { transform: scale(0.8) skewX(-6deg); opacity: 0; }
  70% { transform: scale(1.05) skewX(-6deg); opacity: 1; }
  100% { transform: scale(1) skewX(-6deg); opacity: 1; }
}

.animate-pop-bounce {
  animation: popBounce 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Custom Scrollbar for Popover */
.custom-user-scroll::-webkit-scrollbar {
  width: 4px;
}
.custom-user-scroll::-webkit-scrollbar-track {
  background: #18181b;
}
.custom-user-scroll::-webkit-scrollbar-thumb {
  background: #dc2626;
}

:deep(ul) {
  list-style-type: disc;
  padding-left: 1.25rem;
}
</style>
