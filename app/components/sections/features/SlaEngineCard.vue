<template>
  <div class="relative max-w-4xl mx-auto bg-zinc-950 border-2 border-white/80 p-5 sm:p-7 shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] max-md:shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] transform md:-skew-x-2 overflow-visible">
    
    <!-- Header -->
    <div class="mb-5 space-y-1.5 text-center md:text-left">
      <div class="inline-block bg-red-600 text-white text-[11px] font-black italic tracking-widest px-2.5 py-0.5 uppercase transform -skew-x-6">
        Automation Engine
      </div>
      <h3 class="text-2xl sm:text-3xl font-black italic uppercase tracking-tight text-white">
        SLA Matching & Escalation Engine
      </h3>
    </div>

    <!-- Main Container -->
    <div class="space-y-4">
      
      <!-- 1. SLA CONFIGURATION CARD -->
      <div class="bg-zinc-900 border-2 border-red-600 p-4 sm:p-5 shadow-inner space-y-3 font-mono text-xs">
        <div class="flex items-center gap-2 border-b border-zinc-800 pb-2.5">
          <span class="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
          <span class="text-white font-black text-xs uppercase tracking-wider">
            SLA Policy Configuration
          </span>
        </div>

        <!-- SLA Config Specs Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-[11px]">
          <!-- 1st Response Target -->
          <div class="bg-black p-2.5 border border-zinc-800 rounded">
            <span class="text-zinc-500 block text-[9px] uppercase">1st Response</span>
            <span class="text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              &lt; 15 Mins
            </span>
          </div>

          <!-- Resolution Target -->
          <div class="bg-black p-2.5 border border-zinc-800 rounded">
            <span class="text-zinc-500 block text-[9px] uppercase">Resolution</span>
            <span class="text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              &lt; 2 Hours
            </span>
          </div>

          <!-- Auto Escalation -->
          <div class="bg-black p-2.5 border border-zinc-800 rounded">
            <span class="text-zinc-500 block text-[9px] uppercase">Auto-Escalate</span>
            <span class="text-white font-bold flex items-center gap-1 mt-0.5 truncate">
              <svg class="w-3.5 h-3.5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              @Rizqy
            </span>
          </div>

          <!-- Supervisor Notification -->
          <div class="bg-black p-2.5 border border-zinc-800 rounded">
            <span class="text-zinc-500 block text-[9px] uppercase">Notify Supervisor</span>
            <span class="text-yellow-400 font-bold flex items-center gap-1 mt-0.5 truncate">
              <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
              </svg>
              @Yusuke
            </span>
          </div>
        </div>
      </div>

      <!-- 2. SIDE-BY-SIDE TICKET COMPARISON -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <!-- TICKET CARD 1: WITH MATCHING SLA -->
        <div class="bg-zinc-900 border-2 border-emerald-500/80 p-4 rounded-none space-y-3 font-mono text-xs shadow-lg flex flex-col justify-between">
          <div class="space-y-2.5">
            
            <!-- Ticket Header -->
            <div class="flex items-center justify-between gap-2 border-b border-zinc-800 pb-2">
              <span class="text-[10px] font-bold uppercase px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                MATCHES SLA
              </span>
              <span class="text-zinc-400 text-[10px]">#TK-9042</span>
            </div>

            <!-- Title & Meta -->
            <div>
              <div class="text-white font-bold text-sm">Payment Webhook Timeout</div>
              <div class="flex items-center gap-2 text-[11px] text-zinc-400 mt-1">
                <span class="text-red-400 font-bold">Critical</span> •
                <span class="text-yellow-400 font-bold">VIP Client</span>
              </div>
            </div>

            <!-- Triggered SLA Actions -->
            <div class="space-y-1.5 pt-1 text-[11px]">
              <div class="flex items-center justify-between p-2 bg-black border border-zinc-800 rounded">
                <span class="text-zinc-400">Response Target:</span>
                <span class="text-emerald-400 font-bold flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  &lt; 15 Mins
                </span>
              </div>

              <div class="flex items-center justify-between p-2 bg-black border border-zinc-800 rounded">
                <span class="text-zinc-400">Escalated To:</span>
                <span class="text-white font-bold">@Rizqy</span>
              </div>

              <div class="flex items-center justify-between p-2 bg-black border border-zinc-800 rounded">
                <span class="text-zinc-400">Supervisor Alert:</span>
                <span class="text-yellow-400 font-bold">@Yusuke</span>
              </div>
            </div>

          </div>

          <!-- Bottom Business Impact -->
          <div class="p-2 bg-emerald-950/40 border border-emerald-500/40 text-[11px] text-emerald-300 flex items-center gap-2 mt-2">
            <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>Resolved in 40m • 100% SLA Kept • $0 Penalty</span>
          </div>
        </div>

        <!-- TICKET CARD 2: WITHOUT SLA -->
        <div class="bg-zinc-900 border-2 border-zinc-700 p-4 rounded-none space-y-3 font-mono text-xs shadow-lg flex flex-col justify-between opacity-90 hover:opacity-100 transition-opacity">
          <div class="space-y-2.5">
            
            <!-- Ticket Header -->
            <div class="flex items-center justify-between gap-2 border-b border-zinc-800 pb-2">
              <span class="text-[10px] font-bold uppercase px-2 py-0.5 bg-zinc-800 text-zinc-400 border border-zinc-700 flex items-center gap-1">
                <svg class="w-3.5 h-3.5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                NO SLA POLICY
              </span>
              <span class="text-zinc-400 text-[10px]">#TK-9043</span>
            </div>

            <!-- Title & Meta -->
            <div>
              <div class="text-white font-bold text-sm">General Portal Inquiry</div>
              <div class="flex items-center gap-2 text-[11px] text-zinc-400 mt-1">
                <span class="text-zinc-400">Low Priority</span> •
                <span class="text-zinc-400">Standard Client</span>
              </div>
            </div>

            <!-- Fallback Behavior -->
            <div class="space-y-1.5 pt-1 text-[11px]">
              <div class="flex items-center justify-between p-2 bg-black border border-zinc-800 rounded">
                <span class="text-zinc-500">Response Target:</span>
                <span class="text-zinc-400 flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  24 - 48 Hours
                </span>
              </div>

              <div class="flex items-center justify-between p-2 bg-black border border-zinc-800 rounded">
                <span class="text-zinc-500">Escalated To:</span>
                <span class="text-zinc-500">None</span>
              </div>

              <div class="flex items-center justify-between p-2 bg-black border border-zinc-800 rounded">
                <span class="text-zinc-500">Supervisor Alert:</span>
                <span class="text-zinc-500">None</span>
              </div>
            </div>

          </div>

          <!-- Bottom Business Impact -->
          <div class="p-2 bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-400 flex items-center gap-2 mt-2">
            <svg class="w-4 h-4 text-zinc-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>Standard Queue • Normal Business Hours Handling</span>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
// Stateless declarative comparison component
</script>

<style scoped>
/* Scoped styles */
</style>
