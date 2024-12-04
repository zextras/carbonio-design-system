import React from 'react'

import * as Utils from '../src'
import { ThemeProvider } from '../src';
import { StoryFn, Preview } from '@storybook/react';
import { DarkReaderDocsContainer } from "./addons/darkreader/DarkReaderDocsContainer";
import { jsx, css } from '../src/playground/playground-helper';
import { generateAutocompletion } from "storybook-addon-playground";
import docgenOutput from './docgen-output.json'

export const decorators = [
	(Story: StoryFn) => (
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
		actions: { argTypesRegex: '^on.*' },
		options: {
			storySort: {
				order: ['Getting started', 'Theme', 'Components', 'Hooks'],
			},
		},
		docs: {
			container: DarkReaderDocsContainer,
			source: {
				language: 'tsx'
			}
		},
		playground: {
			storyId: "playground",
			components: {...Utils},
			autocompletions: generateAutocompletion(docgenOutput),
			introCode: { jsx, css },
			share: true,
		},
	}
} satisfies Preview;

export default preview;
