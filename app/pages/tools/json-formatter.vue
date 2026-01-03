/* Generate the comming sonn page content */
<script setup>
definePageMeta({
    layout: 'toolslayout',
    title: 'JSON Formatter - Format & Validate JSON',
    description:
        'Format, validate, and beautify JSON instantly with the free JSON Formatter tool on ByteJS. Minify or pretty-print JSON, check for syntax errors, and convert between JSON formats. Perfect for developers debugging APIs and working with data.'
})

useSeoMeta({
    keywords: 'JSON formatter, format JSON, JSON validator, beautify JSON, minify JSON, JSON pretty printer, JSON tools, validate JSON syntax, JSON linter, online JSON formatter, JSON converter'
})

const items = ref([
    { label: 'Home', icon: 'i-lucide-home', to: '/' },
    { label: 'Tools', icon: 'i-lucide-hammer', to: '/tools' },
    {
        label: 'JSON Formatter',
        icon: 'i-lucide-braces',
        to: '/tools/json-formatter'
    }
])
</script>
<template>
    <UBreadcrumb :items="items" class="mb-6" />

    <div class="space-y-6">
        <!-- Header -->
        <div>
            <h1 class="text-4xl font-extrabold">JSON Formatter</h1>
            <p class="text-muted mt-2">
                JSON Formatter is coming soon! Stay tuned for our upcoming tool that will help you format and beautify JSON data quickly and easily.
            </p>
        </div>

    </div>
</template>