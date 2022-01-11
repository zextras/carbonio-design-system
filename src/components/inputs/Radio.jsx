/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
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
const StyledIcon = styled(Icon)`
	margin-right: ${({ theme }) => theme.sizes.padding.small};
	border-radius: 50%;
	color: ${({ theme, color }) => theme.palette[color].regular};
	box-shadow: inset 0 0 0 2px transparent;
	transition: 0.2s ease-out;

	path:last-child {
		transform: scale(0);
		transform-origin: center;
		transition: 0.2s ease-out;

		${({ checked }) =>
			checked &&
			css`
				transform: scale(1);
			`}
	}
	${RadioContainer}:focus-visible & {
		box-shadow: inset 0 0 0 2px currentColor;
	}
`;

const Radio = React.forwardRef(function RadioFn(
	{ defaultChecked, checked, label, disabled, onClick, onChange, padding, ...rest },
	ref
) {
	const innerRef = useRef(undefined);
	const radioRef = useCombinedRefs(ref, innerRef);
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

Radio.propTypes = {
	/** status of the Radio */
	defaultChecked: PropTypes.bool,
	/** Radio checked */
	checked: PropTypes.bool,
	/** Radio text */
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),
	/** whether to disable the radio or not */
	disabled: PropTypes.bool,
	/** click callback */
	onClick: PropTypes.func,
	/** change callback */
	onChange: PropTypes.func,
	/** radio padding */
	padding: Container.propTypes.padding
};

Radio.defaultProps = {
	padding: { bottom: 'small' },
	disabled: false
};

export default Radio;
