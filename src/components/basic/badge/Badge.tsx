/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { HTMLAttributes } from 'react';
import React, { useMemo, forwardRef } from 'react';

import styled from 'styled-components';

import type { Theme } from '../../../theme/theme';
import type { AnyColor } from '../../../types/utils';
import { Tooltip } from '../../display/Tooltip';
import { Container } from '../../layout/container/Container';
import { Icon } from '../icon/Icon';
import { Text } from '../text/Text';

const Comp = styled(Container)`
	vertical-align: middle;
	display: inline-flex;
	border-radius: 3.125rem;
`;

const isNumber = (value?: string | number): value is number => typeof value === 'number';

const Badge = forwardRef<HTMLDivElement, BadgeProps>(function BadgeFn(
	{ value, backgroundColor = 'gray2', icon, maxValue = 999, color = 'gray0', ...rest },
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

interface BadgeProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
	/** Badge text */
	value?: string | number;
	/** Badge background color */
	backgroundColor?: AnyColor;
	/** Icon */
	icon?: keyof Theme['icons'];
	/** Max value */
	maxValue?: number;
	/** Badge or Icon color */
	color?: AnyColor;
}

export type { BadgeProps };
export { Badge };
