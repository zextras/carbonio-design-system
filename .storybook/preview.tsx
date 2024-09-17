import React from 'react'

import { ThemeProvider } from '../src';
import { StoryFn, Preview } from '@storybook/react';

export const decorators = [
	(Story: StoryFn) => (
		<ThemeProvider>
			<Story />
		</ThemeProvider>
	),
];

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on.*' },
		options: {
			storySort: {
				order: ['Getting started', 'Theme', 'Components', 'Hooks'],
			},
		},
	},
};

export default preview;
