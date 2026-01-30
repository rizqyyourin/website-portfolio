<template>
  <div class="min-h-screen relative overflow-hidden bg-zinc-900 text-white font-sans selection:bg-red-600 selection:text-white">
    <!-- P5 Global Background Elements -->
    <div class="fixed inset-0 z-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>
    <div class="fixed inset-0 z-0 pointer-events-none bg-gradient-to-br from-red-600/5 to-transparent mix-blend-color-dodge"></div>
    
    <div class="relative z-10 flex flex-col min-h-screen pt-[88px] md:pt-[104px]">
      <Header />
      <main class="flex-grow">
        <slot />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/layout/Header.vue'
import Footer from '~/components/layout/Footer.vue'
</script>
