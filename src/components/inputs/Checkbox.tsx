/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useMemo, useRef } from 'react';
import styled, { css } from 'styled-components';
import { getColor } from '../../theme/theme-utils';
import Container from '../layout/Container';
import Icon from '../basic/Icon';
import Text from '../basic/Text';
import Padding from '../layout/Padding';
import { useCheckbox } from '../../hooks/useCheckbox';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { ThemeObj } from '../../theme/theme';

type CheckboxSize = 'medium' | 'small';

const IconWrapper = styled.div<{
	disabled: boolean;
	iconColor: keyof ThemeObj['palette'] | string;
}>`
	${({ disabled, iconColor }): any =>
		!disabled &&
		css`
			&:focus {
				outline: none;
				> ${Icon} {
					color: ${({ theme }): string => getColor(`${iconColor}.focus`, theme)};
				}
			}
			&:hover {
				outline: none;
				> ${Icon} {
					color: ${({ theme }): string => getColor(`${iconColor}.hover`, theme)};
				}
			}
			&:active {
				outline: none;
				> ${Icon} {
					color: ${({ theme }): string => getColor(`${iconColor}.active`, theme)};
				}
			}
		`};
`;

const CustomText = styled(Text)`
	user-select: none;
	line-height: 1.5;
`;

interface CheckboxProps {
	/** status of the Checkbox */
	defaultChecked?: boolean;
	/** Checkbox value */
	value?: boolean;
	/** Checkbox size
	 * @deprecated use size instead
	 */
	iconSize?: keyof ThemeObj['sizes']['icon'];
	/** Checkbox color */
	iconColor?: keyof ThemeObj['palette'] | string;
	/** Checkbox text */
	label?: string;
	/** Checkbox padding */
	padding?: Container.propTypes.padding;
	/** whether to disable the checkbox or not */
	disabled?: boolean;
	/** click callback */
	onClick?: React.ReactEventHandler;
	/** change callback */
	onChange?: (checked: boolean) => void;
	/** available sizes */
	size: CheckboxSize;
}

const Checkbox = React.forwardRef<HTMLDivElement, CheckboxProps>(function CheckboxFn(
	{
		defaultChecked = false,
		value,
		label,
		iconSize,
		iconColor = 'gray0',
		padding = {},
		disabled = false,
		onClick,
		onChange,
		size = 'medium',
		...rest
	},
	ref
) {
	const innerRef = useRef<HTMLDivElement>(null);
	const ckbRef = useCombinedRefs(ref, innerRef);
	const checked = useCheckbox({
		ref: ckbRef,
		defaultChecked,
		value,
		disabled,
		onClick,
		onChange
	});

	const computedIconSize = useMemo(
		() =>
			// TODO simplify when iconSize will be removed
			iconSize || (size === 'medium' ? 'large' : 'medium'),
		[size, iconSize]
	);

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
			<IconWrapper iconColor={iconColor} disabled={disabled} tabIndex={disabled ? -1 : 0}>
				<Icon
					size={computedIconSize}
					icon={checked ? 'CheckmarkSquare' : 'Square'}
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
						disabled={disabled}
						color="gray0"
					>
						{label}
					</CustomText>
				</Padding>
			)}
		</Container>
	);
});

export default Checkbox;
