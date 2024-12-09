/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
module.exports = {
	extends: [
		'./node_modules/@zextras/carbonio-ui-configs/rules/eslint.js',
		'plugin:storybook/recommended'
	],
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.d.ts', '.ts', '.tsx']
			}
		}
	},
	parserOptions: {
		project: true,
		tsconfigRootDir: __dirname,
	},
	plugins: ['notice'],
	rules: {
		'notice/notice': [
			'error',
			{
				templateFile: '.reuse/template.js'
			}
		],
		'sonarjs/cognitive-complexity': 'warn',
		'sonarjs/no-duplicate-string': 'off',
		'import/no-duplicates': ['error', { considerQueryString: true }],
		'@typescript-eslint/consistent-type-exports': 'error',
		'@typescript-eslint/consistent-type-imports': 'error'
	},
	overrides: [
		{
			files: ['src/icons/**/*.[jt]sx'],
			rules: {
				'notice/notice': 0
			}
		},
		{
			files: ['**/test*.[jt]s?(x)', '**/jest*.[jt]s?(x)'],
			extends: ['plugin:jest-dom/recommended', 'plugin:testing-library/react'],
			rules: {
				'testing-library/no-unnecessary-act': 'warn',
				'testing-library/no-global-regexp-flag-in-query': 'error',
				'testing-library/prefer-user-event': 'warn',
				'import/no-extraneous-dependencies': 'off'
			}
		},
		{
			files: ['*.stories.*', "docs/**/*", ".storybook/**/*"],
			rules: {
				'import/no-extraneous-dependencies': 'off'
			}
		}
	],
	ignorePatterns: ['**/tsTemplate.[jt]s']
};
