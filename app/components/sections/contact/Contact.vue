<template>
  <section id="contact" class="py-24 md:py-32 bg-zinc-900 relative overflow-hidden flex items-center justify-center">
    <!-- Starburst Background -->
    <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse pointer-events-none"></div>
    <div class="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#ff000005_2px,#ff000005_4px)] pointer-events-none"></div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
      
      <!-- Calling Card Container -->
      <div data-aos="zoom-in" data-aos-duration="1000" class="relative transform -rotate-2 md:-rotate-1 hover:rotate-0 transition-transform duration-500 ease-out">
         <!-- Card Background -->
         <div class="absolute inset-0 bg-black transform translate-x-4 translate-y-4 border-2 border-red-600"></div>
         <div class="relative bg-white p-8 md:p-16 border-4 border-black overflow-hidden shadow-[10px_10px_0px_0px_rgba(220,38,38,1)]">
            
            <!-- Logo Stamp -->
            <div class="absolute top-4 right-4 md:top-8 md:right-8 opacity-20 transform rotate-12">
               <div class="w-24 h-24 md:w-32 md:h-32 border-8 border-red-600 rounded-full flex items-center justify-center">
                  <span class="text-red-600 font-black text-xs md:text-sm text-center leading-none">PHANTOM<br>THIEVES</span>
               </div>
            </div>

            <div class="relative z-10 text-center space-y-8">
               <!-- Header Text -->
               <div class="space-y-2">
                  <p class="font-black text-xl md:text-2xl text-red-600 italic tracking-widest bg-black inline-block px-2 transform -skew-x-12">
                     TO THE VISITOR OF THIS SITE
                  </p>
                  <h2 class="text-4xl md:text-6xl font-black text-black uppercase tracking-tighter transform -skew-x-6">
                     LET'S STEAL THE SHOW
                  </h2>
                  <p class="font-bold text-gray-600 max-w-2xl mx-auto italic font-mono text-base md:text-lg">
                     "Your distortion is an unfinished project. We will take your ideas and make them reality."
                  </p>
               </div>

               <!-- Contact Grid -->
               <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
                  <!-- Email -->
                  <a :href="`mailto:${personalInfo.email}`" target="_blank" rel="noopener noreferrer" class="group relative block h-20 perspective-1000">
                     <div class="absolute inset-0 bg-black transform translate-x-2 translate-y-2 transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
                     <div class="absolute inset-0 bg-red-600 border-2 border-black flex items-center justify-center transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1">
                        <span class="text-white font-black text-xl italic uppercase tracking-wider group-hover:scale-110 transition-transform">SEND EMAIL</span>
                     </div>
                  </a>

                  <!-- WhatsApp -->
                  <a :href="personalInfo.socials.whatsapp" target="_blank" rel="noopener noreferrer" class="group relative block h-20 perspective-1000">
                     <div class="absolute inset-0 bg-black transform translate-x-2 translate-y-2 transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
                     <div class="absolute inset-0 bg-green-500 border-2 border-black flex items-center justify-center transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1">
                        <span class="text-black font-black text-xl italic uppercase tracking-wider group-hover:scale-110 transition-transform">WHATSAPP</span>
                     </div>
                  </a>

                  <!-- LinkedIn -->
                  <a :href="personalInfo.socials.linkedin" target="_blank" rel="noopener noreferrer" class="group relative block h-20 perspective-1000">
                     <div class="absolute inset-0 bg-black transform translate-x-2 translate-y-2 transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
                     <div class="absolute inset-0 bg-blue-600 border-2 border-black flex items-center justify-center transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1">
                        <span class="text-white font-black text-xl italic uppercase tracking-wider group-hover:scale-110 transition-transform">LINKEDIN</span>
                     </div>
                  </a>
                  
                  <!-- GitHub -->
                  <a :href="personalInfo.socials.github" target="_blank" rel="noopener noreferrer" class="group relative block h-20 perspective-1000">
                     <div class="absolute inset-0 bg-black transform translate-x-2 translate-y-2 transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
                     <div class="absolute inset-0 bg-gray-800 border-2 border-black flex items-center justify-center transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1">
                        <span class="text-white font-black text-xl italic uppercase tracking-wider group-hover:scale-110 transition-transform">GITHUB</span>
                     </div>
                  </a>

                  <!-- Instagram -->
                  <a :href="personalInfo.socials.instagram" target="_blank" rel="noopener noreferrer" class="group relative block h-20 perspective-1000">
                     <div class="absolute inset-0 bg-black transform translate-x-2 translate-y-2 transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
                     <div class="absolute inset-0 bg-pink-600 border-2 border-black flex items-center justify-center transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1">
                        <span class="text-white font-black text-xl italic uppercase tracking-wider group-hover:scale-110 transition-transform">INSTAGRAM</span>
                     </div>
                  </a>
               </div>

               <!-- Footer Signature -->
               <div class="pt-8 flex justify-end">
                  <div class="text-right transform -rotate-6">
                     <p class="text-red-600 font-bold font-mono text-sm block">FROM</p>
                     <p class="text-black font-black text-3xl font-signature" style="font-family: 'Brush Script MT', cursive;">The Phantom Dev</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { personalInfo } from '~/data/content'
</script>


