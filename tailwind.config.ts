import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		keyframes: {
			'fade-in': {
				'0%': { opacity: '0', transform: 'translateY(10px)' },
				'100%': { opacity: '1', transform: 'translateY(0)' }
			},
			'fade-in-up': {
				'0%': { opacity: '0', transform: 'translateY(30px)' },
				'100%': { opacity: '1', transform: 'translateY(0)' }
			},
			'fade-in-down': {
				'0%': { opacity: '0', transform: 'translateY(-20px)' },
				'100%': { opacity: '1', transform: 'translateY(0)' }
			},
			'fade-in-left': {
				'0%': { opacity: '0', transform: 'translateX(-30px)' },
				'100%': { opacity: '1', transform: 'translateX(0)' }
			},
			'fade-in-right': {
				'0%': { opacity: '0', transform: 'translateX(30px)' },
				'100%': { opacity: '1', transform: 'translateX(0)' }
			},
			'scale-in': {
				'0%': { transform: 'scale(0.9)', opacity: '0' },
				'100%': { transform: 'scale(1)', opacity: '1' }
			},
			'slide-up': {
				'0%': { transform: 'translateY(100%)', opacity: '0' },
				'100%': { transform: 'translateY(0)', opacity: '1' }
			},
			'float': {
				'0%, 100%': { transform: 'translateY(0)' },
				'50%': { transform: 'translateY(-10px)' }
			},
			'pulse-glow': {
				'0%, 100%': { opacity: '1', boxShadow: '0 0 20px hsl(var(--accent) / 0.3)' },
				'50%': { opacity: '0.8', boxShadow: '0 0 40px hsl(var(--accent) / 0.5)' }
			},
			'shimmer': {
				'0%': { backgroundPosition: '-200% 0' },
				'100%': { backgroundPosition: '200% 0' }
			},
			'progress': {
				'0%': { width: '0%' },
				'100%': { width: 'var(--progress-width)' }
			},
			'bounce-subtle': {
				'0%, 100%': { transform: 'translateY(0)' },
				'50%': { transform: 'translateY(-5px)' }
			}
		},
		animation: {
			'fade-in': 'fade-in 0.5s ease-out forwards',
			'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
			'fade-in-down': 'fade-in-down 0.5s ease-out forwards',
			'fade-in-left': 'fade-in-left 0.6s ease-out forwards',
			'fade-in-right': 'fade-in-right 0.6s ease-out forwards',
			'scale-in': 'scale-in 0.4s ease-out forwards',
			'slide-up': 'slide-up 0.5s ease-out forwards',
			'float': 'float 3s ease-in-out infinite',
			'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
			'shimmer': 'shimmer 2s linear infinite',
			'progress': 'progress 1s ease-out forwards',
			'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite'
		},
  		boxShadow: {
  			'2xs': 'var(--shadow-2xs)',
  			xs: 'var(--shadow-xs)',
  			sm: 'var(--shadow-sm)',
  			md: 'var(--shadow-md)',
  			lg: 'var(--shadow-lg)',
  			xl: 'var(--shadow-xl)',
  			'2xl': 'var(--shadow-2xl)'
  		},
  		fontFamily: {
  			sans: ['Montserrat', 'sans-serif'],
  			serif: ['Ferro Rosso', 'serif'],
  			display: ['Ferro Rosso', 'sans-serif'],
  			mono: ['Fira Code', 'JetBrains Mono', 'monospace']
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
