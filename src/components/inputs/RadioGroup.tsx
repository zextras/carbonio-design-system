/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { FieldsetHTMLAttributes, useCallback, useEffect, useMemo, useState } from 'react';

import styled from 'styled-components';

import { type RadioProps } from './Radio';

type RadioValue<T extends RadioProps['value']> = RadioProps<T>['value'];

interface RadioGroupProps<T extends RadioProps['value']>
	extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
	/** Default value for the radio group */
	defaultValue?: RadioValue<T>;
	/** Radio group value */
	value?: RadioValue<T>;
	/** change callback */
	onChange?: (value: RadioValue<T>) => void;
	/** children elements of Radio Group */
	children: React.ReactElement<RadioProps<T>>[];
}

type RadioGroupType = <T extends RadioProps['value'] = string>(
	p: RadioGroupProps<T> & React.RefAttributes<HTMLFieldSetElement>
) => React.ReactElement | null;

const Fieldset = styled.fieldset`
	margin-inline: 0;
	padding-block: 0;
	padding-inline: 0;
	border: none;
	width: 100%;
`;

/**
 * @visibleName RadioGroup
 */
const RadioGroupComponent = React.forwardRef(function RadioGroupFn<
	T extends RadioProps['value'] = string
>(
	{ children, value, defaultValue, onChange, ...fieldsetProps }: RadioGroupProps<T>,
	ref: React.ForwardedRef<HTMLFieldSetElement>
) {
	const [currentValue, setCurrentValue] = useState<RadioValue<T> | undefined>(
		value ?? defaultValue
	);
	const uncontrolledMode = useMemo(() => typeof value === 'undefined', [value]);

	const handleOnClick = useCallback(
		(newValue: RadioValue<T>) => {
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
		(radio: RadioGroupProps<T>['children'][number]): RadioProps['onClick'] =>
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

const RadioGroup = RadioGroupComponent as RadioGroupType;

export { RadioGroupComponent, RadioGroup, RadioGroupProps };
