import { ThemeObj } from './theme/theme';

declare module 'styled-components' {
	// Augment DefaultTheme as suggested inside styled-components module
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface DefaultTheme extends ThemeObj {}
}
