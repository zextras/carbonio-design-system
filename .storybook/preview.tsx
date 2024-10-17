import React from 'react'

import { ThemeProvider } from '../src';
import { StoryFn, Preview } from '@storybook/react';
import { DarkReaderDocsContainer } from "./addons/darkreader/DarkReaderDocsContainer";

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
		}
	}
} satisfies Preview;

export default preview;
