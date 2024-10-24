/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { reduce } from 'lodash';
import { darken, lighten, parseToHsl, setLightness, toColorString } from 'polished';
import { HslColor } from 'polished/lib/types/color';
import { css, DefaultTheme, useTheme as useThemeSC } from 'styled-components';

import type { ThemeColorObj, ThemeSizeObj } from './theme';

type ColorSet = Record<'light' | 'dark', Record<keyof ThemeColorObj, (color: string) => string>>;
type ThemePaletteObj = DefaultTheme['palette'];
type ThemePaletteColorKey = keyof ThemePaletteObj;

function isThemeVariant(
	variant: string,
	theme: DefaultTheme,
	color: ThemePaletteColorKey = 'primary'
): variant is keyof ThemeColorObj {
	return variant in theme.palette[color];
}

export function isThemeColor(color: string, theme: DefaultTheme): color is ThemePaletteColorKey {
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
		disabled: (color) => setLightness(0.8, color)
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

function calcHighlight(fromColor: string): string {
	const fromHsl = parseToHsl(fromColor);
	const highlightRegular: HslColor = {
		hue: Math.round(fromHsl.hue) + 1,
		saturation: (Math.round(fromHsl.saturation * 100) - 1) / 100,
		lightness: Math.min(Math.round(fromHsl.lightness * 100 + 40), 90) / 100
	};
	return toColorString(highlightRegular);
}
function generateHighlightSet(fromColorSet: Parameters<typeof generateColorSet>[0]): ThemeColorObj {
	const highlightPartialSet = reduce(
		fromColorSet,
		(accumulator, colorValue, colorKey) => {
			if (colorValue) {
				accumulator[colorKey as keyof typeof fromColorSet] = calcHighlight(colorValue);
			}
			return accumulator;
		},
		{} as typeof fromColorSet
	);

	return generateColorSet(highlightPartialSet);
}

/**
 * Retrieve the color from the colorSet
 * @param color - in the form color[.variant]
 * <ul>
 *  <li>Color can be a palette key or any css compliant color.</li>
 *  <li>Variant (optional) has to be one of the set</li>
 * </ul>
 * @param theme - the theme object used to retrieve the palette colors
 * @returns the css color of the palette or the one generated with the colorSet
 */
function getColorValue(color: string, theme: DefaultTheme): string {
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
 * @param color - It can contain also the variant in the form color[.variant]
 * @returns a function that, given the theme, returns the wanted color
 *
 * @example
 * ```ts
 * getColor('primary.disabled');
 *
 * // from styled components
 * const StyledComponent = styled...
 * 		background-color: ${getColor('secondary')}
 * ```
 */
function getColor(color: string): (args: { theme: DefaultTheme }) => string;
/**
 * Retrieve the color of the given name based on the theme palette if the name is a palette key,
 * generating a set with the colorSet utility if the color is not a palette key
 * @param color - It can contain also the variant in the form color[.variant]
 * @param theme - The theme object
 * @returns The wanted color
 *
 * @example
 * ```ts
 * const theme = useTheme();
 * getColor('gray5', theme);
 *
 * // from styled components
 * const StyledComponent = styled...
 * 		background-color: ${({ theme }) => getColor('secondary', theme)}
 * ```
 */
function getColor(color: string, theme: DefaultTheme): string;
// see overloads for documentation
function getColor(
	color: string,
	theme?: DefaultTheme
): string | ((args: { theme: DefaultTheme }) => string) {
	if (!color) return color;
	if (!theme) return ({ theme: iTheme }): string => getColorValue(color, iTheme);
	return getColorValue(color, theme);
}

type PaddingString = `${string | keyof DefaultTheme['sizes']['padding']}`;
type PaddingStringComposition =
	| PaddingString // all
	| `${PaddingString} | ${PaddingString}` // vertical horizontal
	| `${PaddingString} ${PaddingString} ${PaddingString}` // top horizontal bottom
	| `${PaddingString} ${PaddingString} ${PaddingString} ${PaddingString}`; // top right bottom left
/**
 * Given a string for the css padding, where there are both css dimensions and theme tokens,
 * it replaces theme tokens with the theme value
 */
const simpleParsePadding = (size: PaddingStringComposition, theme: DefaultTheme): string => {
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
			value: string | keyof DefaultTheme['sizes']['padding'] | 0;
	  }
	| {
			all: string | keyof DefaultTheme['sizes']['padding'] | 0;
	  }
	| RequireAtLeastOne<{
			vertical: string | keyof DefaultTheme['sizes']['padding'] | 0;
			horizontal: string | keyof DefaultTheme['sizes']['padding'] | 0;
	  }>
	| RequireAtLeastOne<{
			top: string | keyof DefaultTheme['sizes']['padding'] | 0;
			right: string | keyof DefaultTheme['sizes']['padding'] | 0;
			bottom: string | keyof DefaultTheme['sizes']['padding'] | 0;
			left: string | keyof DefaultTheme['sizes']['padding'] | 0;
	  }>;

function getPadding(
	padding: PaddingStringComposition | PaddingObj
): (args: { theme: DefaultTheme }) => string;
function getPadding(padding: PaddingStringComposition | PaddingObj, theme: DefaultTheme): string;
function getPadding(
	padding: PaddingStringComposition | PaddingObj,
	theme?: DefaultTheme
): string | ((args: { theme: DefaultTheme }) => string);
function getPadding(
	padding: PaddingStringComposition | PaddingObj,
	theme?: DefaultTheme
): string | ((args: { theme: DefaultTheme }) => string) {
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
	theme: DefaultTheme,
	color: string,
	cssProperty = 'background',
	options: { transition?: boolean; outline?: boolean } = {}
): ReturnType<typeof css> {
	const optionsWithDefault = { transition: true, outline: false, ...options };
	function buildPseudoRule(
		pseudoStatus: 'focus' | 'disabled' | 'active' | 'hover'
	): ReturnType<typeof css> {
		return css`
			${!optionsWithDefault.outline &&
			css`
				outline: none;
			`};
			${cssProperty}: ${getColor(`${color}.${pseudoStatus}`, theme)};
		`;
	}
	return css`
		${optionsWithDefault.transition &&
		css`
			transition: ${cssProperty} 0.2s ease-out;
		`};
		${cssProperty}: ${getColor(color, theme)};
		&:focus {
			${buildPseudoRule('focus')};
		}
		&:hover {
			${buildPseudoRule('hover')};
		}
		&:active {
			${buildPseudoRule('active')};
		}
		&:disabled {
			${buildPseudoRule('disabled')};
		}
	`;
}

const useTheme = (): DefaultTheme => useThemeSC();

export {
	generateColorSet,
	calcHighlight,
	generateHighlightSet,
	getColor,
	getPadding,
	getPadding as parsePadding,
	useTheme,
	PaddingObj,
	pseudoClasses
};
