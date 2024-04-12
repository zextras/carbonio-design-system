import { ThemeProvider } from '../src';
import React from 'react'
import { StoryFn } from '@storybook/react';

export const decorators = [
	(Story: StoryFn) => (
		<ThemeProvider>
			<Story />
		</ThemeProvider>
	),
];
