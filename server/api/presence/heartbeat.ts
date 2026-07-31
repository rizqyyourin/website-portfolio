import { defineEventHandler, readBody } from 'h3'

interface VisitorSession {
  id: string
  codename: string
  lastSeen: number
}

// In-memory session store on the Nitro server instance
const activeSessions = new Map<string, VisitorSession>()
const INACTIVE_TIMEOUT_MS = 25000 // 25 seconds timeout

// List of thematic P5/Cyber codename prefixes and suffixes
const CODENAME_PREFIXES = [
  'Phantom', 'Cyber', 'Joker', 'Mona', 'Skull', 'Panther', 
  'Fox', 'Queen', 'Oracle', 'Noir', 'Crow', 'Violet', 'Navigator', 'Netrunner'
]

function generateCodename(sessionId: string): string {
  let hash = 0
  for (let i = 0; i < sessionId.length; i++) {
    hash = (hash << 5) - hash + sessionId.charCodeAt(i)
    hash |= 0
  }
  const prefix = CODENAME_PREFIXES[Math.abs(hash) % CODENAME_PREFIXES.length]
  const num = Math.abs(hash % 900) + 100
  return `${prefix} #${num}`
}

function cleanupStaleSessions() {
  const now = Date.now()
  for (const [id, session] of activeSessions.entries()) {
    if (now - session.lastSeen > INACTIVE_TIMEOUT_MS) {
      activeSessions.delete(id)
    }
  }
}

export default defineEventHandler(async (event) => {
  cleanupStaleSessions()

  const method = event.node.req.method

  if (method === 'POST') {
    try {
      const body = await readBody(event)
      const { sessionId, action } = body || {}

      if (sessionId && typeof sessionId === 'string') {
        if (action === 'leave') {
          activeSessions.delete(sessionId)
        } else {
          // Refresh or create session
          const session = activeSessions.get(sessionId) || {
            id: sessionId,
            codename: generateCodename(sessionId),
            lastSeen: Date.now()
          }
          session.lastSeen = Date.now()
          activeSessions.set(sessionId, session)
        }
      }
    } catch {
      // Ignore payload parse errors on beacon unload
    }
  }

  cleanupStaleSessions()

  const sessions = Array.from(activeSessions.values()).map(s => ({
    id: s.id,
    codename: s.codename
  }))

  // Ensure at least 1 viewer is reported (the current requestor) if session store was just initialized
  const activeCount = Math.max(sessions.length, 1)

  return {
    success: true,
    activeCount,
    activeSessions: sessions,
    timestamp: Date.now()
  }
})
