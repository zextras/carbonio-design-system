/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, {
	CSSProperties,
	InputHTMLAttributes,
	LabelHTMLAttributes,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react';

import styled, { css, DefaultTheme, SimpleInterpolation } from 'styled-components';

import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { getColor, pseudoClasses } from '../../theme/theme-utils';
import { Text, TextProps } from '../basic/Text';
import { Container, ContainerProps } from '../layout/Container';

const RADIO_SIZE: Record<
	'small' | 'medium',
	{ icon: keyof DefaultTheme['sizes']['icon']; label: TextProps['size'] }
> = {
	medium: {
		icon: 'large',
		label: 'medium'
	},
	small: {
		icon: 'medium',
		label: 'small'
	}
};

const RadioInput = styled.input<{
	$color: string;
	$size: keyof DefaultTheme['sizes']['icon'];
}>`
	&:focus-visible {
		outline: none;
	}
	${({ disabled }): SimpleInterpolation =>
		!disabled &&
		css`
			cursor: pointer;
		`};
	${({ $size, theme }): SimpleInterpolation => css`
		/* calc internal sizes following the proportion on base 24 */
		--radio-outer-diameter: calc(${theme.sizes.icon[$size]} * (20 / 24));
		--radio-inner-diameter: calc(${theme.sizes.icon[$size]} * (10 / 24));
		--radio-border-width: calc(${theme.sizes.icon[$size]} * (2 / 24));
		--radio-padding: calc(${theme.sizes.icon[$size]} * (3 / 24));
	`};
	width: var(--radio-outer-diameter);
	height: var(--radio-outer-diameter);
	min-width: fit-content;
	flex-shrink: 0;
	box-sizing: border-box;
	margin: 0;
	appearance: none;
	border-radius: 50%;
	--radio-color: ${({ $color, theme }): string => getColor($color, theme)};
	--radio-bg-color: ${({ theme }): string => theme.palette.gray6.regular};
	outline: none;
	/* border is the outer circle */
	border: var(--radio-border-width) solid;
	/* padding is the space between inner and outer circle */
	padding: var(--radio-padding);
	/* background is the inner circle */
	background-clip: content-box;
	${({ $color, theme }): SimpleInterpolation =>
		pseudoClasses(theme, $color, 'background-color', { transition: false, outline: false })};
	${({ $color, theme }): SimpleInterpolation =>
		pseudoClasses(theme, $color, 'border-color', { transition: false, outline: false })};
	/* box shadow cover the background when the radio is not checked, simulating the empty content */
	box-shadow: inset 0 0 0 var(--radio-inner-diameter) var(--radio-bg-color);
	&:checked {
		/* 
		 * when checked, the box shadow is removed (length 0), with the transition
		 * which gives the impression that the internal circle is growing,
		 * while in the reality it is the shadow which is shrinking
		 */
		box-shadow: inset 0 0 0 0 var(--radio-bg-color);
	}
	transition-property: box-shadow;
	transition-duration: 0.2s;
	transition-timing-function: ease-out;
`;

const Label = styled(Text).attrs({ forwardedAs: 'label' })<LabelHTMLAttributes<HTMLLabelElement>>`
	line-height: 1.5;
	${({ disabled }): SimpleInterpolation =>
		!disabled &&
		css`
			cursor: pointer;
		`}
`;

const RadioContainer = styled(Container)<{
	$iconColor: string;
	$disabled: boolean;
}>`
	outline: none;
	${({ theme, $disabled, $iconColor }): SimpleInterpolation =>
		!$disabled &&
		css`
			&:hover {
				${RadioInput} {
					background-color: ${getColor(`${$iconColor}.hover`, theme)};
					border-color: ${getColor(`${$iconColor}.hover`, theme)};
				}
			}
		`};
`;

type RadioInputHTMLAttributes = InputHTMLAttributes<HTMLInputElement> & { type: 'radio' };

interface RadioComponentProps<T extends RadioInputHTMLAttributes['value']> {
	/** status of the Radio */
	defaultChecked?: boolean;
	/** Radio checked */
	checked?: boolean;
	/** Radio text */
	label?: string | React.ReactElement;
	/** whether to disable the radio or not */
	disabled?: boolean;
	/** click callback */
	onClick?: (e: React.MouseEvent<HTMLInputElement> | KeyboardEvent) => void;
	/** change callback */
	onChange?: (checked: boolean) => void;
	/** radio padding */
	padding?: ContainerProps['padding'];
	/** available sizes */
	size?: keyof typeof RADIO_SIZE;
	/** icon color */
	iconColor?: keyof DefaultTheme['palette'] | CSSProperties['color'];
	/** Ref for the input element */
	inputRef?: React.Ref<HTMLInputElement>;
	/** Value of the radio input */
	value?: T;
}

type RadioProps<T extends RadioInputHTMLAttributes['value'] = string> = RadioComponentProps<T> &
	Omit<RadioInputHTMLAttributes, 'type' | 'checked' | 'id' | keyof RadioComponentProps<T>>;

type RadioType = (<T extends RadioInputHTMLAttributes['value'] = string>(
	p: RadioProps<T> & React.RefAttributes<HTMLDivElement>
) => React.ReactElement<RadioProps> | null) & {
	_id?: number;
};

/**
 * @visibleName Radio
 */
const RadioComponent = React.forwardRef(function RadioFn<
	T extends RadioInputHTMLAttributes['value'] = string
>(
	{
		defaultChecked,
		checked,
		label,
		onClick,
		onChange,
		disabled = false,
		padding = { bottom: 'small' },
		size = 'medium',
		iconColor = 'gray0',
		inputRef = null,
		...rest
	}: RadioProps<T>,
	ref: React.ForwardedRef<HTMLDivElement>
) {
	const containerRef = useCombinedRefs<HTMLDivElement>(ref);
	const radioInputRef = useCombinedRefs<HTMLInputElement>(inputRef);
	const labelRef = useRef<HTMLDivElement>(null);
	const [isChecked, setIsChecked] = useState(checked ?? defaultChecked ?? false);
	const [id] = useState((): string => {
		const RadioComponentAlias = RadioComponent as RadioType;
		if (RadioComponentAlias._id === undefined) {
			RadioComponentAlias._id = 0;
		}
		const { _id } = RadioComponentAlias;
		RadioComponentAlias._id += 1;
		return `Radio-${_id}`;
	});

	const uncontrolledMode = useMemo(() => typeof checked === 'undefined', [checked]);

	const onClickHandler = useCallback<React.MouseEventHandler<HTMLInputElement>>(
		(e) => {
			if (!disabled) {
				if (uncontrolledMode && !e.defaultPrevented) {
					setIsChecked((prevState) => !prevState);
				}
				onClick?.(e);
			}
		},
		[disabled, onClick, uncontrolledMode]
	);

	const onChangeHandler = useCallback<React.ChangeEventHandler<HTMLInputElement>>(() => {
		// do nothing
		// TODO: CDS-174: update state here and not in the click. In controlled mode, do not update the internal state,
		// 	just call the external onChange
	}, []);

	useEffect(() => {
		// TODO: CDS-174: remove this effect, call onChange only from the handler
		onChange?.(isChecked);
	}, [onChange, isChecked]);

	useEffect(() => {
		if (checked !== undefined) {
			setIsChecked(checked);
		}
	}, [checked]);

	const labelWithClick = useMemo(
		() =>
			(typeof label === 'string' && (
				<Label disabled={disabled} size={RADIO_SIZE[size].label} htmlFor={id} ref={labelRef}>
					{label}
				</Label>
			)) ||
			(React.isValidElement<{ onClick?: React.MouseEventHandler }>(label) &&
				React.cloneElement(label, {
					onClick: (event: React.MouseEvent) => {
						label.props?.onClick?.(event);
						if (!event.defaultPrevented && radioInputRef.current) {
							radioInputRef.current.click();
						}
					}
				})) ||
			label,
		[disabled, id, label, radioInputRef, size]
	);

	return (
		<RadioContainer
			ref={containerRef}
			width="100%"
			height="auto"
			mainAlignment="flex-start"
			crossAlignment="center"
			orientation="horizontal"
			padding={padding}
			$disabled={disabled}
			$iconColor={iconColor}
			gap={'0.5rem'}
		>
			<RadioInput
				type="radio"
				{...rest}
				id={id}
				ref={radioInputRef}
				checked={isChecked}
				onClick={onClickHandler}
				onChange={onChangeHandler}
				disabled={disabled}
				$color={iconColor}
				$size={RADIO_SIZE[size].icon}
			/>
			{labelWithClick}
		</RadioContainer>
	);
});

const Radio = RadioComponent as RadioType;

export { RadioComponent, Radio, RadioProps };
