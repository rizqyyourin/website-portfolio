import { ref, onMounted, onUnmounted } from 'vue'

export interface ActiveVisitor {
  id: string
  codename: string
}

export const usePresence = () => {
  const activeCount = ref<number>(1)
  const activeSessions = ref<ActiveVisitor[]>([])
  const isConnected = ref<boolean>(false)
  const myCodename = ref<string>('Phantom Navigator')
  const sessionId = ref<string>('')

  let timer: NodeJS.Timeout | null = null

  const getOrCreateSessionId = (): string => {
    if (typeof window === 'undefined') return ''
    let id = sessionStorage.getItem('p5-presence-session-id')
    if (!id) {
      id = `p5-${Math.random().toString(36).substring(2, 10)}-${Date.now().toString(36)}`
      sessionStorage.setItem('p5-presence-session-id', id)
    }
    return id
  }

  const sendHeartbeat = async (action: 'ping' | 'leave' = 'ping') => {
    if (!sessionId.value) return

    try {
      const response = await $fetch<{
        success: boolean
        activeCount: number
        activeSessions: ActiveVisitor[]
      }>('/api/presence/heartbeat', {
        method: 'POST',
        body: {
          sessionId: sessionId.value,
          action
        }
      })

      if (response && response.success) {
        activeCount.value = response.activeCount
        activeSessions.value = response.activeSessions || []
        isConnected.value = true

        const me = response.activeSessions.find(s => s.id === sessionId.value)
        if (me) {
          myCodename.value = me.codename
        }
      }
    } catch {
      isConnected.value = false
    }
  }

  const handleVisibilityChange = () => {
    if (document.hidden) {
      if (timer) clearInterval(timer)
      timer = null
    } else {
      sendHeartbeat('ping')
      startHeartbeatTimer()
    }
  }

  const handleUnload = () => {
    if (!sessionId.value) return
    const payload = JSON.stringify({ sessionId: sessionId.value, action: 'leave' })
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'application/json' })
      navigator.sendBeacon('/api/presence/heartbeat', blob)
    }
  }

  const startHeartbeatTimer = () => {
    if (timer) clearInterval(timer)
    timer = setInterval(() => {
      sendHeartbeat('ping')
    }, 10000) // Heartbeat every 10s
  }

  onMounted(() => {
    sessionId.value = getOrCreateSessionId()
    sendHeartbeat('ping')
    startHeartbeatTimer()

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', handleUnload)
    window.addEventListener('pagehide', handleUnload)
  })

  onUnmounted(() => {
    if (timer) clearInterval(timer)
    document.removeEventListener('visibilitychange', handleVisibilityChange)
    window.removeEventListener('beforeunload', handleUnload)
    window.removeEventListener('pagehide', handleUnload)
  })

  return {
    activeCount,
    activeSessions,
    isConnected,
    myCodename,
    sessionId,
    refreshPresence: () => sendHeartbeat('ping')
  }
}
