export function buildWhatsAppMessage(productName: string | null): string {
  if (productName) {
    return `Hi, I am interested in ${productName} and would like to request a quote.`
  }
  return 'Hi, I am interested in your products and would like to request a quote.'
}
