/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const RadioGroupWrapper = styled.div``;

const RadioGroup = React.forwardRef(function RadioGroupFn(
	{ children, value, defaultValue, onChange, ...rest },
	ref
) {
	const [currentValue, setCurrentValue] = useState(value || defaultValue);
	const uncontrolledMode = useMemo(() => typeof value === 'undefined', [value]);
	const handleOnClick = (v) => {
		uncontrolledMode && setCurrentValue(v);
		onChange && onChange(v);
	};
	useEffect(() => {
		value && setCurrentValue(value);
	}, [value]);

	return (
		<RadioGroupWrapper ref={ref} {...rest}>
			{children.map((radio) =>
				React.cloneElement(radio, {
					key: radio.props.value,
					checked: radio.props.value === currentValue,
					onClick: (e) => {
						radio.props.onClick && radio.props.onClick(e);
						handleOnClick(radio.props.value);
					}
				})
			)}
		</RadioGroupWrapper>
	);
});

RadioGroup.propTypes = {
	/** Default value for the radio group */
	defaultValue: PropTypes.string,
	/** Radio group value */
	value: PropTypes.string,
	/** change callback */
	onChange: PropTypes.func,
	/** children elements of Radio Group */
	children: PropTypes.arrayOf(PropTypes.element)
};

RadioGroup.defaultProps = {};

export { RadioGroup };
