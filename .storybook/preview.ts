import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { ThemeProvider } from '../src';
import {themes} from "@storybook/theming";

export const decorators = [
	withThemeFromJSXProvider({
		Provider: ThemeProvider,
		themes: {
			darkMode: {
				dark: { ...themes.dark },
				light: { ...themes.normal }
			}
		}
	})
];
