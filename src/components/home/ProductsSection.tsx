import Link from 'next/link'
import Image from 'next/image'
import { ProductImagePlaceholder } from '@/components/shared/ProductImagePlaceholder'

type ProductImage = {
  image: {
    url?: string | null
    alt?: string | null
  } | null
}

type Product = {
  id: string
  name: string
  slug: string
  category?: string | null
  shortDescription?: string | null
  images?: ProductImage[] | null
  emoji?: string | null
  accentColor?: string | null
}

type Props = { products: Product[] }

const MOCK_PRODUCTS: Product[] = [
  { id: 'm1', name: 'Basmati Rice', slug: 'basmati-rice', category: 'Grains', shortDescription: 'Premium aged basmati with distinct aroma and long grain.' },
  { id: 'm2', name: 'Turmeric', slug: 'turmeric', category: 'Spices', shortDescription: 'High curcumin content, bright golden colour from Erode.' },
  { id: 'm3', name: 'Cumin Seeds', slug: 'cumin', category: 'Spices', shortDescription: 'Aromatic cumin sourced from the farms of Rajasthan.' },
  { id: 'm4', name: 'Sesame Seeds', slug: 'sesame', category: 'Oil Seeds', shortDescription: 'Export-grade white & black sesame, hull and natural.' },
  { id: 'm5', name: 'Red Chilli', slug: 'red-chilli', category: 'Spices', shortDescription: 'Bold flavour and vibrant colour from Guntur, Andhra Pradesh.' },
  { id: 'm6', name: 'Groundnuts', slug: 'groundnuts', category: 'Oil Seeds', shortDescription: 'Bold & Java variety groundnuts, aflatoxin tested.' },
  { id: 'm7', name: 'Wheat', slug: 'wheat', category: 'Grains', shortDescription: 'Milling and durum wheat with consistent protein content.' },
  { id: 'm8', name: 'Soybean Meal', slug: 'soybean', category: 'Feed', shortDescription: 'High-protein soybean meal for feed and food processing.' },
]

export function ProductsSection({ products }: Props) {
  const displayProducts = products.length > 0 ? products : MOCK_PRODUCTS

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <span className="block h-px w-10 bg-slate shrink-0" />
              <p className="text-[11px] font-sans uppercase tracking-[0.3em] text-steel">
                Product Range
              </p>
            </div>
            <h2
              className="font-heading font-semibold text-navy leading-tight"
              style={{ fontSize: 'clamp(26px, 3vw, 28px)' }}
            >
              Our Products
            </h2>
          </div>
          <Link
            href="/products"
            className="shrink-0 rounded-md bg-slate px-6 py-3 text-[13px] font-sans font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-slate-dark"
          >
            View All Products
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-px bg-steel/10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayProducts.map((product) => {
            const imgObj = product.images?.[0]?.image
            return (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group bg-white hover:bg-white transition-colors duration-200 flex flex-col overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-52 bg-steel/50 overflow-hidden">
                  {imgObj?.url ? (
                    <Image
                      src={imgObj.url}
                      alt={imgObj.alt ?? product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <ProductImagePlaceholder emoji={product.emoji ?? null} accentColor={product.accentColor ?? null} />
                  )}
                </div>

                {/* Info */}
                <div className="p-6 flex flex-col flex-1 border-t border-steel/30">
                  {product.category && (
                    <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-steel mb-2">
                      {product.category}
                    </p>
                  )}
                  <h3 className="font-heading text-[19px] font-semibold text-slate-dark mb-2 leading-tight">
                    {product.name}
                  </h3>
                  {product.shortDescription && (
                    <p className="text-[13px] font-sans text-slate-dark/55 line-clamp-2 leading-relaxed flex-1">
                      {product.shortDescription}
                    </p>
                  )}
                  <div className="mt-5 self-start rounded-md bg-steel px-6 py-3 text-[13px] font-sans font-semibold uppercase tracking-[0.1em] text-white transition-colors group-hover:bg-steel-dark">
                    View Details
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
