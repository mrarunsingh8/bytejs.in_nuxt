/* Generate the comming sonn page content */
<script setup>
definePageMeta({
    layout: 'toolslayout',
    title: 'ByteURL - Free URL Shortening Tool',
    description:
        'ByteURL is a free URL shortening tool coming soon on ByteJS. Create short, shareable links instantly from long URLs. Perfect for social media, emails, and messaging. Simple, fast, and secure link management with tracking and custom URL options available.'
})

useSeoMeta({
    keywords: 'URL shortener, shorten URLs, short links, free URL shortener, link shortener, URL compression, create short URLs, custom short URLs, shareable links, URL management tool, bitly alternative'
})

const items = ref([
    { label: 'Home', icon: 'i-lucide-home', to: '/' },
    { label: 'Tools', icon: 'i-lucide-hammer', to: '/tools' },
    {
        label: 'URL Shortener',
        icon: 'i-lucide-link',
        to: '/tools/byteurl'
    }
])
</script>
<template>
    <UBreadcrumb :items="items" class="mb-6" />

    <div class="space-y-6">
        <!-- Header -->
        <div>
            <h1 class="text-4xl font-extrabold">Byte URL - URL Shortener</h1>
            <p class="text-muted mt-2">
                ByteURL is coming soon! Stay tuned for our upcoming URL shortening tool that will help you create short, shareable links quickly and securely.
            </p>
        </div>

    </div>
</template>