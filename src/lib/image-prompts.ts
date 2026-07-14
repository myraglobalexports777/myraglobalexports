type PromptInput = { name: string; slug: string; category: string }

export function buildImagePromptLine(product: PromptInput): string {
  return `${product.name} (${product.slug}, ${product.category}) — professional export-catalogue product photo of ${product.name.toLowerCase()}, clean neutral background, studio lighting, high resolution.`
}
