/*
 * Copyright (C) 2011-2021 Zextras
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useContext } from 'react';
import { darken, desaturate, lighten, setLightness } from 'polished';
import { ThemeContext } from './theme-context-provider';
import { parsePadding } from '../components/utilities/functions';

const colorsSet = {
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

export const getVariantColor = (color, variant, dark = false) =>
	colorsSet[dark ? 'dark' : 'light'][variant] && colorsSet[dark ? 'dark' : 'light'][variant](color);

export const generateColorSet = ({ regular, hover, active, disabled, focus }, dark = false) => ({
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
function getColorValue(color, theme) {
	const variants = Object.keys(colorsSet.light);
	const splitRegexp = RegExp(`.(${variants.join('|')})`, 'g');
	const [iColor, iVariant = 'regular'] = color.split(splitRegexp);
	return (
		(theme.palette[iColor] && theme.palette[iColor][iVariant]) ||
		getVariantColor(iColor, iVariant) ||
		iColor
	);
}

/**
 * Retrieve the color of the given name based on the theme palette if the name is a palette key,
 * generating a set with the colorSet utility if the color is not a palette key
 * @param color {string} - It can contain also the variant in the form color[.variant]
 * @param theme {Theme} - The theme object. If not defined, this function return a function that accept
 * as param an object with the theme key. Useful for calling inside styledComponents in a short mode
 * @example
 * const theme = useTheme();
 * getColor('gray5', theme);
 * getColor('primary.disabled);
 *
 * // from styled components
 * const StyledComponent = styled.div`
 * 		background-color: ${getColor('secondary')}
 * `
 * // or
 * const StyledComponent = styled.div`
 * 		background-color: ${({ theme }) => getColor('secondary', theme)}
 * `
 * @returns {(function({theme?: Theme}): string)|string}
 */
export const getColor = (color, theme) => {
	if (!color) return color;
	if (!theme) return ({ theme: iTheme }) => getColorValue(color, iTheme);
	return getColorValue(color, theme);
};

const simpleParsePadding = (size, theme) => {
	const explodedSizes = size.split(' ');
	explodedSizes.forEach((padding, index) => {
		explodedSizes[index] = theme.sizes.padding[padding] || padding;
	});
	return explodedSizes.join(' ');
};
export const getPadding = (size, theme) => {
	if (!theme) return ({ theme: iTheme }) => simpleParsePadding(size, iTheme);
	return simpleParsePadding(size, theme);
};
export const getParsedPadding =
	(size) =>
	({ theme }) =>
		parsePadding(size, theme);

export const useTheme = () => {
	const theme = useContext(ThemeContext);
	return theme;
};

export default ThemeContext;
