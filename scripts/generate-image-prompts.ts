// scripts/generate-image-prompts.ts
// Run with: npx tsx --env-file=.env.local scripts/generate-image-prompts.ts
import { createClient } from '@supabase/supabase-js'
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import type { Database } from '../src/types/database'
import { buildImagePromptLine } from '../src/lib/image-prompts'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

async function run() {
  const { data, error } = await supabase
    .from('products')
    .select('name, slug, category, images, display_order')
    .order('display_order')

  if (error) {
    console.error('Query failed:', error.message)
    process.exit(1)
  }

  const missing = (data ?? []).filter((p) => (p.images ?? []).length === 0)
  const lines = missing.map((p) => buildImagePromptLine(p))
  const header = `Product image prompts — ${missing.length} products need a real photo\nGenerated ${new Date().toISOString()}\n\n`
  const outPath = resolve(__dirname, '../docs/product-image-prompts.txt')

  writeFileSync(outPath, header + lines.join('\n\n') + '\n', 'utf-8')
  console.log(`Wrote ${missing.length} prompts to ${outPath}`)
}

run()
