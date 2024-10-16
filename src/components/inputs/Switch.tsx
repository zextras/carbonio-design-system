/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useRef } from 'react';

import styled, { css, DefaultTheme } from 'styled-components';

import { useCheckbox } from '../../hooks/useCheckbox';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { Icon } from '../basic/icon/Icon';
import { Text } from '../basic/text/Text';
import { Container, ContainerProps } from '../layout/Container';
import { Padding } from '../layout/Padding';

type SwitchSize = 'medium' | 'small';

const CustomIcon = styled(Icon)``;

const IconWrapper = styled.div<{
	$disabled: boolean;
	$iconColor: keyof DefaultTheme['palette'];
}>`
	position: relative;
	display: flex;
	align-items: center;
	${({ theme, $disabled, $iconColor }): ReturnType<typeof css> | false =>
		!$disabled &&
		css`
			&:focus {
				outline: none;
				> ${CustomIcon} {
					color: ${theme.palette[$iconColor].focus};
				}
			}
			&:hover {
				outline: none;
				> ${CustomIcon} {
					color: ${theme.palette[$iconColor].hover};
				}
			}
			&:active {
				outline: none;
				> ${CustomIcon} {
					color: ${theme.palette[$iconColor].active};
				}
			}
		`};
`;

const CustomText = styled(Text)`
	user-select: none;
	line-height: 1.5;
`;

interface SwitchProps extends Omit<ContainerProps, 'onChange' | 'onClick'> {
	/** status of the Switch */
	defaultChecked?: boolean;
	/** Switch value */
	value?: boolean;
	/** Switch text */
	label?: string;
	/** Switch padding */
	padding?: ContainerProps['padding'];
	/** whether to disable the Switch or not */
	disabled?: boolean;
	/** click callback */
	onClick?: (event: Event) => void;
	/** change callback */
	onChange?: (checked: boolean) => void;
	/** available sizes */
	size?: SwitchSize;
	/** icon color */
	iconColor?: keyof DefaultTheme['palette'];
}

const Switch = React.forwardRef<HTMLDivElement, SwitchProps>(function SwitchFn(
	{
		defaultChecked = false,
		value,
		label,
		padding,
		disabled = false,
		onClick,
		onChange,
		size = 'medium',
		iconColor = 'gray0',
		...rest
	},
	ref
) {
	const innerRef = useRef<HTMLDivElement>(null);
	const ckbRef = useCombinedRefs<HTMLDivElement>(ref, innerRef);
	const checked = useCheckbox({
		ref: ckbRef,
		defaultChecked,
		value,
		disabled,
		onClick,
		onChange
	});

	return (
		<Container
			ref={ckbRef}
			orientation="horizontal"
			width="fit"
			height="fit"
			padding={padding}
			style={{ cursor: disabled ? 'default' : 'pointer' }}
			crossAlignment="center"
			{...rest}
		>
			<IconWrapper $disabled={disabled} tabIndex={disabled ? -1 : 0} $iconColor={iconColor}>
				<Icon
					icon={checked ? 'ToggleRight' : 'ToggleLeftOutline'}
					size={size === 'medium' ? 'large' : 'medium'}
					color={iconColor}
					disabled={disabled}
				/>
			</IconWrapper>
			{label && (
				<Padding left="small">
					<CustomText
						size={size === 'medium' ? 'medium' : 'small'}
						weight="regular"
						overflow="break-word"
						color="gray0"
						disabled={disabled}
					>
						{label}
					</CustomText>
				</Padding>
			)}
		</Container>
	);
});

export { Switch, SwitchProps };
