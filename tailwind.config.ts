import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
const config = {
    darkMode: ['class'],
    content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
    prefix: '',
    theme: {
        screens: {
            lg: '490px',
        },
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
            black: '#17171B',
            transparent: 'transparent',
            current: 'currentColor',
            white: '#ffffff',
            gray: {
                100: '#F8F8FB',
                150: '#ECEFF5',
                200: '#DFE2EA',
                300: '#A6AAB4',
                400: '#8E939E',
                500: '#707683',
                600: '#4B4F58',
            },
            newGray: {
                100: '#F6F8FC',
                200: '#ECEFF5',
                300: '#DFE2EA',
                400: '#C6CBD8',
                500: '#AEB5C5',
                600: '#8B92A0',
                700: '#707683',
                800: '#5B616E',
                900: '#494E59',
            },
            red: {
                500: '#EA2727',
            },
            orange: {
                100: '#FF7864',
            },
            green: {
                100: '#8DDC27',
            },
            violet: {
                100: '#757EF7',
            },
            newPurple: {
                100: '#BF6DFF',
            },
            pink: {
                100: '#EC6BDF',
            },
            primary: {
                100: '#E0ECFF',
                500: '#2777EA',
            },
            purple: {
                100: '#C4CAF7',
                200: '#606FD8',
            },
            contentPrimaryLight: '#17171B',
            backgroundSecondaryLight: '#F7F8F9',
        },
        fontSize: {
            H1: [
                '24px',
                {
                    lineHeight: '1.5',
                    fontWeight: '700',
                },
            ],
            H2: [
                '22px',
                {
                    lineHeight: '1.5',
                    fontWeight: '700',
                },
            ],
            H3: [
                '18px',
                {
                    lineHeight: '1.5',
                    fontWeight: '600',
                },
            ],
            Subtitle1: [
                '16px',
                {
                    lineHeight: '1.5',
                    fontWeight: '600',
                },
            ],
            Subtitle2: [
                '16px',
                {
                    lineHeight: '1.5',
                    fontWeight: '400',
                },
            ],
            Body1: [
                '14px',
                {
                    lineHeight: '1.5',
                    fontWeight: '600',
                },
            ],
            Body2: [
                '14px',
                {
                    lineHeight: '1.5',
                    fontWeight: '400',
                },
            ],
            Body3: [
                '12px',
                {
                    lineHeight: '1.5',
                    fontWeight: '500',
                },
            ],
            Caption1: [
                '10px',
                {
                    lineHeight: '1.5',
                    fontWeight: '600',
                },
            ],
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
    plugins: [
        require('tailwindcss-animate'),
        plugin(function ({ addUtilities }: any) {
            addUtilities({
                '.gradation-bg': {
                    background:
                        'linear-gradient(180deg, #F6F8FC 0%, rgba(246, 248, 252, 0.00) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.20) 0%, rgba(255, 255, 255, 0.20) 100%), linear-gradient(180deg, #B8EFFF 0%, #74C4FF 100%)',
                },
            });
        }),
    ],
} satisfies Config;

export default config;
