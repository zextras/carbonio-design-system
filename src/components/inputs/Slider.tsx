/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { rgba } from 'polished';
import styled, { DefaultTheme } from 'styled-components';

import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { Tooltip } from '../display/Tooltip';
import { Container } from '../layout/Container';

const SLIDER_SIZES = {
	TRACK_HEIGHT: '0.25rem',
	THUMB_DIAMETER: '0.625rem',
	THUMB_RADIUS: '50%',
	TICK_WIDTH: '0.0625rem'
} as const;

const SLIDER_COLORS: Record<
	'THUMB' | 'TRACK' | 'TICK' | 'THUMB_SHADOW',
	keyof DefaultTheme['palette']
> = {
	TRACK: 'gray5',
	THUMB: 'primary',
	TICK: 'gray2',
	THUMB_SHADOW: 'white'
} as const;

const SliderInput = styled.input.attrs({
	type: 'range'
})`
	--thumb-radius: calc(${SLIDER_SIZES.THUMB_DIAMETER} / 2);
	--track-half-height: calc(${SLIDER_SIZES.TRACK_HEIGHT} / 2);
	--color-thumb-regular: ${({ theme }): string => theme.palette[SLIDER_COLORS.THUMB].regular};
	--color-thumb-disabled: ${({ theme }): string => theme.palette[SLIDER_COLORS.THUMB].disabled};
	--color-thumb-focus: ${({ theme }): string => theme.palette[SLIDER_COLORS.THUMB].focus};
	--color-thumb-hover: ${({ theme }): string => theme.palette[SLIDER_COLORS.THUMB].hover};
	-webkit-appearance: none;
	-moz-appearance: none;
	width: 100%;
	background: transparent;
	color: transparent;
	margin: 0;
	padding: 0;
	z-index: 2;
	height: 0;

	&::-webkit-slider-runnable-track {
		-webkit-appearance: none;
		height: 0;
	}

	&::-webkit-slider-container {
		min-block-size: 0;
		height: 0;
	}

	&::-moz-range-track {
		-moz-appearance: none;
		height: 0;
	}

	&::-moz-range-progress {
		height: ${SLIDER_SIZES.TRACK_HEIGHT};
	}

	&::-webkit-slider-thumb {
		-webkit-appearance: none;
		border: none;
		border-radius: ${SLIDER_SIZES.THUMB_RADIUS};
		height: ${SLIDER_SIZES.THUMB_DIAMETER};
		width: ${SLIDER_SIZES.THUMB_DIAMETER};
		background-color: var(--color-thumb-regular);
		cursor: grab;
		box-shadow: 0 0.0625rem 0.5rem ${rgba(SLIDER_COLORS.THUMB_SHADOW, 0.17)};
		transform: translateY(calc((var(--thumb-radius) - var(--track-half-height)) * -1));
	}

	&::-moz-range-thumb {
		-moz-appearance: none;
		border: none;
		border-radius: ${SLIDER_SIZES.THUMB_RADIUS};
		height: ${SLIDER_SIZES.THUMB_DIAMETER};
		width: ${SLIDER_SIZES.THUMB_DIAMETER};
		background-color: var(--color-thumb-regular);
		cursor: grab;
		box-shadow: 0 0.0625rem 0.5rem ${rgba(SLIDER_COLORS.THUMB_SHADOW, 0.17)};
		transform: translateY(var(--track-half-height));
	}

	&::-webkit-slider-thumb:hover {
		background-color: var(--color-thumb-hover);
	}

	&::-webkit-slider-thumb:active {
		cursor: grabbing;
		background-color: var(--color-thumb-hover);
	}

	&::-moz-range-thumb:hover {
		background-color: var(--color-thumb-hover);
	}

	&::-moz-range-thumb:active {
		cursor: grabbing;
		background-color: var(--color-thumb-hover);
	}

	&::-webkit-slider-thumb:focus {
		background-color: var(--color-thumb-focus);
	}

	&::-moz-range-thumb:focus {
		background-color: var(--color-thumb-focus);
	}

	&:focus {
		outline: none;
	}

	&:disabled {
		cursor: default;
		&::-webkit-slider-thumb {
			background-color: var(--color-thumb-disabled);
			cursor: default;
		}
		&::-moz-range-thumb {
			background-color: var(--color-thumb-disabled);
			cursor: default;
		}
		&::-ms-thumb {
			background-color: var(--color-thumb-disabled);
			cursor: default;
		}
	}
`;

const SliderContainer = styled(Container)`
	position: relative;
`;

const SliderDataList = styled.datalist`
	--thumb-radius: calc(${SLIDER_SIZES.THUMB_DIAMETER} / 2);
	--track-half-height: calc(${SLIDER_SIZES.TRACK_HEIGHT} / 2);
	--tick-padding: var(--thumb-radius);
	--tick-height: ${SLIDER_SIZES.THUMB_DIAMETER};
	display: flex;
	width: calc(100% - ${SLIDER_SIZES.THUMB_DIAMETER});
	padding: 0 var(--thumb-radius);
	justify-content: space-between;
	font-size: 0;
	background-clip: content-box;
	background-color: ${({ theme }): string => theme.palette[SLIDER_COLORS.TRACK].regular};
	height: ${SLIDER_SIZES.TRACK_HEIGHT};

	&:disabled {
		background-color: ${({ theme }): string => theme.palette[SLIDER_COLORS.TRACK].disabled};
	}

	option {
		min-width: 1px;
		width: ${SLIDER_SIZES.TICK_WIDTH};
		height: var(--tick-height);
		padding: var(--tick-padding);
		margin: calc(
				(var(--tick-padding) + ((var(--tick-height) - ${SLIDER_SIZES.TRACK_HEIGHT}) / 2)) * -1
			)
			calc(var(--thumb-radius) * -1);
		cursor: pointer;
		background-color: ${({ theme }): string => theme.palette[SLIDER_COLORS.TICK].regular};
		background-clip: content-box;

		&:disabled {
			cursor: default;
			background-color: ${({ theme }): string => theme.palette[SLIDER_COLORS.TICK].disabled};
		}

		&:not(:disabled):hover {
			background-color: ${({ theme }): string => theme.palette[SLIDER_COLORS.THUMB].disabled};
		}
	}
`;

interface SliderProps {
	/** Labels for the input options */
	options: Array<string>;
	/** Disable the entire slider */
	disabled?: boolean;
	/** Value of the input for the controlled usage. It should be included between 0 and options length */
	value?: number;
	/** Callback for the controlled usage. New value can be a decimal number while the thumb is being dragged between two valid values */
	onChange?: (event: React.SyntheticEvent, newValue: number) => void;
	/** Ref to be assigned to the input element */
	inputRef?: React.Ref<HTMLInputElement> | null;
}

type Slider = React.ForwardRefExoticComponent<SliderProps> & {
	_newId?: number;
};

const Slider: Slider = React.forwardRef<HTMLDivElement, SliderProps>(function SliderFn(
	{ options, value: controlledValue, disabled, onChange, inputRef = null },
	ref
) {
	const [value, setValue] = useState<number>(controlledValue ?? Math.floor(options.length / 2));
	const innerInputRef = useCombinedRefs(inputRef);

	const [id] = useState(() => {
		if (!Slider._newId) {
			Slider._newId = 0;
		}
		const newId = Slider._newId + 1;
		Slider._newId += 1;
		return `slider-${newId}`;
	});

	useEffect(() => {
		if (controlledValue !== undefined && onChange) {
			setValue(controlledValue);
		}
	}, [controlledValue, onChange]);

	const updateValue = useCallback(
		(event: React.SyntheticEvent, newValue: number) => {
			if (onChange) {
				onChange(event, newValue);
			} else {
				setValue(newValue);
			}
		},
		[onChange]
	);

	const onOptionClick = useCallback<React.MouseEventHandler<HTMLOptionElement>>(
		(event) => {
			if (!disabled && event.target instanceof HTMLOptionElement) {
				updateValue(event, Number(event.target.value));
			}
		},
		[disabled, updateValue]
	);

	const onInputChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
		(event) => {
			updateValue(event, Number(event.target.value));
		},
		[updateValue]
	);

	const stepComponents = useMemo(
		() =>
			options.map((option, index) => (
				<Tooltip label={option} key={index}>
					<option value={index} onClick={onOptionClick} disabled={disabled} label={option}>
						{option}
					</option>
				</Tooltip>
			)),
		[options, onOptionClick, disabled]
	);

	const onInputClick = useCallback<React.MouseEventHandler<HTMLInputElement>>(
		(event) => {
			if (event.target instanceof HTMLInputElement) {
				updateValue(event, Math.round(Number(event.target.value)));
			}
		},
		[updateValue]
	);

	const onInputKeyDown = useCallback<React.KeyboardEventHandler<HTMLInputElement>>(
		(event) => {
			if (event.target instanceof HTMLInputElement) {
				event.preventDefault();
				const inputValue = Number(event.target.value);
				let newValue = Math.round(inputValue);
				if (event.key === 'ArrowLeft' && inputValue > 0) {
					newValue = Math.round(inputValue - 1);
				} else if (event.key === 'ArrowRight' && inputValue < options.length - 1) {
					newValue = Math.round(inputValue + 1);
				}
				updateValue(event, newValue);
			}
		},
		[options.length, updateValue]
	);

	return (
		<SliderContainer
			width={'fill'}
			height={'fit'}
			ref={ref}
			mainAlignment={'flex-start'}
			crossAlignment={'flex-start'}
		>
			<SliderInput
				min={0}
				max={options.length - 1}
				step={0.01}
				list={`${id}-option-list`}
				disabled={disabled}
				value={value}
				onChange={onInputChange}
				onKeyDown={onInputKeyDown}
				onClick={onInputClick}
				ref={innerInputRef}
				id={id}
			/>
			<SliderDataList id={`${id}-option-list`}>{stepComponents}</SliderDataList>
		</SliderContainer>
	);
});

export { Slider, SliderProps };
