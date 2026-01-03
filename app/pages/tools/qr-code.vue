/* Generate the comming sonn page content */
<script setup>
definePageMeta({
    layout: 'toolslayout',
    title: 'QR Code Generator - Create QR Codes',
    description:
        'Generate QR codes instantly with the free QR Code Generator on ByteJS. Create QR codes from URLs, text, and data. Customize colors, size, and error correction. Download as PNG or SVG. Perfect for marketing, inventory, and sharing information.'
})

useSeoMeta({
    keywords: 'QR code generator, generate QR codes, free QR code, create QR code, QR code maker, QR code converter, custom QR codes, QR code design, QR code tracking, marketing QR codes, inventory tracking'
})

const items = ref([
    { label: 'Home', icon: 'i-lucide-home', to: '/' },
    { label: 'Tools', icon: 'i-lucide-hammer', to: '/tools' },
    {
        label: 'QR Code Generator',
        icon: 'i-lucide-qr-code',
        to: '/tools/qr-code'
    }
])
</script>
<template>
    <UBreadcrumb :items="items" class="mb-6" />

    <div class="space-y-6">
        <!-- Header -->
        <div>
            <h1 class="text-4xl font-extrabold">QR Code Generator</h1>
            <p class="text-muted mt-2">
                QR Code Generator is coming soon! Stay tuned for our upcoming tool that will help you generate QR codes for links, text, or data quickly and easily.
            </p>
        </div>

    </div>
</template>