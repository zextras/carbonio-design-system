/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useRef } from 'react';
import styled, { css, FlattenSimpleInterpolation, SimpleInterpolation } from 'styled-components';
import Container from '../layout/Container';
import Icon from '../basic/Icon';
import Text from '../basic/Text';
import Padding from '../layout/Padding';
import { pseudoClasses } from '../utilities/functions';
import { useCheckbox } from '../../hooks/useCheckbox';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { ThemeObj } from '../../theme/theme';

const IconWrapper = styled.div<{ disabled: boolean }>`
	${(props): SimpleInterpolation =>
		props.disabled &&
		css`
			opacity: 0.3;
		`};
	${({ theme }): FlattenSimpleInterpolation => pseudoClasses(theme, 'transparent')};
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
	/** Checkbox size */
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
}

const Checkbox = React.forwardRef<HTMLDivElement, CheckboxProps>(function CheckboxFn(
	{
		defaultChecked = false,
		value,
		label,
		iconSize = 'large',
		iconColor = 'text',
		padding = {},
		disabled = false,
		onClick,
		onChange,
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
			<IconWrapper disabled={disabled} tabIndex={disabled ? -1 : 0}>
				<Icon size={iconSize} icon={checked ? 'CheckmarkSquare' : 'Square'} color={iconColor} />
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

export default Checkbox;
