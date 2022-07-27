/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const propsParser = require('react-docgen-typescript');

module.exports = {
	propsParser: propsParser.withCustomConfig('./tsconfig.json', {
		shouldExtractLiteralValuesFromEnum: true,
		shouldRemoveUndefinedFromOptional: true,
		propFilter: (prop, component) => {
			if (prop.declarations !== undefined && prop.declarations.length > 0) {
				return prop.declarations.find(
					(declaration) => !declaration.fileName.includes('node_modules')
				);
			}

			return true;
		}
	}).parse,
	assetsDir: ['docs/asset'],
	styleguideComponents: {
		Wrapper: path.resolve('./lib/styleguide/Wrapper'),
		Logo: path.resolve('./lib/styleguide/Logo')
	},
	sections: [
		{
			name: 'Getting Started',
			content: 'docs/getting-started.md'
		},
		{
			name: 'Changelog',
			content: 'CHANGELOG.md'
		},
		{
			name: 'Documentation',
			sections: [
				{
					name: 'Default Theme',
					content: 'docs/default-theme.md'
				},
				{
					name: 'Icons',
					content: 'docs/icons.md'
				},
				{
					name: 'Theming',
					content: 'docs/theming.md'
				}
			],
			sectionDepth: 2
		},
		{
			name: 'Components',
			sections: [
				{
					name: 'Basic',
					components: 'src/components/basic/**/*.[j|t]sx',
					exampleMode: 'collapse', // 'hide' | 'collapse' | 'expand'
					usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
				},
				{
					name: 'Layout',
					components: 'src/components/layout/**/*.[j|t]sx',
					exampleMode: 'collapse',
					usageMode: 'expand'
				},
				{
					name: 'Inputs',
					components: 'src/components/inputs/**/*.[j|t]sx',
					exampleMode: 'collapse',
					usageMode: 'expand'
				},
				{
					name: 'Navigation',
					components: 'src/components/navigation/**/*.[j|t]sx',
					exampleMode: 'collapse',
					usageMode: 'expand'
				},
				{
					name: 'Data display',
					components: 'src/components/display/**/*.[j|t]sx',
					exampleMode: 'collapse',
					usageMode: 'expand'
				},
				{
					name: 'Feedback',
					components: 'src/components/feedback/**/*.[j|t]sx',
					exampleMode: 'collapse',
					usageMode: 'expand'
				},
				{
					name: 'Utilities',
					components: 'src/components/utilities/**/*.[j|t]sx',
					exampleMode: 'collapse',
					usageMode: 'expand'
				}
			],
			sectionDepth: 2
		},
		{
			name: 'Playground',
			content: 'docs/playground.md',
			exampleMode: 'expand'
		}
	],
	pagePerSection: true,
	theme: {
		color: {}
	}
};
