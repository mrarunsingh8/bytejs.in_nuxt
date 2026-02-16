<script setup lang="ts">
import { ref, watch } from 'vue'

definePageMeta({
	ssr: false,
	layout: 'toolslayout'
});

const toast = useToast()

useSeoMeta({
	title: 'Slugify Text - Free Online Slug Generator',
	description: 'Convert any text into clean, URL-friendly slugs with the free Slugify tool on ByteJS. Create SEO-friendly slugs instantly and copy with one click.',
	keywords: 'slugify, slug generator, url slug, text to slug, seo slug, slug converter, online slug tool, clean url'
})

const inputText = ref('')
const slugText = ref('')

const toSlug = (value: string) => {
	return value
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
}

watch(inputText, (newValue) => {
	slugText.value = toSlug(newValue)
})

const copySlug = async () => {
	if (!slugText.value) return
	if (navigator?.clipboard?.writeText) {
		await navigator.clipboard.writeText(slugText.value)
		toast.add({
			title: 'Copied to clipboard',
			description: 'The generated slug has been copied to your clipboard.',
			color: 'success',
			duration: 3000
		});
	}
}

const clearAll = () => {
	inputText.value = ''
	slugText.value = ''
	toast.add({
		title: 'Cleared',
		description: 'Input and output have been cleared.',
		color: 'info',
		duration: 3000
	});
}

const items = ref([
	{
		label: 'Home',
		icon: 'i-lucide-home',
		to: '/'
	},
	{
		label: 'Tools',
		icon: 'i-lucide-hammer',
		to: '/tools'
	},
	{
		label: 'Slugify Text',
		icon: 'i-lucide-link',
		to: '/tools/slugify'
	}
])
</script>

<template>
	<UBreadcrumb :items="items" />
	<UContainer class="py-8">
		<h1 class="text-4xl font-extrabold">Online Slug Generator</h1>
		<p class="text-muted mt-2">
			Convert any text into clean, URL-friendly slugs instantly. Perfect for SEO-friendly URLs and file names.
		</p>

		<section class="flex flex-col items-center justify-center text-center">
			<!-- Slug Output + Copy -->
			<div v-if="slugText" class="flex items-center gap-4 py-16">
				<code class="text-2xl md:text-2xl font-mono font-semibold text-foreground select-all">
					{{ slugText || 'your-slug-will-appear-here' }}
				</code>

				<UButton
					color="neutral"
					variant="soft"
					icon="i-lucide-copy"
					:disabled="!slugText"
					@click="copySlug"
				>
					Copy
				</UButton>
			</div>

			<!-- Input -->
			<div class="w-full max-w-3xl mt-10 text-left">
				<label class="text-sm font-semibold">Input Text</label>
				<UTextarea
					v-model="inputText"
					class="w-full mt-2"
					:rows="6"
					placeholder="Type or paste your text here..."
					size="lg"
				/>
				<div class="flex items-center justify-between mt-3">
					<span class="text-xs text-muted">{{ inputText.length }} characters</span>
					<UButton
						v-if="inputText"
						size="xs"
						color="neutral"
						variant="outline"
						icon="i-lucide-x"
						@click="clearAll"
					>
						Clear
					</UButton>
				</div>
			</div>
		</section>
	</UContainer>
</template>
