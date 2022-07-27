/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { HTMLAttributes, useCallback, useEffect, useMemo, useState } from 'react';

interface RadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
	/** Default value for the radio group */
	defaultValue?: string;
	/** Radio group value */
	value?: string;
	/** change callback */
	onChange?: (value: string) => void;
	/** children elements of Radio Group */
	children: JSX.Element[];
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroupFn(
	{ children, value, defaultValue, onChange, ...rest },
	ref
) {
	const [currentValue, setCurrentValue] = useState<string | undefined>(value || defaultValue);
	const uncontrolledMode = useMemo(() => typeof value === 'undefined', [value]);

	const handleOnClick = useCallback(
		(v) => {
			uncontrolledMode && setCurrentValue(v);
			onChange && onChange(v);
		},
		[onChange, uncontrolledMode]
	);

	useEffect(() => {
		value && setCurrentValue(value);
	}, [value]);

	const radioClickHandler = useCallback(
		(radio: JSX.Element) =>
			(e: React.SyntheticEvent): void => {
				radio.props.onClick && radio.props.onClick(e);
				handleOnClick(radio.props.value);
			},
		[handleOnClick]
	);

	return (
		<div ref={ref} {...rest}>
			{children.map((radio) =>
				React.cloneElement(radio, {
					key: radio.props.value,
					checked: radio.props.value === currentValue,
					onClick: radioClickHandler(radio)
				})
			)}
		</div>
	);
});

export { RadioGroup, RadioGroupProps };
