import AOS from 'aos'

export default defineNuxtPlugin((nuxtApp) => {
  if (!import.meta.client) return

  const initAos = () => {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: false,
      mirror: true,
      offset: 80,
      anchorPlacement: 'top-bottom',
      debounceDelay: 40,
      throttleDelay: 80,
      startEvent: 'DOMContentLoaded',
    })
  }

  nuxtApp.hook('app:mounted', () => {
    initAos()
  })

  nuxtApp.hook('page:finish', () => {
    AOS.refresh()
  })

  return {
    provide: {
      refreshAos: () => AOS.refresh(),
    },
  }
})
