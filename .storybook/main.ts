import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)', '../docs/**/*.mdx'],
	staticDirs: ['../docs/assets'],
	addons: [
		'@storybook/addon-webpack5-compiler-babel',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/test',
		'@storybook/addon-designs',
		'./addons/darkreader/register'
	],
	framework: {
		name: '@storybook/react-webpack5',
		options: {}
	},
	typescript: {
		reactDocgen: 'react-docgen-typescript',
		reactDocgenTypescriptOptions: {
			// Makes string and boolean types that can be undefined appear as inputs and switches
			shouldRemoveUndefinedFromOptional: true,
			// Filter out third-party props from node_modules except react-datepicker package
			propFilter: (prop) =>
				prop.parent ? !/node_modules\/(?!react-datepicker)/.test(prop.parent.fileName) : true,
		},
	},
	webpackFinal: async (config) => {
		return {
			...config,
			module: {
				...(config.module ?? {}),
				rules: [
					// override webpack module.rules config so that all imports marked with ?raw will not be parsed by loaders
					// see https://webpack.js.org/guides/asset-modules/#replacing-inline-loader-syntax
					...((config.module?.rules ?? []).map((rule) => ({
						oneOf: [
							{
								resourceQuery: /raw/,
								type: 'asset/source'
							},
							typeof rule !== 'string' ? rule : {}
						]
					})))
				]
			}
		};
	}
};
export default config;
