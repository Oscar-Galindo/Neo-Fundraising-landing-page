import {
  defineConfig,
  presetUno,
  presetTypography,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx?|mdx?|astro)($|\?)/,
        'src/**/*.{js,ts,jsx,tsx,astro}',
      ],
    },
  },
  presets: [
    presetUno(),
    presetTypography(),
    presetIcons({
      scale: 1.2,
      warn: true,
      collections: {
        mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
        heroicons: () => import('@iconify-json/heroicons/icons.json').then(i => i.default),
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme: {
    colors: {
      primary: {
        '400': 'rgb(96, 165, 250)',
        '500': 'rgb(59, 130, 246)',
        '600': 'rgb(37, 99, 235)',
        '700': 'rgb(29, 78, 216)',
      },
      brand: {
        black: '#0F0F0F',
        white: '#FCFCFC',
        gray: '#1A1A1A',
        accentBlue: '#00B0F1',
        accentOrange: '#FFB231',
        accentRed: '#FF5253',
        accentCyan: '#00B0F1',
      },
    },
    animation: {
      keyframes: {
        'float': '{0%, 100% {transform: translateY(0px) translateX(0px);} 33% {transform: translateY(-20px) translateX(10px);} 66% {transform: translateY(10px) translateX(-5px);}}',
        'float-delayed': '{0%, 100% {transform: translateY(0px) translateX(0px);} 33% {transform: translateY(15px) translateX(-10px);} 66% {transform: translateY(-10px) translateX(15px);}}',
        'glow-pulse': '{0%, 100% {opacity: 0.3; filter: blur(60px);} 50% {opacity: 0.6; filter: blur(80px);}}',
      },
      durations: {
        'float': '8s',
        'float-delayed': '10s',
        'glow-pulse': '4s',
      },
      timingFns: {
        'float': 'ease-in-out',
        'float-delayed': 'ease-in-out',
        'glow-pulse': 'ease-in-out',
      },
      counts: {
        'float': 'infinite',
        'float-delayed': 'infinite',
        'glow-pulse': 'infinite',
      },
    },
    borderRadius: {
      'none': '0',
      'sm': '0.125rem',
      'DEFAULT': '0.25rem',
      'md': '0.375rem',
      'lg': '0.5rem',
      'xl': '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      'full': '9999px',
    },
  },
  shortcuts: {
    // Layout shortcuts - improved spacing
    'luxury-container': 'max-w-6xl mx-auto px-6 sm:px-8 lg:px-10',
    'luxury-section': 'py-20 sm:py-24 lg:py-32',

    // Card and surface shortcuts
    'luxury-card': 'bg-brand-gray/50 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-brand-white/5',
    'luxury-surface': 'bg-brand-gray/30 backdrop-blur-md rounded-2xl',

    // Typography shortcuts - Improved readability
    'luxury-h1': 'text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-brand-white leading-relaxed lg:leading-relaxed mb-6',
    'luxury-h2': 'text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-brand-white mb-4',
    'luxury-h3': 'text-xl sm:text-2xl font-medium tracking-tight text-brand-white mb-3',
    'luxury-body': 'text-base lg:text-lg text-brand-white/90 leading-7 lg:leading-8',
    'luxury-muted': 'text-sm lg:text-base text-brand-white/70 leading-6',
    'luxury-caption': 'text-xs uppercase tracking-wider text-brand-white/60 font-medium',

    // Button shortcuts
    'luxury-btn': 'inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-lg transition-all duration-300 min-h-[48px] focus:outline-none focus:ring-2',
    'luxury-btn-primary': 'luxury-btn bg-brand-accentOrange text-brand-black hover:bg-brand-accentOrange/90 focus:ring-brand-accentOrange/50',
    'luxury-btn-secondary': 'luxury-btn bg-transparent text-brand-white border-2 border-brand-white/20 hover:border-brand-white/40 hover:bg-brand-white/5 focus:ring-brand-white/20',
    'luxury-btn-accent': 'luxury-btn bg-brand-accentOrange text-brand-black hover:bg-brand-accentOrange/90 hover:shadow-lg hover:shadow-brand-accentOrange/30 focus:ring-brand-accentOrange/30',

    // Interactive element shortcuts
    'luxury-input': 'w-full px-6 py-4 bg-brand-white/5 border border-brand-white/10 rounded-2xl text-brand-white placeholder:text-brand-white/40 focus:outline-none focus:border-brand-white/30 focus:bg-brand-white/10 transition-all',
    'luxury-focus': 'focus:outline-none focus:ring-4 focus:ring-brand-white/20',

    // Grid shortcuts
    'luxury-grid': 'grid gap-8 sm:gap-10 lg:gap-12',
    'luxury-grid-2': 'luxury-grid grid-cols-1 md:grid-cols-2',
    'luxury-grid-3': 'luxury-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    'luxury-grid-4': 'luxury-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',

    // Utility shortcuts
    'luxury-divider': 'h-px bg-gradient-to-r from-transparent via-brand-white/10 to-transparent',
    'luxury-shadow': 'shadow-2xl shadow-brand-black/50',
    'luxury-glow': 'shadow-xl shadow-brand-accentCyan/10',

    // Wireframe debugging
    'wireframe': 'border-2 border-dashed border-red-500/50',
  },
  safelist: [
    'text-primary-400',
    'text-brand-accentBlue',
    'text-brand-accentOrange',
    'text-brand-accentRed',
    'bg-primary-600',
    'bg-primary-700',
    'bg-brand-accentBlue',
    'bg-brand-accentOrange',
    'bg-brand-accentRed',
    'animate-float',
    'animate-float-delayed',
    'animate-glow-pulse',
    'hover:bg-primary-700',
    'focus:ring-primary-500',
    'bg-gray-200',
    'text-gray-900',
    'hover:bg-gray-300',
    'focus:ring-gray-500',
    'bg-gray-50',
    'border-gray-300',
    'text-gray-600',
  ],
})