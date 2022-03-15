/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import styled, { css, SimpleInterpolation } from 'styled-components';
import Container from '../layout/Container';
import Text from '../basic/Text';
import Icon from '../basic/Icon';
import { getKeyboardPreset, useKeyboard } from '../../hooks/useKeyboard';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';

const RadioContainer = styled(Container)`
	&:focus-visible {
		outline: none;
	}
`;
const StyledIcon = styled(Icon)<{ checked: boolean }>`
	margin-right: ${({ theme }): string => theme.sizes.padding.small};
	border-radius: 50%;
	box-shadow: inset 0 0 0 2px transparent;
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
	${RadioContainer}:focus-visible & {
		box-shadow: inset 0 0 0 2px currentColor;
	}
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
			{...rest}
		>
			<StyledIcon
				checked={isActive}
				disabled={disabled}
				icon="RadioButtonOn"
				color={isActive ? 'primary' : 'text'}
			/>
			{typeof label === 'string' ? (
				<Text size="medium" color="text" weight="regular">
					{label}
				</Text>
			) : (
				label
			)}
		</RadioContainer>
	);
});

export default Radio;
