/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Container from '../layout/Container';
import Padding from '../layout/Padding';
import Text from '../basic/Text';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { useCheckbox } from '../../hooks/useCheckbox';

const SwitchExt = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	width: 12px;
	height: 10px;
	padding: 0 2px;
	background-color: currentColor;
	border: 2px solid currentColor;
	border-radius: 30px;
	box-shadow: 0 0 0 0 currentColor;
	transition: 0.3s ease-out;
	${({ checked, theme }) =>
		checked &&
		css`
			color: ${theme.palette.primary.regular};
		`}
	${({ checked, theme }) =>
		!checked &&
		css`
			color: ${theme.palette.text.regular};
			background-color: transparent;
		`}
`;
const SwitchInt = styled.div`
	width: 2px;
	height: 2px;
	color: ${({ checked, theme }) => theme.palette[checked ? 'gray6' : 'text'].regular};
	border: 2px solid currentColor;
	border-radius: 50%;
	transform: translateX(${({ checked }) => (checked ? '6px' : '0px')});
	transition: 0.3s ease-out;
`;
const IconWrapper = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	width: 24px;
	height: 24px;

	${({ disabled }) =>
		disabled &&
		css`
			opacity: 0.3;
		`};
	${({ disabled }) =>
		!disabled &&
		css`
			&:focus {
				outline: none;
				> ${SwitchExt} {
					box-shadow: 0 0 0 1px currentColor;
					${({ checked, theme }) =>
						checked &&
						css`
							color: ${theme.palette.primary.focus};
						`}
					${({ checked, theme }) =>
						!checked &&
						css`
							background-color: ${theme.palette.gray6.focus};
						`}
				}
			}
		`};
`;

const Switch = React.forwardRef(function SwitchFn(
	{ defaultChecked, value, label, padding, disabled, onClick, onChange, ...rest },
	ref
) {
	const innerRef = useRef(undefined);
	const ckbRef = useCombinedRefs(ref, innerRef);
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
			padding={padding || undefined}
			style={{ cursor: disabled ? 'default' : 'pointer' }}
			crossAlignment="center"
			{...rest}
		>
			<IconWrapper checked={checked} disabled={disabled} tabIndex={disabled ? -1 : 0}>
				<SwitchExt checked={checked}>
					<SwitchInt checked={checked} />
				</SwitchExt>
			</IconWrapper>
			{label && (
				<Padding left="small">
					<Text size="medium" weight="regular" overflow="break-word" style={{ userSelect: 'none' }}>
						{label}
					</Text>
				</Padding>
			)}
		</Container>
	);
});

Switch.propTypes = {
	/** status of the Switch */
	defaultChecked: PropTypes.bool,
	/** Switch value */
	value: PropTypes.bool,
	/** Switch text */
	label: PropTypes.string,
	/** Switch padding */
	padding: Container.propTypes.padding,
	/** whether to disable the Switch or not */
	disabled: PropTypes.bool,
	/** click callback */
	onClick: PropTypes.func,
	/** change callback */
	onChange: PropTypes.func
};

Switch.defaultProps = {
	disabled: false,
	defaultChecked: false,
	value: undefined,
	label: undefined,
	padding: {},
	onClick: undefined,
	onChange: undefined
};

export default Switch;
