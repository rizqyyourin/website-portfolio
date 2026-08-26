import { ref, computed } from 'vue'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

const SESSION_MESSAGE_CAP = 20

// Shared state across components (singleton pattern)
const messages = ref<ChatMessage[]>([])
const isOpen = ref(false)
const isLoading = ref(false)
const error = ref<string | null>(null)
const messageCount = ref(0)

// Add initial greeting on first use
let initialized = false

function ensureGreeting() {
  if (!initialized && messages.value.length === 0) {
    messages.value.push({
      id: 'greeting',
      role: 'assistant',
      content: "Yo! Welcome to the Metaverse! ⚡ I'm Yourin's Portfolio Assistant. Ask me anything about his skills, projects, or experience!",
      timestamp: Date.now()
    })
    initialized = true
  }
}

export const useChatbot = () => {
  // Ensure greeting exists
  ensureGreeting()

  const isSessionCapped = computed(() => messageCount.value >= SESSION_MESSAGE_CAP)

  const toggleChat = () => {
    isOpen.value = !isOpen.value
    error.value = null
  }

  const sendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isLoading.value || isSessionCapped.value) return

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: Date.now()
    }
    messages.value.push(userMsg)
    messageCount.value++
    error.value = null
    isLoading.value = true

    try {
      // Build history (exclude greeting, max 6 recent messages)
      const history = messages.value
        .filter(m => m.id !== 'greeting')
        .slice(-7, -1) // last 6 messages before current
        .map(m => ({ role: m.role, content: m.content }))

      const response = await $fetch<{ reply: string }>('/api/chat', {
        method: 'POST',
        body: {
          message: trimmed,
          history
        }
      })

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.reply,
        timestamp: Date.now()
      }
      messages.value.push(assistantMsg)
      messageCount.value++
    } catch (err: unknown) {
      const fetchError = err as { statusCode?: number; statusMessage?: string; data?: { statusMessage?: string } }
      if (fetchError.statusCode === 429) {
        error.value = 'Too many messages! Please wait a moment. ⏳'
      } else if (fetchError.statusCode === 504) {
        error.value = 'The AI is thinking too hard... Please try again. 🤔'
      } else {
        error.value = 'Something went wrong. Please try again. 😥'
      }
    } finally {
      isLoading.value = false
    }
  }

  const clearChat = () => {
    messages.value = []
    messageCount.value = 0
    error.value = null
    initialized = false
    ensureGreeting()
  }

  return {
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
  }
}
