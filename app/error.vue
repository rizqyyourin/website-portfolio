<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-zinc-950 px-4 overflow-hidden relative">
    <!-- Background blobs -->
    <div class="absolute inset-0 z-0 pointer-events-none opacity-20">
      <div class="absolute -bottom-20 -left-20 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl"></div>
      <div class="absolute top-20 right-20 w-72 h-72 bg-gray-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
    </div>

    <div class="max-w-lg text-center relative z-10">
      <div class="inline-block transform -skew-x-12 mb-8">
        <h1 class="text-8xl md:text-9xl font-black text-white bg-black px-8 py-2 inline-block shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] tracking-tighter">
          {{ error?.statusCode || 500 }}
        </h1>
      </div>

      <div class="bg-white text-black px-4 py-1 inline-block text-xl font-bold uppercase tracking-widest transform -skew-x-12 mb-8">
        <span class="inline-block transform skew-x-12">
          {{ error?.statusCode === 404 ? 'Target Not Found' : 'Something Went Wrong' }}
        </span>
      </div>

      <p class="text-gray-400 font-mono mb-10">
        {{ error?.statusCode === 404
          ? "The page you're looking for has vanished into the Metaverse."
          : 'An unexpected error occurred. Try heading back home.' }}
      </p>

      <button
        @click="handleError"
        class="group relative inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <span class="block bg-red-600 text-white font-black italic text-xl uppercase tracking-wider px-8 py-4 transform -skew-x-12 border-2 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] group-hover:bg-white group-hover:text-red-600 transition-colors duration-300">
          <span class="inline-block transform skew-x-12">Back to Home</span>
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error?: NuxtError }>()

useHead({
  title: `${props.error?.statusCode || 500} - Ahmad Rizqy Yourin`,
  meta: [{ name: 'robots', content: 'noindex' }],
})

function handleError() {
  clearError({ redirect: '/' })
}
</script>
