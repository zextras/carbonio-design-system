import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
        '@storybook/addon-webpack5-compiler-babel',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/test',
    ],
	framework: {
		name: '@storybook/react-webpack5',
		options: {}
	},
	typescript: {
		// see https://github.com/storybookjs/storybook/issues/26586
		check: false,
		skipCompiler: false,
		reactDocgen: 'react-docgen-typescript'
	}
};
export default config;
