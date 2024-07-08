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
import { Container } from '../layout/Container';

type CompProps = {
	$color: AnyColor;
};

const Comp = styled(Container)<CompProps>`
	color: ${({ theme, $color }): string => getColor($color, theme)};
	vertical-align: middle;
	display: inline-flex;
	font-family: ${(props): string => props.theme.fonts.default};
	font-size: ${(props): string => props.theme.sizes.font.extrasmall};
	font-weight: ${(props): number => props.theme.fonts.weight.regular};
	border-radius: 3.125em;
	text-align: center;
`;

const isNumber = (value?: string | number): value is number => typeof value === 'number';

const Badge = forwardRef<HTMLDivElement, BadgeProps>(function BadgeFn(
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

	const isBadgeCircle = useMemo((): boolean => isValueEmpty || !!icon, [icon, isValueEmpty]);

	return (
		<Tooltip label={String(value)} disabled={!showTooltip}>
			<Comp
				ref={ref}
				orientation={'column'}
				padding={{ vertical: '4px', horizontal: '8px' }}
				height={isBadgeCircle ? '1rem' : '20px'}
				width={isBadgeCircle ? '1rem' : 'auto'}
				background={getColor(backgroundColor, theme)}
				$color={color}
				{...rest}
			>
				{icon ? <Icon icon={icon} color={color} /> : badgeText}
			</Comp>
		</Tooltip>
	);
});

interface BadgeComponentProps {
	/**
	 * Badge type
	 * @deprecated use backgroundColor and color instead
	 * */
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

type BadgeProps = BadgeComponentProps &
	Omit<HTMLAttributes<HTMLSpanElement>, keyof BadgeComponentProps>;

export { Badge, BadgeProps };
