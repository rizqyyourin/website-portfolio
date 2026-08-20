<template>
  <div class="relative max-w-3xl mx-auto bg-zinc-950 border-2 border-white/80 p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] max-md:shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] transform md:-skew-x-2 overflow-visible">
    
    <!-- Header -->
    <div class="mb-6 space-y-2 text-center md:text-left">
      <div class="inline-block bg-red-600 text-white text-[11px] font-black italic tracking-widest px-2.5 py-0.5 uppercase transform -skew-x-6">
        Thread Engine
      </div>
      <h3 class="text-2xl sm:text-3xl font-black italic uppercase tracking-tight text-white">
        Collaborative Thread & Discussions
      </h3>
    </div>

    <!-- Main Thread Container -->
    <div class="bg-zinc-900 border border-zinc-700 p-4 sm:p-6 space-y-4 shadow-inner">
      
      <!-- Thread Root Post -->
      <div class="pb-4 border-b border-zinc-800 space-y-2.5">
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-full bg-red-600 border border-white flex items-center justify-center font-black text-xs text-white">
              RY
            </div>
            <div>
              <div class="text-xs font-bold text-white flex items-center gap-2">
                <span>Rizqy (Lead)</span>
                <span class="text-[10px] text-zinc-500 font-mono">10m ago</span>
              </div>
              <div class="text-[10px] text-zinc-400 font-mono">
                Fullstack Lead
              </div>
            </div>
          </div>

          <span class="bg-black border border-zinc-700 px-2 py-0.5 text-[10px] font-mono text-emerald-400 font-bold uppercase">
            #TK-8092 // OPEN
          </span>
        </div>

        <p class="text-xs sm:text-sm font-mono text-gray-200 leading-relaxed">
          Identified latency spike in Redis cluster during high concurrency payment webhook callbacks. Patch deployed on staging.
        </p>

        <!-- Attached Files List -->
        <div class="flex flex-wrap items-center gap-2 pt-1">
          <div 
            v-for="(file, idx) in attachedFiles" 
            :key="idx"
            class="bg-black border border-zinc-800 px-2.5 py-1 rounded text-[11px] font-mono text-gray-300 flex items-center gap-1.5 group hover:border-red-500 transition-colors"
          >
            <span class="text-red-400">📎</span>
            <span>{{ file.name }}</span>
            <span class="text-[10px] text-zinc-500">({{ file.size }})</span>
            <button 
              type="button"
              @click="removeFile(idx)"
              class="text-zinc-500 hover:text-red-400 font-bold ml-1"
              title="Remove file"
            >
              ×
            </button>
          </div>

          <!-- Attach File Button -->
          <button 
            type="button"
            @click="addSampleFile"
            class="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-gray-300 text-[11px] font-mono font-bold border border-zinc-700 rounded transition-colors flex items-center gap-1"
          >
            <span>+</span> Attach File
          </button>
        </div>
      </div>

      <!-- Thread Comments Feed (Scrollable Container) -->
      <div 
        ref="commentsContainerRef"
        class="space-y-3 max-h-[220px] overflow-y-auto pr-1 custom-thread-scroll scroll-smooth"
      >
        <TransitionGroup name="comment-pop">
          <div 
            v-for="comment in comments" 
            :key="comment.id"
            class="p-3 bg-black/60 border border-zinc-800 rounded space-y-1.5 transition-all"
            :class="{ 'ml-6 border-l-2 border-l-red-600 bg-black/80': comment.isReply }"
          >
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <div 
                  class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0 border border-white"
                  :style="{ backgroundColor: comment.color }"
                >
                  {{ comment.initials }}
                </div>
                <span class="text-xs font-bold" :style="{ color: comment.color }">
                  @{{ comment.author }}
                </span>
                <span v-if="comment.replyTo" class="text-[10px] font-mono text-zinc-500">
                  replying to <span class="text-gray-300 font-bold">@{{ comment.replyTo }}</span>
                </span>
                <span class="text-[10px] text-zinc-600 font-mono">{{ comment.time }}</span>
              </div>

              <!-- Comment Actions (Reply & Delete) -->
              <div class="flex items-center gap-2">
                <button 
                  type="button"
                  @click="startReply(comment)"
                  class="text-[11px] font-mono text-zinc-400 hover:text-white transition-colors"
                >
                  Reply
                </button>
                <button 
                  type="button"
                  @click="deleteComment(comment.id)"
                  class="text-zinc-600 hover:text-red-500 transition-colors p-0.5"
                  title="Delete Comment"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Comment Text -->
            <p class="text-xs font-mono text-gray-300 pl-8">
              {{ comment.text }}
            </p>
          </div>
        </TransitionGroup>
      </div>

      <!-- Reply Indicator (When replying to a specific comment) -->
      <div v-if="replyingToTarget" class="flex items-center justify-between px-3 py-1.5 bg-black border-l-2 border-red-600 text-xs font-mono">
        <div class="flex items-center gap-1.5">
          <span class="text-zinc-500">Replying to:</span>
          <span class="text-red-400 font-bold">@{{ replyingToTarget.author }}</span>
        </div>
        <button 
          type="button" 
          @click="replyingToTarget = null" 
          class="text-zinc-500 hover:text-white text-xs font-bold"
        >
          Cancel ×
        </button>
      </div>

      <!-- New Comment / Reply Input Dock -->
      <div class="flex items-center gap-2 pt-1">
        <input 
          ref="inputRef"
          v-model="newCommentText"
          @keydown.enter="postComment"
          type="text"
          :placeholder="replyingToTarget ? `Reply to @${replyingToTarget.author}...` : 'Write a comment in thread... (Press Enter)'"
          class="flex-1 bg-black border border-zinc-800 focus:border-red-500 text-white font-mono text-xs p-2.5 focus:outline-none transition-colors"
        />

        <!-- Post Button (Paper Plane Icon) -->
        <button
          type="button"
          @click="postComment"
          :disabled="!newCommentText.trim()"
          class="h-9 px-4 bg-red-600 hover:bg-white text-white hover:text-red-600 disabled:opacity-40 disabled:pointer-events-none border border-white flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 transition-colors group"
        >
          <svg class="w-4 h-4 transform -rotate-45 -translate-y-0.5 group-hover:translate-x-0.5 transition-transform" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

interface FileAttachment {
  name: string
  size: string
}

interface CommentItem {
  id: string
  author: string
  initials: string
  color: string
  text: string
  time: string
  isReply: boolean
  replyTo?: string
}

const commentsContainerRef = ref<HTMLDivElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)

const attachedFiles = ref<FileAttachment[]>([
  { name: 'webhook-benchmark.log', size: '38 KB' }
])

const sampleFilePool = [
  { name: 'redis-memory-profile.json', size: '124 KB' },
  { name: 'api-latency-trace.png', size: '210 KB' },
  { name: 'staging-k6-results.csv', size: '15 KB' }
]

const comments = ref<CommentItem[]>([
  {
    id: 'c1',
    author: 'Ryuji',
    initials: 'RJ',
    color: '#eab308',
    text: 'Load test verified on staging environment. 5,000 req/sec latency dropped under 15ms.',
    time: '6m ago',
    isReply: false
  },
  {
    id: 'c2',
    author: 'Ann',
    initials: 'AN',
    color: '#ec4899',
    text: 'Customer Success confirmed payment gateway webhooks are syncing seamlessly with zero drop!',
    time: '2m ago',
    isReply: true,
    replyTo: 'Ryuji'
  }
])

const newCommentText = ref('')
const replyingToTarget = ref<CommentItem | null>(null)

const addSampleFile = () => {
  const next = sampleFilePool[attachedFiles.value.length % sampleFilePool.length]
  if (next) {
    attachedFiles.value.push({ ...next, name: `${Date.now().toString().slice(-4)}_${next.name}` })
  }
}

const removeFile = (index: number) => {
  attachedFiles.value.splice(index, 1)
}

const startReply = async (comment: CommentItem) => {
  replyingToTarget.value = comment
  await nextTick()
  inputRef.value?.focus()
}

const postComment = async () => {
  const text = newCommentText.value.trim()
  if (!text) return

  const isReply = !!replyingToTarget.value
  const replyTo = replyingToTarget.value?.author

  comments.value.push({
    id: `c_${Date.now()}`,
    author: 'Rizqy (You)',
    initials: 'RY',
    color: '#dc2626',
    text,
    time: 'Just now',
    isReply,
    replyTo
  })

  newCommentText.value = ''
  replyingToTarget.value = null

  // Auto-scroll to bottom of the comments feed
  await nextTick()
  if (commentsContainerRef.value) {
    commentsContainerRef.value.scrollTo({
      top: commentsContainerRef.value.scrollHeight,
      behavior: 'smooth'
    })
  }
}

const deleteComment = (id: string) => {
  comments.value = comments.value.filter(c => c.id !== id)
  if (replyingToTarget.value?.id === id) {
    replyingToTarget.value = null
  }
}
</script>

<style scoped>
.comment-pop-enter-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.comment-pop-leave-active {
  transition: all 0.2s cubic-bezier(0.55, 0, 1, 0.45);
}
.comment-pop-enter-from {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}
.comment-pop-leave-to {
  opacity: 0;
  transform: translateX(-20px) scale(0.95);
}

.custom-thread-scroll::-webkit-scrollbar {
  width: 4px;
}
.custom-thread-scroll::-webkit-scrollbar-track {
  background: #18181b;
}
.custom-thread-scroll::-webkit-scrollbar-thumb {
  background: #dc2626;
}
</style>
