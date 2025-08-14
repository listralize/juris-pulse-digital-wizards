import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				neutral: {
					100: '#FFFFFF',
					200: '#F6F6F6',
					300: '#E8E8E8',
					400: '#DADADA',
					500: '#ACACAC',
					600: '#8E8E8E',
					700: '#5C5C5C',
					800: '#2F2F2F',
					900: '#1E1E1E',
					950: '#0A0A0A',
				}
			},
			fontFamily: {
				'editorial': ['Editorial New', 'serif'], 
				'canela': ['Canela', 'serif'],
				'satoshi': ['Satoshi', 'sans-serif'],
				'inter': ['Inter', 'sans-serif'],
				'space-grotesk': ['Space Grotesk', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'stretch': {
					'0%': { transform: 'scaleY(0.95)', opacity: '0' },
					'100%': { transform: 'scaleY(1)', opacity: '1' }
				},
				'slide-right': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-left': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'pulse-subtle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.9' }
				},
				'scale-in-out': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.02)' }
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out forwards',
				'fade-up': 'fade-up 0.6s ease-out forwards',
				'stretch': 'stretch 0.6s ease-out forwards',
				'slide-right': 'slide-right 0.6s ease-out forwards',
				'slide-left': 'slide-left 0.6s ease-out forwards',
				'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
				'scale-in-out': 'scale-in-out 4s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
	corePlugins: {
		preflight: true,
	},
	safelist: [
		{
			pattern: /no-scrollbar/,
		},
		// Ensure funnel gradient and width classes are not purged
		'bg-gradient-to-r',
		'from-blue-500','to-blue-600',
		'from-green-500','to-green-600',
		'from-amber-500','to-amber-600',
		'from-purple-500','to-purple-600',
		'from-red-500','to-red-600',
		'w-4/5','w-3/5','w-2/5'
	],
} satisfies Config;
