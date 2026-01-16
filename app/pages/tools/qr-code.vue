<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import QRCode from 'qrcode'

definePageMeta({
    ssr: false,
    layout: 'toolslayout'
})

useSeoMeta({
    title: 'QR Code Generator - Create QR Codes',
    description: 'Generate QR codes instantly with the free QR Code Generator on ByteJS. Create QR codes from URLs, text, and data. Customize colors, size, and error correction. Download as PNG or SVG. Perfect for marketing, inventory, and sharing information.',
    keywords: 'QR code generator, generate QR codes, free QR code, create QR code, QR code maker, QR code converter, custom QR codes, QR code design, QR code tracking, marketing QR codes, inventory tracking'
})

const toast = useToast()
const inputText = ref('https://www.bytejs.in')
const qrCodeDataUrl = ref('')
const qrSize = ref(300)
const errorCorrection = ref('M')
const darkColor = ref('#000000')
const lightColor = ref('#FFFFFF')

const errorCorrectionOptions = [
    { label: 'Low (7%)', value: 'L' },
    { label: 'Medium (15%)', value: 'M' },
    { label: 'Quartile (25%)', value: 'Q' },
    { label: 'High (30%)', value: 'H' }
]

async function generateQRCode() {
    if (!inputText.value.trim()) {
        toast.add({
            title: 'Error',
            description: 'Please enter some text or URL',
            color: 'red',
            duration: 2000
        })
        return
    }

    try {
        qrCodeDataUrl.value = await QRCode.toDataURL(inputText.value, {
            width: qrSize.value,
            margin: 1,
            color: {
                dark: darkColor.value,
                light: lightColor.value
            },
            errorCorrectionLevel: errorCorrection.value
        })
        toast.add({
            title: 'QR Code generated',
            color: 'success',
            duration: 2000
        })
    } catch (error: any) {
        toast.add({
            title: 'Error',
            description: error.message,
            color: 'red',
            duration: 2000
        })
    }
}

async function downloadQRCode(format: 'png' | 'svg') {
    if (!qrCodeDataUrl.value) {
        toast.add({
            title: 'Error',
            description: 'Please generate a QR code first',
            color: 'red',
            duration: 2000
        })
        return
    }

    try {
        if (format === 'png') {
            const link = document.createElement('a')
            link.href = qrCodeDataUrl.value
            link.download = `qrcode-${Date.now()}.png`
            link.click()
        } else if (format === 'svg') {
            const svgString = await QRCode.toString(inputText.value, {
                width: qrSize.value,
                margin: 1,
                color: {
                    dark: darkColor.value,
                    light: lightColor.value
                },
                errorCorrectionLevel: errorCorrection.value,
                type: 'image/svg+xml'
            })
            const blob = new Blob([svgString], { type: 'image/svg+xml' })
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = `qrcode-${Date.now()}.svg`
            link.click()
        }
        toast.add({
            title: 'Downloaded successfully',
            color: 'success',
            duration: 2000
        })
    } catch (error: any) {
        toast.add({
            title: 'Download failed',
            description: error.message,
            color: 'red',
            duration: 2000
        })
    }
}

function copyToClipboard() {
    if (!qrCodeDataUrl.value) {
        toast.add({
            title: 'Error',
            description: 'Please generate a QR code first',
            color: 'red',
            duration: 2000
        })
        return
    }

    navigator.clipboard.writeText(qrCodeDataUrl.value)
    toast.add({
        title: 'Copied to clipboard',
        color: 'success',
        duration: 2000
    })
}

// Auto-generate on input change
watch(inputText, () => {
    if (qrCodeDataUrl.value) {
        generateQRCode()
    }
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
                Generate QR codes instantly from URLs, text, or any data. Customize colors, size, and error correction level. Download as PNG or SVG.
            </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Input Section -->
            <UCard>
                <template #header>
                    <h3 class="text-lg font-semibold">Settings</h3>
                </template>

                <div class="space-y-4">
                    <!-- Input Text -->
                    <div>
                        <label class="block text-sm font-medium mb-2">Text or URL</label>
                        <textarea
                            v-model="inputText"
                            placeholder="Enter text, URL, or any data..."
                            class="w-full h-24 p-3 rounded border border-default font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                        ></textarea>
                    </div>

                    <!-- QR Size -->
                    <div>
                        <div class="flex items-center justify-between mb-2">
                            <label class="text-sm font-medium">Size</label>
                            <span class="text-sm text-muted">{{ qrSize }}px</span>
                        </div>
                        <input
                            v-model.number="qrSize"
                            type="range"
                            min="100"
                            max="500"
                            step="50"
                            class="w-full"
                        />
                    </div>

                    <!-- Error Correction -->
                    <div>
                        <label class="block text-sm font-medium mb-2">Error Correction</label>
                        <select v-model="errorCorrection" class="w-full px-3 py-2 rounded border border-default focus:outline-none focus:ring-2 focus:ring-primary">
                            <option v-for="option in errorCorrectionOptions" :key="option.value" :value="option.value">
                                {{ option.label }}
                            </option>
                        </select>
                    </div>

                    <!-- Dark Color -->
                    <div>
                        <label class="block text-sm font-medium mb-2">Dark Color</label>
                        <div class="flex gap-2">
                            <input
                                v-model="darkColor"
                                type="color"
                                class="w-12 h-10 rounded border border-default cursor-pointer"
                            />
                            <input
                                v-model="darkColor"
                                type="text"
                                class="flex-1 px-3 py-2 rounded border border-default font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>

                    <!-- Light Color -->
                    <div>
                        <label class="block text-sm font-medium mb-2">Light Color</label>
                        <div class="flex gap-2">
                            <input
                                v-model="lightColor"
                                type="color"
                                class="w-12 h-10 rounded border border-default cursor-pointer"
                            />
                            <input
                                v-model="lightColor"
                                type="text"
                                class="flex-1 px-3 py-2 rounded border border-default font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>

                    <!-- Generate Button -->
                    <UButton color="primary" @click="generateQRCode" icon="i-lucide-wand-2" class="w-full">
                        Generate QR Code
                    </UButton>
                </div>
            </UCard>

            <!-- Preview Section -->
            <div class="space-y-4">
                <UCard v-if="qrCodeDataUrl">
                    <template #header>
                        <h3 class="text-lg font-semibold">Preview</h3>
                    </template>

                    <div class="flex flex-col items-center gap-4">
                        <img :src="qrCodeDataUrl" :alt="inputText" class="rounded border border-default" />

                        <!-- Download & Copy Buttons -->
                        <div class="flex flex-col w-full gap-2">
                            <UButton color="primary" @click="downloadQRCode('png')" icon="i-lucide-download" class="w-full">
                                Download PNG
                            </UButton>
                            <UButton color="primary" variant="outline" @click="downloadQRCode('svg')" icon="i-lucide-download" class="w-full">
                                Download SVG
                            </UButton>
                            <UButton color="neutral" variant="outline" @click="copyToClipboard" icon="i-lucide-copy" class="w-full">
                                Copy Image
                            </UButton>
                        </div>

                        <!-- QR Code Info -->
                        <div class="w-full p-3 rounded bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                            <p class="text-xs text-blue-700 dark:text-blue-200 font-mono break-all">{{ inputText }}</p>
                        </div>
                    </div>
                </UCard>

                <UCard v-else>
                    <div class="flex flex-col items-center justify-center py-16 text-center">
                        <UIcon name="i-lucide-qr-code" class="w-16 h-16 text-muted mb-4" />
                        <p class="text-muted">Enter text and click "Generate QR Code" to create your QR code</p>
                    </div>
                </UCard>
            </div>
        </div>
    </div>
</template>