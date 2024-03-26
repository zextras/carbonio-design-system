import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { ThemeProvider } from '../src';

export const decorators = [
	withThemeFromJSXProvider({
		Provider: ThemeProvider
	})
];
