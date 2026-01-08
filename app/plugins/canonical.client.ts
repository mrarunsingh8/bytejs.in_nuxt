export default defineNuxtPlugin(() => {
  const route = useRoute()
  const runtimeConfig = useRuntimeConfig()

  watch(
    () => route.fullPath,
    () => {
      const canonical = document.querySelector('link[rel="canonical"]')
      const baseUrl = runtimeConfig.public.siteUrl || 'https://www.bytejs.in'
      const url = baseUrl + route.path

      if (canonical) {
        canonical.setAttribute('href', url)
      } else {
        const link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        link.setAttribute('href', url)
        document.head.appendChild(link)
      }
    },
    { immediate: true }
  )
})
