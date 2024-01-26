import type { Config } from 'tailwindcss';

const config = {
    darkMode: ['class'],
    content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
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
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
        },
        fontFamily: {
            pretendard: ['var(--font-pretendard), -apple-system'],
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            white: '#ffffff',
            gray: {
                100: '#F8F8FB',
                200: '#DFE2EA',
                300: '#A6AAB4',
                400: '#8E939E',
                500: '#707683',
                600: '#4B4F58',
            },
            contentPrimaryLight: '#17171B',
            backgroundSecondaryLight: '#F7F8F9',
        },
        fontSize: {
            bold24: [
                '24px',
                {
                    lineHeight: '1.5',
                    fontWeight: '700',
                },
            ],
            semibold24: [
                '24px',
                {
                    lineHeight: '1.5',
                    fontWeight: '600',
                },
            ],
            bold18: [
                '18px',
                {
                    lineHeight: '1.5',
                    fontWeight: '700',
                },
            ],
            semibold18: [
                '18px',
                {
                    lineHeight: '1.5',
                    fontWeight: '600',
                },
            ],
            regular18: [
                '18px',
                {
                    lineHeight: '1.5',
                    fontWeight: '400',
                },
            ],
            bold16: [
                '16px',
                {
                    lineHeight: '1.5',
                    fontWeight: '700',
                },
            ],
            semibold16: [
                '16px',
                {
                    lineHeight: '1.5',
                    fontWeight: '600',
                },
            ],
            regular16: [
                '16px',
                {
                    lineHeight: '1.5',
                    fontWeight: '400',
                },
            ],
            bold14: [
                '14px',
                {
                    lineHeight: '1.5',
                    fontWeight: '700',
                },
            ],
            semibold14: [
                '14px',
                {
                    lineHeight: '1.5',
                    fontWeight: '600',
                },
            ],
            regular14: [
                '14px',
                {
                    lineHeight: '1.5',
                    fontWeight: '400',
                },
            ],
            semibold10: [
                '10px',
                {
                    lineHeight: '1.5',
                    fontWeight: '600',
                },
            ],
            regular10: [
                '10px',
                {
                    lineHeight: '1.5',
                    fontWeight: '400',
                },
            ],
        },
    },
    plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
