/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Container from '../layout/Container';
import Icon from '../basic/Icon';
import Text from '../basic/Text';
import Padding from '../layout/Padding';
import { pseudoClasses } from '../utilities/functions';
import { useCheckbox } from '../../hooks/useCheckbox';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';

const IconWrapper = styled.div`
	${(props) =>
		props.disabled &&
		css`
			opacity: 0.3;
		`};
	${({ theme }) => pseudoClasses(theme, 'transparent')};
`;

const Checkbox = React.forwardRef(function CheckboxFn(
	{
		defaultChecked,
		value,
		label,
		iconSize,
		iconColor,
		padding,
		disabled,
		onClick,
		onChange,
		...rest
	},
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
			<IconWrapper disabled={disabled} tabIndex={disabled ? -1 : 0}>
				<Icon size={iconSize} icon={checked ? 'CheckmarkSquare' : 'Square'} color={iconColor} />
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

Checkbox.propTypes = {
	/** status of the Checkbox */
	defaultChecked: PropTypes.bool,
	/** Checkbox value */
	value: PropTypes.bool,
	/** Checkbox size */
	iconSize: Icon.propTypes.size,
	/** Checkbox color */
	iconColor: Icon.propTypes.color,
	/** Checkbox text */
	label: PropTypes.string,
	/** Checkbox padding */
	padding: Container.propTypes.padding,
	/** whether to disable the checkbox or not */
	disabled: PropTypes.bool,
	/** click callback */
	onClick: PropTypes.func,
	/** change callback */
	onChange: PropTypes.func
};

Checkbox.defaultProps = {
	disabled: false,
	iconSize: 'large',
	iconColor: 'text',
	defaultChecked: false,
	value: undefined,
	label: undefined,
	padding: {},
	onClick: undefined,
	onChange: undefined
};

export default Checkbox;
