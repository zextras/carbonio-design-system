/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { darken, desaturate, lighten, setLightness } from 'polished';
import { useContext } from 'react';
import { css, FlattenSimpleInterpolation } from 'styled-components';
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

type PaddingString = `${string | keyof ThemeObj['sizes']['padding']}`;
type PaddingStringComposition =
	| PaddingString // all
	| `${PaddingString} | ${PaddingString}` // vertical horizontal
	| `${PaddingString} ${PaddingString} ${PaddingString}` // top horizontal bottom
	| `${PaddingString} ${PaddingString} ${PaddingString} ${PaddingString}`; // top right bottom left
/**
 * Given a string for the css padding, where there are both css dimensions and theme tokens,
 * it replaces theme tokens with the theme value
 * @param size
 * @param theme
 */
const simpleParsePadding = (size: PaddingStringComposition, theme: ThemeObj): string => {
	const explodedSizes = size.split(' ');
	explodedSizes.forEach((padding, index) => {
		explodedSizes[index] =
			(isThemeSize(padding, theme.sizes.padding) && theme.sizes.padding[padding]) || padding;
	});
	return explodedSizes.join(' ');
};

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
	{
		[K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
	}[Keys];

type PaddingObj =
	| {
			value: string | keyof ThemeObj['sizes']['padding'] | 0;
	  }
	| {
			all: string | keyof ThemeObj['sizes']['padding'] | 0;
	  }
	| RequireAtLeastOne<{
			vertical: string | keyof ThemeObj['sizes']['padding'] | 0;
			horizontal: string | keyof ThemeObj['sizes']['padding'] | 0;
	  }>
	| RequireAtLeastOne<{
			top: string | keyof ThemeObj['sizes']['padding'] | 0;
			right: string | keyof ThemeObj['sizes']['padding'] | 0;
			bottom: string | keyof ThemeObj['sizes']['padding'] | 0;
			left: string | keyof ThemeObj['sizes']['padding'] | 0;
	  }>;

function getPadding(
	padding: PaddingStringComposition | PaddingObj
): (args: { theme: ThemeObj }) => string;
function getPadding(padding: PaddingStringComposition | PaddingObj, theme: ThemeObj): string;
function getPadding(
	padding: PaddingStringComposition | PaddingObj,
	theme?: ThemeObj
): string | ((args: { theme: ThemeObj }) => string);
function getPadding(
	padding: PaddingStringComposition | PaddingObj,
	theme?: ThemeObj
): string | ((args: { theme: ThemeObj }) => string) {
	if (typeof padding === 'string') {
		if (!theme) return ({ theme: iTheme }): string => simpleParsePadding(padding, iTheme);
		return simpleParsePadding(padding, theme);
	}
	if ('value' in padding && padding.value) {
		return getPadding(padding.value, theme);
	}
	if ('all' in padding && padding.all) {
		return getPadding(padding.all, theme);
	}
	const p = ['0', '0', '0', '0'];
	if ('vertical' in padding && padding.vertical) {
		p[0] = padding.vertical;
		p[2] = padding.vertical;
	}
	if ('horizontal' in padding && padding.horizontal) {
		p[1] = padding.horizontal;
		p[3] = padding.horizontal;
	}
	if ('top' in padding && padding.top) {
		p[0] = padding.top;
	}
	if ('right' in padding && padding.right) {
		p[1] = padding.right;
	}
	if ('bottom' in padding && padding.bottom) {
		p[2] = padding.bottom;
	}
	if ('left' in padding && padding.left) {
		p[3] = padding.left;
	}
	return getPadding(p.join(' '), theme);
}

function pseudoClasses(
	theme: ThemeObj,
	color: string | keyof ThemeObj['palette'],
	cssProperty = 'background'
): FlattenSimpleInterpolation {
	return css`
		transition: background 0.2s ease-out;
		${cssProperty}: ${getColor(color, theme)};
		&:focus {
			outline: none;
			${cssProperty}: ${getColor(`${color}.focus`, theme)};
		}
		&:hover {
			outline: none;
			${cssProperty}: ${getColor(`${color}.hover`, theme)};
		}
		&:active {
			outline: none;
			${cssProperty}: ${getColor(`${color}.active`, theme)};
		}
		&:disabled {
			outline: none;
			${cssProperty}: ${getColor(`${color}.disabled`, theme)};
		}
	`;
}

const useTheme = (): ThemeObj => useContext(ThemeContext);

export {
	generateColorSet,
	getColor,
	getPadding,
	getPadding as parsePadding,
	useTheme,
	PaddingObj,
	pseudoClasses
};
