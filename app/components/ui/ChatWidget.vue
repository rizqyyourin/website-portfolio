<template>
  <div class="fixed bottom-4 right-4 z-50 select-none">
    <!-- Chat Panel -->
    <Transition name="chat-slide">
      <div
        v-if="isOpen"
        class="absolute bottom-16 right-0 w-[calc(100vw-2rem)] sm:w-[380px] flex flex-col bg-black border-2 border-white shadow-[4px_4px_0px_0px_rgba(220,38,38,1)]"
        :style="{ height: 'min(500px, 70vh)' }"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-3 py-2 bg-red-600 border-b-2 border-white">
          <div class="flex items-center gap-2">
            <!-- Mini Joker Head -->
            <div class="w-7 h-7 flex-shrink-0">
              <svg viewBox="0 0 100 100" class="w-full h-full">
                <path d="M 15,45 Q 5,20 25,15 Q 35,5 50,12 Q 65,5 75,15 Q 95,20 85,45 Q 95,65 80,80 Q 50,95 20,80 Q 5,65 15,45 Z" fill="#000000" stroke="#ffffff" stroke-width="3" />
                <path d="M 18,48 C 18,32 82,32 82,48 C 82,65 68,78 50,78 C 32,78 18,65 18,48 Z" fill="#ffffff" />
                <polygon points="24,48 42,42 38,56 26,58" fill="#000000" />
                <polygon points="76,48 58,42 62,56 74,58" fill="#000000" />
                <circle cx="34" cy="49" r="3.5" fill="#dc2626" />
                <circle cx="66" cy="49" r="3.5" fill="#dc2626" />
                <path d="M 43,67 Q 50,72 57,67" stroke="#000000" stroke-width="3" fill="none" stroke-linecap="round" />
              </svg>
            </div>
            <span class="text-sm font-black italic text-black uppercase tracking-wider">Yourin Chat</span>
          </div>
          <div class="flex items-center gap-1">
            <button
              @click="clearChat"
              class="text-black/70 hover:text-white text-xs font-bold uppercase px-1.5 py-0.5 hover:bg-black/20 transition-colors"
              title="Clear chat"
            >
              Clear
            </button>
            <button
              @click="toggleChat"
              class="text-black hover:text-white font-black text-lg leading-none px-1 hover:bg-black/20 transition-colors"
              title="Close chat"
            >
              ✕
            </button>
          </div>
        </div>

        <!-- Messages Area -->
        <div ref="messagesContainer" class="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin">
          <div
            v-for="msg in messages"
            :key="msg.id"
            class="flex"
            :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
          >
            <!-- Bot Message -->
            <div
              v-if="msg.role === 'assistant'"
              class="max-w-[85%] flex items-start gap-2"
            >
              <div class="w-6 h-6 flex-shrink-0 mt-0.5">
                <svg viewBox="0 0 100 100" class="w-full h-full">
                  <path d="M 15,45 Q 5,20 25,15 Q 35,5 50,12 Q 65,5 75,15 Q 95,20 85,45 Q 95,65 80,80 Q 50,95 20,80 Q 5,65 15,45 Z" fill="#000000" stroke="#ffffff" stroke-width="3" />
                  <path d="M 18,48 C 18,32 82,32 82,48 C 82,65 68,78 50,78 C 32,78 18,65 18,48 Z" fill="#ffffff" />
                  <polygon points="24,48 42,42 38,56 26,58" fill="#000000" />
                  <polygon points="76,48 58,42 62,56 74,58" fill="#000000" />
                  <circle cx="34" cy="49" r="3.5" fill="#dc2626" />
                  <circle cx="66" cy="49" r="3.5" fill="#dc2626" />
                  <path d="M 43,67 Q 50,72 57,67" stroke="#000000" stroke-width="3" fill="none" stroke-linecap="round" />
                </svg>
              </div>
              <div class="bg-zinc-900 border border-zinc-700 px-3 py-2 text-[13px] text-gray-200 leading-relaxed">
                {{ msg.content }}
              </div>
            </div>

            <!-- User Message -->
            <div
              v-else
              class="max-w-[80%]"
            >
              <div class="bg-red-600 px-3 py-2 text-[13px] text-white font-medium leading-relaxed transform -skew-x-6 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]">
                <span class="inline-block transform skew-x-6">{{ msg.content }}</span>
              </div>
            </div>
          </div>

          <!-- Typing Indicator -->
          <div v-if="isLoading" class="flex justify-start">
            <div class="max-w-[85%] flex items-start gap-2">
              <div class="w-6 h-6 flex-shrink-0 mt-0.5">
                <svg viewBox="0 0 100 100" class="w-full h-full animate-pulse">
                  <path d="M 15,45 Q 5,20 25,15 Q 35,5 50,12 Q 65,5 75,15 Q 95,20 85,45 Q 95,65 80,80 Q 50,95 20,80 Q 5,65 15,45 Z" fill="#000000" stroke="#ffffff" stroke-width="3" />
                  <path d="M 18,48 C 18,32 82,32 82,48 C 82,65 68,78 50,78 C 32,78 18,65 18,48 Z" fill="#ffffff" />
                  <polygon points="24,48 42,42 38,56 26,58" fill="#000000" />
                  <polygon points="76,48 58,42 62,56 74,58" fill="#000000" />
                  <circle cx="34" cy="49" r="3.5" fill="#dc2626" class="animate-ping" />
                  <circle cx="66" cy="49" r="3.5" fill="#dc2626" class="animate-ping" />
                  <path d="M 43,67 Q 50,72 57,67" stroke="#000000" stroke-width="3" fill="none" stroke-linecap="round" />
                </svg>
              </div>
              <div class="bg-zinc-900 border border-zinc-700 px-3 py-2">
                <div class="flex items-center gap-1">
                  <span class="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
                  <span class="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
                  <span class="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
                </div>
                <p class="text-[10px] text-zinc-500 mt-1 font-mono">Thinking...</p>
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="text-center">
            <span class="text-[11px] text-red-400 font-mono">{{ error }}</span>
          </div>

          <!-- Session Cap Notice -->
          <div v-if="isSessionCapped" class="text-center py-2">
            <div class="inline-block bg-zinc-900 border border-zinc-600 px-3 py-1.5">
              <p class="text-[11px] text-zinc-400 font-mono">Session limit reached ({{ SESSION_MESSAGE_CAP }} messages).</p>
              <button
                @click="clearChat"
                class="text-[11px] text-red-500 font-bold hover:text-red-400 mt-1 underline"
              >
                Start new session
              </button>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="border-t-2 border-white p-2">
          <div class="flex items-center gap-2">
            <input
              ref="inputField"
              v-model="inputText"
              @keydown.enter.prevent="handleSend"
              :disabled="isLoading || isSessionCapped"
              type="text"
              placeholder="Ask about Yourin..."
              maxlength="500"
              class="flex-1 bg-zinc-900 border border-zinc-600 text-white text-[13px] px-3 py-2 placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors disabled:opacity-50"
            />
            <button
              @click="handleSend"
              :disabled="isLoading || !inputText.trim() || isSessionCapped"
              class="bg-red-600 border border-white text-white font-black italic text-sm px-3 py-2 transform -skew-x-6 hover:bg-red-500 active:bg-red-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span class="inline-block transform skew-x-6">SEND</span>
            </button>
          </div>
          <p class="text-[9px] text-zinc-600 mt-1 font-mono text-center">
            AI responses may be inaccurate · {{ messageCount }}/{{ SESSION_MESSAGE_CAP }} messages
          </p>
        </div>
      </div>
    </Transition>

    <!-- Toggle Button -->
    <button
      @click="toggleChat"
      class="group relative flex items-center gap-2 bg-black border-2 border-white px-3 py-1.5 transform -skew-x-12 shadow-[3px_3px_0px_0px_rgba(220,38,38,1)] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
    >
      <!-- Joker Head -->
      <div class="transform skew-x-12 w-8 h-8 flex-shrink-0">
        <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-[0_0_4px_rgba(0,0,0,0.9)]">
          <path d="M 15,45 Q 5,20 25,15 Q 35,5 50,12 Q 65,5 75,15 Q 95,20 85,45 Q 95,65 80,80 Q 50,95 20,80 Q 5,65 15,45 Z" fill="#000000" stroke="#ffffff" stroke-width="3" />
          <path d="M 18,48 C 18,32 82,32 82,48 C 82,65 68,78 50,78 C 32,78 18,65 18,48 Z" fill="#ffffff" />
          <polygon points="24,48 42,42 38,56 26,58" fill="#000000" />
          <polygon points="76,48 58,42 62,56 74,58" fill="#000000" />
          <circle cx="34" cy="49" r="3.5" fill="#dc2626" class="animate-pulse" />
          <circle cx="66" cy="49" r="3.5" fill="#dc2626" class="animate-pulse" />
          <path d="M 43,67 Q 50,72 57,67" stroke="#000000" stroke-width="3" fill="none" stroke-linecap="round" />
        </svg>
      </div>

      <!-- Chat Label -->
      <div class="transform skew-x-12 flex items-center gap-1.5 font-sans ml-1">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span class="text-[10px] font-black italic text-red-500 uppercase tracking-wider">
          {{ isOpen ? 'CLOSE' : 'CHAT' }}
        </span>
      </div>

      <!-- Notification dot when there's an unread greeting (closed state) -->
      <span
        v-if="!isOpen && messages.length === 1"
        class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white animate-pulse transform skew-x-12"
      ></span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { useChatbot } from '~/composables/useChatbot'

const {
  messages,
  isOpen,
  isLoading,
  error,
  isSessionCapped,
  messageCount,
  toggleChat,
  sendMessage,
  clearChat,
  SESSION_MESSAGE_CAP
} = useChatbot()

const inputText = ref('')
const messagesContainer = ref<HTMLDivElement | null>(null)
const inputField = ref<HTMLInputElement | null>(null)

const handleSend = () => {
  if (!inputText.value.trim()) return
  sendMessage(inputText.value)
  inputText.value = ''
}

// Auto-scroll to bottom on new messages or when loading state changes
const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

watch(() => messages.value.length, scrollToBottom)
watch(isLoading, scrollToBottom)

// Focus input when chat opens
watch(isOpen, (open) => {
  if (open) {
    nextTick(() => inputField.value?.focus())
  }
})
</script>

<style scoped>
/* Chat panel slide-up transition */
.chat-slide-enter-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.chat-slide-leave-active {
  transition: all 0.2s ease-in;
}
.chat-slide-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
.chat-slide-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}

/* Custom scrollbar for messages */
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #3f3f46;
  border-radius: 2px;
}
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #dc2626;
}
</style>
