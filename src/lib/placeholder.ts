export function buildPlaceholderGradient(accentColor: string): string {
  return `radial-gradient(circle at 30% 30%, ${accentColor}33, ${accentColor}0D 60%, transparent 100%)`
}
