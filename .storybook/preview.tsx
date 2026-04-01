/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import type { StoryFn, Preview } from '@storybook/react-webpack5';
import { generateAutocompletion } from 'storybook-addon-playground';

import { DarkReaderDocsContainer } from './addons/darkreader/DarkReaderDocsContainer';
import docgenOutput from './docgen-output.json';
import * as Utils from '../src';
import { ThemeProvider } from '../src';
import { jsx, css } from '../src/playground/playground-helper';

export const decorators = [
	(Story: StoryFn): React.JSX.Element => (
		<ThemeProvider>
			<Story />
		</ThemeProvider>
	)
];

const preview = {
	initialGlobals: {
		isDarkModeEnabled: false
	},
	parameters: {
		options: {
			storySort: {
				order: ['Getting started', 'Theme', 'Components', 'Hooks']
			}
		},
		docs: {
			container: DarkReaderDocsContainer,
			source: {
				language: 'tsx',
				type: 'dynamic'
			},
			codePanel: true
		},
		playground: {
			storyId: 'playground',
			components: { ...Utils },
			autocompletions: generateAutocompletion(docgenOutput),
			introCode: { jsx, css },
			share: true
		}
	}
} satisfies Preview;

export default preview;
