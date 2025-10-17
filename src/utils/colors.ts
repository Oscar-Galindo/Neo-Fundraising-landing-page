export const brandColors = {
  black: '#0B0B0B',
  white: '#FFFFFF',
  gray: '#1A1A1A',
  accentCyan: '#22D3EE',
  accentOrange: '#FF7A00',
  accentRed: '#FF3B30',
} as const

export type BrandColor = keyof typeof brandColors

export function getBrandColor(color: BrandColor): string {
  return brandColors[color]
}

export function getContrastColor(background: BrandColor): BrandColor {
  const darkColors: BrandColor[] = ['black', 'gray']
  return darkColors.includes(background) ? 'white' : 'black'
}