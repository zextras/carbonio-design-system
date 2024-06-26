/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useMemo, forwardRef, HTMLAttributes } from 'react';

import styled, { DefaultTheme } from 'styled-components';

import { Icon } from './icon/Icon';
import { getColor, useTheme } from '../../theme/theme-utils';
import { AnyColor } from '../../types/utils';
import { Tooltip } from '../display/Tooltip';

type CompProps = {
	$backgroundColor: AnyColor;
	$color: AnyColor;
	$padding: string;
	$isBadgeCircle: boolean;
};

const Comp = styled.span<CompProps>`
	vertical-align: middle;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-width: ${({ $isBadgeCircle }): string => ($isBadgeCircle ? 'auto' : '2em')};
	padding: ${({ $isBadgeCircle, $padding }): string => ($isBadgeCircle ? 'auto' : $padding)};
	height: ${({ theme, $isBadgeCircle }): string =>
		$isBadgeCircle
			? `calc(2 * ${theme.sizes.padding.extrasmall} + ${theme.sizes.font.small})`
			: 'auto'};
	width: ${({ theme, $isBadgeCircle }): string =>
		$isBadgeCircle
			? `calc(2 * ${theme.sizes.padding.extrasmall} + ${theme.sizes.font.small})`
			: 'auto'};
	font-family: ${(props): string => props.theme.fonts.default};
	font-size: ${(props): string => props.theme.sizes.font.extrasmall};
	font-weight: ${(props): number => props.theme.fonts.weight.regular};
	background-color: ${({ theme, $backgroundColor }): string => getColor($backgroundColor, theme)};
	color: ${({ theme, $color }): string => getColor($color, theme)};
	border-radius: 1.2em;
	text-align: center;
`;

const isNumber = (value?: string | number): value is number => typeof value === 'number';

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function BadgeFn(
	{
		type,
		value,
		backgroundColor = (type === 'read' && 'gray2') || (type === 'unread' && 'primary') || 'gray2',
		icon,
		maxValue = 999,
		color = (type === 'read' && 'gray0') || (type === 'unread' && 'gray6') || 'gray0',
		...rest
	},
	ref
) {
	const theme = useTheme();
	const badgeText = useMemo(
		() => (isNumber(value) && value > maxValue ? `${maxValue}+` : value),
		[maxValue, value]
	);
	const showTooltip = useMemo(() => isNumber(value) && value > maxValue, [maxValue, value]);

	const isValueEmpty = useMemo(
		(): boolean => value === undefined || (typeof value === 'string' && value.trim() === ''),
		[value]
	);

	const padding = useMemo(
		() =>
			isNumber(value)
				? theme.sizes.padding.extrasmall
				: `${theme.sizes.padding.extrasmall} ${theme.sizes.padding.small}`,
		[theme.sizes.padding.extrasmall, theme.sizes.padding.small, value]
	);

	const isBadgeCircle = useMemo((): boolean => isValueEmpty || !!icon, [icon, isValueEmpty]);

	return (
		<Tooltip label={String(value)} disabled={!showTooltip}>
			<Comp
				ref={ref}
				$backgroundColor={backgroundColor}
				$color={color}
				$padding={padding}
				$isBadgeCircle={isBadgeCircle}
				{...rest}
			>
				{icon ? <Icon icon={icon} size={'medium'} color={color} /> : badgeText}
			</Comp>
		</Tooltip>
	);
});

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
	/** @deprecated Badge type */
	type?: 'read' | 'unread';
	/** Badge text */
	value?: string | number;
	/** Badge background color */
	backgroundColor?: AnyColor;
	/** Icon */
	icon?: keyof DefaultTheme['icons'];
	/** Max value */
	maxValue?: number;
	/** Badge or Icon color */
	color?: AnyColor;
}

export { Badge, BadgeProps };
