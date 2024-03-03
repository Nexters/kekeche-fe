import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-onboarding',
        '@storybook/addon-interactions',
    ],
    framework: {
        name: '@storybook/nextjs',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
    webpackFinal: async (config: any) => {
        if (!config.module || !config.module.rules) {
            return config;
        }

        config.module.rules = [
            ...config.module.rules.map((rule) => {
                if (!rule || rule === '...') {
                    return rule;
                }

                if (rule.test && /svg/.test(String(rule.test))) {
                    return { ...rule, exclude: /\.svg$/i };
                }
                return rule;
            }),
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
        ];
        config.resolve.alias['@'] = path.resolve(__dirname, '../src/');
        return config;
    },
};
export default config;
