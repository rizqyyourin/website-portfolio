import AOS from 'aos'

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    nuxtApp.hook('app:mounted', () => {
      AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: false, // set to false so it animates in/out on scroll up/down
        offset: 50,
      })
    })
  }
})