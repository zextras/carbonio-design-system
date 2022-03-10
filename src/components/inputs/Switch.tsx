/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useRef } from 'react';
import styled, { css, SimpleInterpolation } from 'styled-components';

import Container from '../layout/Container';
import Padding from '../layout/Padding';
import Text from '../basic/Text';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { useCheckbox } from '../../hooks/useCheckbox';

const SwitchExt = styled.div<{ checked: boolean }>`
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
	${({ checked, theme }): SimpleInterpolation =>
		checked &&
		css`
			color: ${theme.palette.primary.regular};
		`}
	${({ checked, theme }): SimpleInterpolation =>
		!checked &&
		css`
			color: ${theme.palette.text.regular};
			background-color: transparent;
		`}
`;
const SwitchInt = styled.div<{ checked: boolean }>`
	width: 2px;
	height: 2px;
	color: ${({ checked, theme }): string => theme.palette[checked ? 'gray6' : 'text'].regular};
	border: 2px solid currentColor;
	border-radius: 50%;
	transform: translateX(${({ checked }): string => (checked ? '6px' : '0px')});
	transition: 0.3s ease-out;
`;
const IconWrapper = styled.div<{ checked: boolean; disabled: boolean }>`
	position: relative;
	display: flex;
	align-items: center;
	width: 24px;
	height: 24px;

	${({ disabled }): SimpleInterpolation =>
		disabled &&
		css`
			opacity: 0.3;
		`};
	${({ disabled, checked }): any =>
		!disabled &&
		css`
			&:focus {
				outline: none;
				> ${SwitchExt} {
					box-shadow: 0 0 0 1px currentColor;
					${({ theme }): SimpleInterpolation =>
						checked &&
						css`
							color: ${theme.palette.primary.focus};
						`}
					${({ theme }): SimpleInterpolation =>
						!checked &&
						css`
							background-color: ${theme.palette.gray6.focus};
						`}
				}
			}
		`};
`;

const CustomText = styled(Text)`
	user-select: none;
`;

interface SwitchProps {
	/** status of the Switch */
	defaultChecked?: boolean;
	/** Switch value */
	value?: boolean;
	/** Switch text */
	label?: string;
	/** Switch padding */
	padding?: React.ComponentPropsWithRef<typeof Container>['padding'] | string;
	/** whether to disable the Switch or not */
	disabled?: boolean;
	/** click callback */
	onClick?: React.ReactEventHandler;
	/** change callback */
	onChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLDivElement, SwitchProps>(function SwitchFn(
	{
		defaultChecked = false,
		value,
		label,
		padding = {},
		disabled = false,
		onClick,
		onChange,
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
					<CustomText size="medium" weight="regular" overflow="break-word">
						{label}
					</CustomText>
				</Padding>
			)}
		</Container>
	);
});

export default Switch;
