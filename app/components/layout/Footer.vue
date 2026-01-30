<template>
  <footer class="bg-dark-900 text-white py-16">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <!-- Brand -->
        <div>
          <h2 class="font-bold text-2xl text-primary-500 mb-4">Yourin</h2>
          <p class="text-gray-400">Building robust, scalable web applications with clean architecture and best practices.</p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="font-bold text-lg mb-4">Navigation</h3>
          <ul class="space-y-2 text-gray-400">
            <li v-for="item in navigation" :key="item.name">
              <a :href="item.href" class="hover:text-primary-500 transition-colors">{{ item.name }}</a>
            </li>
          </ul>
        </div>

        <!-- Social Links -->
        <div>
          <h3 class="font-bold text-lg mb-4">Social</h3>
          <ul class="space-y-2 text-gray-400">
            <li><a :href="personalInfo.socials.github" class="hover:text-primary-500 transition-colors">GitHub</a></li>
            <li><a :href="personalInfo.socials.linkedin" class="hover:text-primary-500 transition-colors">LinkedIn</a></li>
            <li><a :href="personalInfo.socials.whatsapp" class="hover:text-primary-500 transition-colors">Whatsapp</a></li>
            <li><a :href="`mailto:${personalInfo.email}`" class="hover:text-primary-500 transition-colors">Email</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="font-bold text-lg mb-4">Get in Touch</h3>
          <p class="text-gray-400 mb-4">Have a project in mind? Let's talk!</p>
          <a :href="`mailto:${personalInfo.email}`" class="inline-block w-full bg-red-600 text-white font-black italic uppercase tracking-wide py-3 px-6 transform -skew-x-12 border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:bg-white hover:text-red-600 hover:shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] transition-all duration-300 text-center">
            <span class="inline-block transform skew-x-12">Send Email</span>
          </a>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-dark-700 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-400 text-sm">© {{ new Date().getFullYear() }} Yourin Portfolio</p>
        <div class="flex gap-6 mt-4 md:mt-0 text-gray-400">
          <a href="#" class="hover:text-primary-500 transition-colors">Privacy</a>
          <a href="#" class="hover:text-primary-500 transition-colors">Terms</a>
          <a href="#" class="hover:text-primary-500 transition-colors">Sitemap</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { personalInfo, navigation } from '~/data/content'
</script>
