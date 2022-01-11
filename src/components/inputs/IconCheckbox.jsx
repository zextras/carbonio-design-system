/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Container from '../layout/Container';
import Icon from '../basic/Icon';
import Text from '../basic/Text';
import Padding from '../layout/Padding';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { Theme } from '../../theme/theme';
import { useCheckbox } from '../../hooks/useCheckbox';

const IconWrapper = styled.div`
	border-radius: ${(props) =>
		props.borderRadius === 'regular' ? props.theme.borderRadius : '50%'};
	background: ${({ theme, isActive }) =>
		isActive ? theme.palette.primary.regular : 'transparent'};
	transition: 0.2s ease-out;

	${({ disabled }) =>
		disabled &&
		css`
			background: ${({ theme, isActive }) =>
				theme.palette[isActive ? 'primary' : 'transparent'].disabled};
		`};
	svg {
		transition: 0.2s ease-out;
		fill: ${({ theme, isActive }) => (isActive ? theme.palette.gray6.regular : 'currentColor')};
	}
	${({ theme, disabled, isActive }) =>
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

const padding = {
	small: 'extrasmall',
	regular: 'small',
	large: 'medium'
};

const IconCheckbox = React.forwardRef(function IconCheckboxFn(
	{ defaultChecked, label, borderRadius, disabled, icon, size, margin, value, onChange, ...rest },
	ref
) {
	const innerRef = useRef(undefined);
	const iconCheckboxRef = useCombinedRefs(ref, innerRef);

	const containerRef = useRef(undefined);

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
				<Text
					size="medium"
					weight="regular"
					style={{
						whiteSpace: 'normal',
						paddingLeft: Theme.sizes.padding.small,
						userSelect: 'none'
					}}
				>
					{label}
				</Text>
			)}
		</Container>
	);
});

IconCheckbox.propTypes = {
	/** Status of the IconCheckbox */
	defaultChecked: PropTypes.bool,
	/** IconCheckbox text */
	label: PropTypes.string,
	/** IconCheckbox radius */
	borderRadius: PropTypes.oneOf(['regular', 'round']),
	/** whether to disable the IconCheckbox or not */
	disabled: PropTypes.bool,
	/** IconCheckbox icon */
	icon: PropTypes.string.isRequired,
	/** IconCheckbox size */
	size: PropTypes.oneOf(['small', 'regular', 'large']),
	/** IconCheckbox margin */
	margin: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.oneOf(Object.keys(Theme.sizes.padding))
	]),
	/** IconCheckbox value */
	value: PropTypes.bool,
	/** change callback */
	onChange: PropTypes.func.isRequired
};

IconCheckbox.defaultProps = {
	borderRadius: 'round',
	disabled: false,
	size: 'regular',
	margin: 'extrasmall',
	defaultChecked: false,
	label: undefined,
	value: undefined
};

export default IconCheckbox;
