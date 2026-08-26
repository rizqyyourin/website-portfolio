<template>
  <section id="home" class="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-28 md:pt-36 pb-0">
    <!-- Dynamic Background Lines -->
    <div class="absolute inset-0 z-0 overflow-hidden">
       <!-- Radiant Lines Animation -->
       <div class="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(255,255,255,0.03)_20px,rgba(255,255,255,0.03)_40px)] animate-slide-bg"></div>
       
       <!-- Big Red Slash -->
       <div class="absolute top-0 right-0 w-2/3 h-full bg-red-600 transform -skew-x-12 translate-x-1/3 opacity-90 z-0"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-30">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Content Side -->
        <div class="space-y-8 relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
          
          <!-- Opening Tag -->
          <div data-aos="p5-slide-right" data-aos-duration="650" data-aos-once="true" class="transform -skew-x-12 inline-block bg-black text-white px-4 py-1 border-2 border-white shadow-[4px_4px_0px_0px_#dc2626]">
            <span class="text-xl font-black italic tracking-widest uppercase transform skew-x-12 inline-block">
              Fullstack Developer
            </span>
          </div>

          <!-- Name & Title -->
          <div class="relative w-full flex flex-col items-center md:items-start" data-aos="p5-zoom-out-up" data-aos-duration="900" data-aos-delay="150" data-aos-once="true">
             <h1 class="text-7xl md:text-9xl font-black text-white leading-none tracking-tighter transform hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center md:items-start">
               <span class="block transform -skew-x-6 text-center md:text-left">AHMAD</span>
               <span class="block text-red-600 bg-white px-2 transform skew-x-6 shadow-[8px_8px_0px_0px_#000000] md:-ml-4 w-fit mx-auto md:mx-0">RIZQY</span>
               <span class="block transform -skew-x-6 text-6xl md:text-8xl mt-2 text-gray-300 text-center md:text-left">YOURIN</span>
             </h1>
             
             <!-- Floating Decorations -->
             <div class="absolute -top-10 -left-10 text-red-600 text-6xl font-black opacity-20 animate-pulse pointer-events-none select-none">★</div>
             <!-- <div class="absolute bottom-20 right-0 text-white text-8xl font-black opacity-10 animate-bounce pointer-events-none select-none">!</div> -->
          </div>

          <!-- Description Box -->
          <div data-aos="p5-rise" data-aos-duration="650" data-aos-delay="350" data-aos-once="true" class="bg-black/80 backdrop-blur-sm border-l-8 border-red-600 p-6 transform -skew-x-6 max-w-xl">
            <p class="text-xl md:text-2xl text-white font-bold italic transform skew-x-6 leading-relaxed">
              "{{ personalInfo.bio }}"
            </p>
          </div>

          <!-- CTA Buttons -->
          <div data-aos="p5-rise" data-aos-duration="650" data-aos-delay="500" data-aos-once="true" class="flex flex-wrap justify-center md:justify-start gap-6 pt-4">
             <a href="#projects" class="group relative px-8 py-4 bg-red-600 text-white font-black text-xl italic tracking-wider transform -skew-x-12 hover:bg-white hover:text-red-600 transition-colors duration-300 shadow-[6px_6px_0px_0px_#ffffff]">
               <span class="inline-block transform skew-x-12">START MISSION</span>
             </a>
             <a :href="personalInfo.socials.upwork" target="_blank" class="group relative px-8 py-4 bg-black text-white border-2 border-white font-black text-xl italic tracking-wider transform -skew-x-12 hover:bg-zinc-800 transition-colors duration-300">
               <span class="inline-block transform skew-x-12">HIRE ME</span>
             </a>
          </div>

        </div>

        <!-- Visual Side (3D Three.js Metaverse Card with SSR Fallback) -->
        <div data-aos="p5-slide-left" data-aos-duration="900" data-aos-delay="200" data-aos-once="true" class="hidden lg:flex justify-center relative perspective-1000">
          <ClientOnly>
            <HeroCard3D />
            <template #placeholder>
              <!-- SSR / Low Power 2D Fallback Card -->
              <div class="relative w-96 h-[500px] transform rotate-y-12 rotate-z-2 transition-transform duration-700 ease-out">
                 <!-- Back Card -->
                 <div class="absolute inset-0 bg-white transform translate-x-4 translate-y-4 -skew-x-6 border-4 border-black"></div>
                 
                 <!-- Front Image Container -->
                 <div class="absolute inset-0 bg-zinc-900 border-4 border-white overflow-hidden transform -skew-x-6 relative group">
                    <div class="absolute inset-0 bg-gradient-to-t from-red-900/80 to-transparent mix-blend-normal z-10 opacity-50"></div>
                    
                    <div class="flex items-center justify-center w-full h-full p-8 pb-24">
                        <img src="/images/profile.jpg" 
                             alt="Ahmad Rizqy Yourin - profile photo" 
                             class="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]" 
                        />
                    </div>
                    
                    <div class="absolute bottom-0 left-0 w-full px-4 py-3 bg-black/90 text-red-500 font-mono text-xs z-20">
                      <p class="typewriter" style="--tw-width: 32ch; --tw-steps: 32">>> INFILTRATION SUCCESSFUL</p>
                      <p class="typewriter animate-delay-2000" style="--tw-width: 41ch; --tw-steps: 41">>> TARGET ACQUIRED: FULLSTACK_DEV</p>
                      <p class="typewriter animate-delay-4000" style="--tw-width: 31ch; --tw-steps: 31">>> SKILLS LOADING... 100%</p>
                    </div>
                 </div>
              </div>
            </template>
          </ClientOnly>
        </div>
      </div>
    </div>

    <!-- Bottom Spikes -->
    <div class="absolute bottom-0 left-0 w-full h-16 bg-zinc-900 clip-path-spikes z-20"></div>
  </section>
</template>

<script setup lang="ts">
import { personalInfo } from '~/data/content'
import HeroCard3D from './HeroCard3D.vue'
</script>


<style scoped>
@keyframes slide-bg {
  0% { background-position: 0 0; }
  100% { background-position: 100px 100px; }
}

@keyframes pulse-slow {
  0%, 100% { transform: scale(1); opacity: 1; filter: drop-shadow(0 0 10px rgba(220,38,38,0.7)); }
  50% { transform: scale(1.1); opacity: 0.9; filter: drop-shadow(0 0 25px rgba(220,38,38,1)); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes typing {
  from { width: 0 }
  to { width: var(--tw-width); }
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: #ef4444; }
}

.typewriter {
  display: block;
  width: 0;
  overflow: hidden;
  border-right: .15em solid #ef4444;
  white-space: nowrap;
  letter-spacing: .15em;
  animation: 
    typing 2s steps(var(--tw-steps), end) both,
    blink-caret .75s step-end 3 forwards; /* Blinks 3 times then stops at transparent */
}

/* Fallback for browsers that trigger step(var) issues: override step count if needed, but keeping simple for now */
.animate-delay-2000 {
  animation-delay: 2s;
}

.animate-delay-4000 {
  animation-delay: 4s;
}

.animate-slide-bg {
  animation: slide-bg 20s linear infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

.animate-float-delay-1 {
  animation: float 4s ease-in-out infinite;
}
.animate-float-delay-2 {
  animation: float 5s ease-in-out infinite 1s;
}
.animate-float-delay-3 {
  animation: float 6s ease-in-out infinite 2s;
}

.clip-path-spikes {
  clip-path: polygon(0% 100%, 5% 0%, 10% 100%, 15% 0%, 20% 100%, 25% 0%, 30% 100%, 35% 0%, 40% 100%, 45% 0%, 50% 100%, 55% 0%, 60% 100%, 65% 0%, 70% 100%, 75% 0%, 80% 100%, 85% 0%, 90% 100%, 95% 0%, 100% 100%);
}
</style>
