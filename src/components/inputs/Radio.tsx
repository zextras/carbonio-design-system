/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import styled, { css, SimpleInterpolation } from 'styled-components';
import { ThemeObj } from '../../theme/theme';
import Container from '../layout/Container';
import Text from '../basic/Text';
import Icon from '../basic/Icon';
import { getKeyboardPreset, useKeyboard } from '../../hooks/useKeyboard';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';

type RadioSize = 'medium' | 'small';

const StyledIcon = styled(Icon)<{ checked: boolean }>`
	margin-right: ${({ theme }): string => theme.sizes.padding.small};
	border-radius: 50%;
	transition: 0.2s ease-out;

	path:last-child {
		transform: scale(0);
		transform-origin: center;
		transition: 0.2s ease-out;

		${({ checked }): SimpleInterpolation =>
			checked &&
			css`
				transform: scale(1);
			`}
	}
`;
const RadioContainer = styled(Container)<{
	$iconColor: keyof ThemeObj['palette'];
}>`
	${({ disabled, $iconColor }): any =>
		!disabled &&
		css`
			&:focus {
				outline: none;
				> ${StyledIcon} {
					color: ${({ theme }): string =>
						theme.palette[$iconColor as keyof ThemeObj['palette']].focus};
				}
			}
			&:hover {
				outline: none;
				> ${StyledIcon} {
					color: ${({ theme }): string =>
						theme.palette[$iconColor as keyof ThemeObj['palette']].hover};
				}
			}
			&:active {
				outline: none;
				> ${StyledIcon} {
					color: ${({ theme }): string =>
						theme.palette[$iconColor as keyof ThemeObj['palette']].active};
				}
			}
		`};
`;

const CustomText = styled(Text)`
	line-height: 1.5;
`;

interface RadioProps {
	/** status of the Radio */
	defaultChecked?: boolean;
	/** Radio checked */
	checked?: boolean;
	/** Radio text */
	label?: string | React.ReactElement;
	// PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),
	/** whether to disable the radio or not */
	disabled?: boolean;
	/** click callback */
	onClick?: React.ReactEventHandler;
	/** change callback */
	onChange?: (checked: boolean) => void;
	/** radio padding */
	padding?: React.ComponentPropsWithRef<typeof Container>['padding'] | string;
	/** available sizes */
	size?: RadioSize;
	/** icon color */
	iconColor?: keyof ThemeObj['palette'];
}

const Radio = React.forwardRef<HTMLDivElement, RadioProps>(function RadioFn(
	{
		defaultChecked,
		checked,
		label,
		onClick,
		onChange,
		disabled = false,
		padding = { bottom: 'small' },
		size = 'medium',
		iconColor = 'gray0',
		...rest
	},
	ref
) {
	const innerRef = useRef<HTMLDivElement>(null);
	const radioRef = useCombinedRefs<HTMLDivElement>(ref, innerRef);
	const [isActive, setIsActive] = useState(defaultChecked || checked || false);

	const uncontrolledMode = useMemo(() => typeof checked === 'undefined', [checked]);
	const handleOnClick = useCallback(
		(e) => {
			if (!disabled) {
				if (uncontrolledMode) {
					setIsActive((prevState) => !prevState);
				}
				if (onClick) {
					onClick(e);
				}
			}
		},
		[disabled, onClick, uncontrolledMode]
	);

	const keyEvents = useMemo(() => getKeyboardPreset('button', handleOnClick), [handleOnClick]);
	useKeyboard(radioRef, keyEvents);

	useEffect(() => {
		onChange && onChange(isActive);
	}, [onChange, isActive]);

	useEffect(() => {
		typeof checked !== 'undefined' && setIsActive(checked);
	}, [checked]);

	return (
		<RadioContainer
			ref={radioRef}
			width="100%"
			height="auto"
			mainAlignment="flex-start"
			crossAlignment="center"
			orientation="horizontal"
			padding={padding}
			style={{ cursor: disabled ? 'default' : 'pointer' }}
			onClick={handleOnClick}
			disabled={disabled}
			tabIndex={disabled ? -1 : 0}
			$iconColor={iconColor}
			{...rest}
		>
			<StyledIcon
				size={size === 'medium' ? 'large' : 'medium'}
				checked={isActive}
				disabled={disabled}
				icon="RadioButtonOn"
				color={iconColor}
			/>
			{typeof label === 'string' ? (
				<CustomText
					disabled={disabled}
					size={size === 'medium' ? 'medium' : 'small'}
					color="gray0"
					weight="regular"
				>
					{label}
				</CustomText>
			) : (
				label
			)}
		</RadioContainer>
	);
});

export default Radio;
