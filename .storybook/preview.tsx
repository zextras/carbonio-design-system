import React from 'react'

import { ThemeProvider } from '../src';
import { StoryFn, Preview } from '@storybook/react';
import { withDarkreader } from "./addons/darkreader/with-darkreader";

export const decorators = [
	(Story: StoryFn) => (
		<ThemeProvider>
			<Story />
		</ThemeProvider>
	),
	withDarkreader
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
	}
} satisfies Preview;

export default preview;
