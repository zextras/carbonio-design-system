/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useRef, useCallback, useMemo } from 'react';
import styled, { css, SimpleInterpolation } from 'styled-components';
import { Container, ContainerProps } from '../layout/Container';
import { Icon } from '../basic/Icon';
import { Text } from '../basic/Text';
import { Padding } from '../layout/Padding';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import type { ThemeObj } from '../../theme/theme';
import { useCheckbox } from '../../hooks/useCheckbox';

const IconWrapper = styled.div<{
	borderRadius: 'regular' | 'round';
	isActive: boolean;
	disabled: boolean;
}>`
	border-radius: ${({ borderRadius, theme }): string =>
		borderRadius === 'regular' ? theme.borderRadius : '50%'};
	background: ${({ theme, isActive }): string =>
		isActive ? theme.palette.primary.regular : 'transparent'};
	transition: 0.2s ease-out;

	${({ disabled, isActive, theme }): SimpleInterpolation =>
		disabled &&
		css`
			background: ${theme.palette[isActive ? 'primary' : 'transparent'].disabled};
		`};
	svg {
		transition: 0.2s ease-out;
		fill: ${({ theme, isActive }): string =>
			isActive ? theme.palette.gray6.regular : 'currentColor'};
	}
	${({ theme, disabled, isActive }): SimpleInterpolation =>
		!disabled &&
		css`
			transition: background 0.2s ease-out;
			&:focus {
				outline: none;
				background: ${theme.palette[isActive ? 'primary' : 'transparent'].focus};
				svg {
					fill: ${isActive ? theme.palette.gray6.focus : theme.palette.primary.focus};
				}
			}
			&:hover {
				outline: none;
				background: ${theme.palette[isActive ? 'primary' : 'transparent'].hover};
				svg {
					fill: ${isActive ? theme.palette.gray6.hover : theme.palette.primary.hover};
				}
			}
			&:active {
				outline: none;
				background: ${theme.palette[isActive ? 'primary' : 'transparent'].active};
			}
		`};
`;

const CustomText = styled(Text)`
	white-space: normal;
	padding-left: ${({ theme }): string => theme.sizes.padding.small};
	user-select: none;
`;

const padding = {
	small: 'extrasmall',
	regular: 'small',
	large: 'medium'
};

interface IconCheckboxProps extends Omit<ContainerProps, 'margin'> {
	/** Status of the IconCheckbox */
	defaultChecked?: boolean;
	/** IconCheckbox text */
	label?: string;
	/** IconCheckbox radius */
	borderRadius?: 'regular' | 'round';
	/** whether to disable the IconCheckbox or not */
	disabled?: boolean;
	/** IconCheckbox icon */
	icon: keyof ThemeObj['icons'];
	/** IconCheckbox size */
	size?: 'small' | 'regular' | 'large';
	/** IconCheckbox margin */
	margin?: keyof ThemeObj['sizes']['padding'];
	/** IconCheckbox value */
	value?: boolean;
	/** change callback */
	onChange: () => void;
}

const IconCheckbox = React.forwardRef<HTMLDivElement, IconCheckboxProps>(function IconCheckboxFn(
	{
		defaultChecked = false,
		label,
		borderRadius = 'round',
		disabled = false,
		icon,
		size = 'regular',
		margin = 'extrasmall',
		value,
		onChange,
		...rest
	},
	ref
) {
	const iconCheckboxRef = useCombinedRefs<HTMLDivElement>(ref);

	const containerRef = useRef<HTMLDivElement>(null);

	const onClick = useCallback(() => {
		onChange && onChange();
	}, [onChange]);

	const checked = useCheckbox({
		ref: containerRef,
		defaultChecked,
		value,
		disabled,
		onClick,
		onChange
	});

	const iconSize = useMemo(() => (size === 'small' ? 'medium' : 'large'), [size]);

	return (
		<Container
			ref={containerRef}
			orientation="horizontal"
			width="fit"
			height="fit"
			padding={{ horizontal: margin }}
			style={{ cursor: disabled ? 'default' : 'pointer' }}
			crossAlignment="center"
			{...rest}
		>
			<IconWrapper
				ref={iconCheckboxRef}
				isActive={checked}
				borderRadius={borderRadius}
				disabled={disabled}
				tabIndex={disabled ? -1 : 0}
			>
				<Padding all={padding[size]}>
					<Icon size={iconSize} icon={icon} />
				</Padding>
			</IconWrapper>
			{label && (
				<CustomText size="medium" weight="regular">
					{label}
				</CustomText>
			)}
		</Container>
	);
});

export { IconCheckbox, IconCheckboxProps };
