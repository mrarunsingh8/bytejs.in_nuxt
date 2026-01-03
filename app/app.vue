<script setup lang="ts">
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon-16.png' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'ByteJS - Free Developer Tools Online'
const description = 'ByteJS is a free online toolkit for developers to simplify everyday tasks. Generate QR codes, shorten URLs, format JSON, validate HTTP headers, create UUIDs, and convert text formats directly in your browser—no installation required.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://www.bytejs.in/og-image.png',
  twitterImage: 'https://www.bytejs.in/og-image.png',
  twitterCard: 'summary_large_image'
})

</script>

<template>
  <UApp>
    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>
  </UApp>
</template>
