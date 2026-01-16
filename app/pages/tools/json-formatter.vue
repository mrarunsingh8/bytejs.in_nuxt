<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
    ssr: false,
    layout: 'toolslayout'
})

useSeoMeta({
    title: 'JSON Formatter - Format & Validate JSON',
    description: 'Format, validate, and beautify JSON instantly with the free JSON Formatter tool on ByteJS. Minify or pretty-print JSON, check for syntax errors, and convert between JSON formats. Perfect for developers debugging APIs and working with data.',
    keywords: 'JSON formatter, format JSON, JSON validator, beautify JSON, minify JSON, JSON pretty printer, JSON tools, validate JSON syntax, JSON linter, online JSON formatter, JSON converter'
})

const toast = useToast()
const inputJson = ref('')
const outputJson = ref('')
const isValid = ref(false)
const error = ref('')
const indentSize = ref(2)

function formatJson() {
    error.value = ''
    outputJson.value = ''
    
    if (!inputJson.value.trim()) {
        error.value = 'Please enter some JSON'
        return
    }
    
    try {
        const parsed = JSON.parse(inputJson.value)
        outputJson.value = JSON.stringify(parsed, null, indentSize.value)
        isValid.value = true
        toast.add({
            title: 'JSON formatted successfully',
            color: 'success',
            duration: 2000
        })
    } catch (e: any) {
        isValid.value = false
        error.value = `Invalid JSON: ${e.message}`
        toast.add({
            title: 'JSON validation failed',
            description: e.message,
            color: 'red',
            duration: 3000
        })
    }
}

function minifyJson() {
    error.value = ''
    outputJson.value = ''
    
    if (!inputJson.value.trim()) {
        error.value = 'Please enter some JSON'
        return
    }
    
    try {
        const parsed = JSON.parse(inputJson.value)
        outputJson.value = JSON.stringify(parsed)
        isValid.value = true
        toast.add({
            title: 'JSON minified successfully',
            color: 'success',
            duration: 2000
        })
    } catch (e: any) {
        isValid.value = false
        error.value = `Invalid JSON: ${e.message}`
        toast.add({
            title: 'JSON validation failed',
            description: e.message,
            color: 'red',
            duration: 3000
        })
    }
}

function copyOutput() {
    if (!outputJson.value) return
    navigator.clipboard.writeText(outputJson.value)
    toast.add({
        title: 'Copied to clipboard',
        color: 'success',
        duration: 2000
    })
}

function clearAll() {
    inputJson.value = ''
    outputJson.value = ''
    error.value = ''
    isValid.value = false
}

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
            <h1 class="text-4xl font-extrabold">JSON Formatter & Validator</h1>
            <p class="text-muted mt-2">
                Format, validate, and beautify JSON data. Minify or pretty-print your JSON with customizable indentation. Check for syntax errors instantly.
            </p>
        </div>

        <!-- Input Section -->
        <UCard>
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-lg font-semibold">Input JSON</h3>
                    <div class="flex items-center gap-2">
                        <label class="text-sm text-muted">Indent:</label>
                        <select v-model.number="indentSize" class="px-2 py-1 rounded border border-default">
                            <option :value="2">2 spaces</option>
                            <option :value="4">4 spaces</option>
                            <option :value="8">8 spaces</option>
                        </select>
                    </div>
                </div>
            </template>

            <textarea 
                v-model="inputJson"
                placeholder="Paste your JSON here..."
                class="w-full h-64 p-4 rounded border border-default font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>

            <!-- Action Buttons -->
            <div class="flex flex-col md:flex-row gap-3 mt-4">
                <UButton color="primary" icon="i-lucide-wand-2" @click="formatJson" class="flex-1 md:flex-none">
                    Format
                </UButton>
                <UButton color="primary" variant="outline" icon="i-lucide-compress" @click="minifyJson" class="flex-1 md:flex-none">
                    Minify
                </UButton>
                <UButton color="neutral" variant="outline" icon="i-lucide-x" @click="clearAll" class="flex-1 md:flex-none">
                    Clear
                </UButton>
            </div>
        </UCard>

        <!-- Error Message -->
        <div v-if="error" class="p-4 rounded bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <p class="text-red-700 dark:text-red-200 font-mono text-sm">{{ error }}</p>
        </div>

        <!-- Output Section -->
        <div v-if="outputJson" class="space-y-4">
            <UCard>
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-semibold">Output JSON</h3>
                        <UBadge v-if="isValid" color="green" variant="soft">Valid JSON</UBadge>
                    </div>
                </template>

                <div class="relative">
                    <pre class="w-full h-64 p-4 rounded bg-gray-50 dark:bg-gray-900 border border-default font-mono text-sm overflow-auto"><code>{{ outputJson }}</code></pre>
                    <UButton 
                        color="neutral" 
                        variant="soft" 
                        size="sm"
                        icon="i-lucide-copy"
                        @click="copyOutput"
                        class="absolute top-4 right-4"
                    >
                        Copy
                    </UButton>
                </div>
            </UCard>
        </div>
    </div>
</template>