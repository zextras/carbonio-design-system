/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useMemo, forwardRef, HTMLAttributes } from 'react';

import styled, { DefaultTheme } from 'styled-components';

import { Icon } from './icon/Icon';
import { Text } from './text/Text';
import { AnyColor } from '../../types/utils';
import { Tooltip } from '../display/Tooltip';
import { Container } from '../layout/Container';

const Comp = styled(Container)`
	vertical-align: middle;
	display: inline-flex;
	border-radius: 3.125rem;
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
				padding={isBadgeCircle ? undefined : { vertical: '0.0625rem', horizontal: 'small' }}
				height={isBadgeCircle ? '1rem' : 'auto'}
				width={isBadgeCircle ? '1rem' : 'auto'}
				background={backgroundColor}
				{...rest}
			>
				{icon ? (
					<Icon icon={icon} size={'small'} color={color} />
				) : (
					<Text color={color} size={'extrasmall'} weight={'regular'} lineHeight={1.5}>
						{badgeText}
					</Text>
				)}
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
