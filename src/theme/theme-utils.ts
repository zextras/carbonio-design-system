/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { darken, desaturate, lighten, setLightness } from 'polished';
import { useContext } from 'react';
import { parsePadding } from '../components/utilities/functions';
import { ThemeObj, ThemeColorObj, ThemeSizeObj } from './theme';
import { ThemeContext } from './theme-context-provider';

type ColorSet = Record<'light' | 'dark', Record<keyof ThemeColorObj, (color: string) => string>>;
type ThemePaletteObj = ThemeObj['palette'];
type ThemePaletteColorKey = keyof ThemePaletteObj;

function isThemeVariant(
	variant: string,
	theme: ThemeObj,
	color: ThemePaletteColorKey = 'primary'
): variant is keyof ThemeColorObj {
	return variant in theme.palette[color];
}

export function isThemeColor(color: string, theme: ThemeObj): color is ThemePaletteColorKey {
	return color in theme.palette;
}

export function isThemeSize(size: string, sizeObj: ThemeSizeObj): size is keyof ThemeSizeObj {
	return size in sizeObj;
}

const colorsSet: ColorSet = {
	light: {
		regular: (color) => color,
		hover: (color) => darken(0.1, color),
		focus: (color) => darken(0.1, color),
		active: (color) => darken(0.15, color),
		disabled: (color) => desaturate(0.3, darken(0.3, color))
	},
	dark: {
		regular: (color) => color,
		hover: (color) => lighten(0.1, color),
		focus: (color) => lighten(0.1, color),
		active: (color) => lighten(0.15, color),
		disabled: (color) => setLightness(0.8, color)
	}
};

const getVariantColor = (color: string, variant: keyof ThemeColorObj, dark = false): string =>
	colorsSet[dark ? 'dark' : 'light'][variant] && colorsSet[dark ? 'dark' : 'light'][variant](color);

const generateColorSet = (
	{
		regular,
		hover,
		active,
		disabled,
		focus
	}: Pick<ThemeColorObj, 'regular'> & Partial<Omit<ThemeColorObj, 'regular'>>,
	dark = false
): ThemeColorObj => ({
	regular,
	hover: hover ?? colorsSet[dark ? 'dark' : 'light'].hover(regular),
	focus: focus ?? colorsSet[dark ? 'dark' : 'light'].focus(regular),
	active: active ?? colorsSet[dark ? 'dark' : 'light'].active(regular),
	disabled: disabled ?? colorsSet[dark ? 'dark' : 'light'].disabled(regular)
});

/**
 * Retrieve the color from the colorSet
 * @param color {string} - in the form color[.variant]
 * <ul>
 *  <li>Color can be a palette key or any css compliant color.</li>
 *  <li>Variant (optional) has to be one of the set</li>
 * </ul>
 * @param theme {Theme} - the theme object used to retrieve the palette colors
 * @returns {string} - the css color of the palette or the one generated with the colorSet
 */
function getColorValue(color: string, theme: ThemeObj): string {
	const variants = Object.keys(colorsSet.light);
	const splitRegexp = RegExp(`.(${variants.join('|')})`, 'g');
	const [iColor, iVariant = 'regular'] = color.split(splitRegexp);
	return (
		(isThemeColor(iColor, theme) &&
			isThemeVariant(iVariant, theme, iColor) &&
			theme.palette[iColor][iVariant]) ||
		(isThemeVariant(iVariant, theme) && getVariantColor(iColor, iVariant)) ||
		iColor
	);
}

/**
 * Create a function to retrieve the color of the given name based on the theme palette if the name is a palette key,
 * generating a set with the colorSet utility if the color is not a palette key.
 * Useful for calling inside styledComponents in a short mode
 * @param {string} color It can contain also the variant in the form color[.variant]
 * @example
 * getColor('primary.disabled');
 *
 * // from styled components
 * const StyledComponent = styled.div`
 * 		background-color: ${getColor('secondary')}
 * `
 * @returns {({theme?: Theme}) => string} a function that, given the theme, returns the wanted color
 */
function getColor(color: string): (args: { theme: ThemeObj }) => string;
/**
 * Retrieve the color of the given name based on the theme palette if the name is a palette key,
 * generating a set with the colorSet utility if the color is not a palette key
 * @param {string} color - It can contain also the variant in the form color[.variant]
 * @param {ThemeObj} theme - The theme object
 * @example
 * const theme = useTheme();
 * getColor('gray5', theme);
 *
 * // from styled components
 * const StyledComponent = styled.div`
 * 		background-color: ${({ theme }) => getColor('secondary', theme)}
 * `
 * @returns {string} The wanted color
 */
function getColor(color: string, theme: ThemeObj): string;
// see overloads for documentation
function getColor(
	color: string,
	theme?: ThemeObj
): string | ((args: { theme: ThemeObj }) => string) {
	if (!color) return color;
	if (!theme) return ({ theme: iTheme }): string => getColorValue(color, iTheme);
	return getColorValue(color, theme);
}

const simpleParsePadding = (size: string, theme: ThemeObj): string => {
	const explodedSizes = size.split(' ');
	explodedSizes.forEach((padding, index) => {
		explodedSizes[index] =
			(isThemeSize(padding, theme.sizes.padding) && theme.sizes.padding[padding]) || padding;
	});
	return explodedSizes.join(' ');
};
const getPadding = (
	size: string,
	theme?: ThemeObj
): string | ((args: { theme: ThemeObj }) => string) => {
	if (!theme) return ({ theme: iTheme }): string => simpleParsePadding(size, iTheme);
	return simpleParsePadding(size, theme);
};

const getParsedPadding =
	(size: string) =>
	({ theme }: { theme: ThemeObj }): string | ((args: { theme: ThemeObj }) => string) =>
		parsePadding(size, theme);

const useTheme = (): ThemeObj => useContext(ThemeContext);

export { generateColorSet, getColor, getPadding, getParsedPadding, useTheme };
