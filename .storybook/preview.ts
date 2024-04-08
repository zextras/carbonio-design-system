import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { ThemeProvider } from '../src';
import { Preview } from '@storybook/react'

export const decorators = [
	withThemeFromJSXProvider({
		Provider: ThemeProvider
	})
];

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on.*' },
	},
};

export default preview;
