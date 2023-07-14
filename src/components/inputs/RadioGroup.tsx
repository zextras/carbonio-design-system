/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { FieldsetHTMLAttributes, useCallback, useEffect, useMemo, useState } from 'react';

import styled from 'styled-components';

import { type RadioProps } from './Radio';

type RadioValue = RadioProps['value'];

interface RadioGroupProps extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
	/** Default value for the radio group */
	defaultValue?: string;
	/** Radio group value */
	value?: RadioValue;
	/** change callback */
	onChange?: (value: RadioValue) => void;
	/** children elements of Radio Group */
	children: React.ReactElement<RadioProps>[];
}

const Fieldset = styled.fieldset`
	margin-inline: 0;
	padding-block: 0;
	padding-inline: 0;
	border: none;
	width: 100%;
`;

const RadioGroup = React.forwardRef<HTMLFieldSetElement, RadioGroupProps>(function RadioGroupFn(
	{ children, value, defaultValue, onChange, ...fieldsetProps },
	ref
) {
	const [currentValue, setCurrentValue] = useState<RadioValue | undefined>(value ?? defaultValue);
	const uncontrolledMode = useMemo(() => typeof value === 'undefined', [value]);

	const handleOnClick = useCallback(
		(newValue: RadioValue) => {
			setCurrentValue((prevValue) => {
				if (uncontrolledMode) {
					return newValue;
				}
				if (newValue !== prevValue) {
					onChange?.(newValue);
				}
				return prevValue;
			});
		},
		[onChange, uncontrolledMode]
	);

	useEffect(() => {
		value && setCurrentValue(value);
	}, [value]);

	const radioClickHandler = useCallback(
		(radio: React.ReactElement<RadioProps>): RadioProps['onClick'] =>
			(e) => {
				radio.props.onClick?.(e);
				handleOnClick(radio.props.value);
			},
		[handleOnClick]
	);

	const items = useMemo(
		() =>
			children.map((radio) =>
				React.cloneElement(radio, {
					key: radio.key ?? `${radio.props.value}`,
					checked: radio.props.value === currentValue,
					onClick: radioClickHandler(radio),
					disabled: radio.props.disabled === true || fieldsetProps.disabled === true
				})
			),
		[children, currentValue, fieldsetProps.disabled, radioClickHandler]
	);

	return (
		<Fieldset ref={ref} {...fieldsetProps}>
			{items}
		</Fieldset>
	);
});

export { RadioGroup, RadioGroupProps };
