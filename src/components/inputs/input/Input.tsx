/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useMemo, useState } from 'react';

import styled, { DefaultTheme } from 'styled-components';

import { useCombinedRefs } from '../../../hooks/useCombinedRefs';
import { KeyboardPresetObj, useKeyboard } from '../../../hooks/useKeyboard';
import { getColor } from '../../../theme/theme-utils';
import { AnyColor } from '../../../types/utils';
import { INPUT_BACKGROUND_COLOR, INPUT_DIVIDER_COLOR } from '../../constants';
import { Container, ContainerProps } from '../../layout/Container';
import { Divider, DividerProps } from '../../layout/divider/Divider';
import { InputContainer } from '../commons/InputContainer';
import { InputDescription } from '../commons/InputDescription';
import { InputLabel } from '../commons/InputLabel';

const InputEl = styled.input<{ $color: AnyColor }>`
	border: none !important;
	height: auto !important;
	width: 100%;
	outline: 0;
	background: transparent !important;
	font-size: ${({ theme }): string => theme.sizes.font.medium};
	font-weight: ${({ theme }): number => theme.fonts.weight.regular};
	font-family: ${({ theme }): string => theme.fonts.default};
	color: ${({ theme, $color }): string => getColor($color, theme)};

	&:disabled {
		color: ${({ theme, $color }): string => getColor(`${$color}.disabled`, theme)};
	}

	transition: background 0.2s ease-out;
	line-height: 1.5;
	padding: 0;

	&::placeholder {
		color: transparent;
		font-size: 0;
		user-select: none;
	}
`;

const Label = styled(InputLabel)`
	${InputEl}:focus + &,
  ${InputEl}:not(:placeholder-shown) + & {
		top: 0;
		transform: translateY(0);
		font-size: ${({ theme }): string => theme.sizes.font.extrasmall};
	}
`;

const RelativeContainer = styled(Container)`
	position: relative;
`;

interface InputProps extends ContainerProps {
	/** Input's background color
	 * @deprecated use background prop instead
	 * */
	backgroundColor?: keyof DefaultTheme['palette'];
	/** whether to disable the Input or not */
	disabled?: boolean;
	/** Input's text color */
	textColor?: AnyColor;
	/** Input's bottom border color */
	borderColor?: AnyColor;
	/** Label of the input, will act (graphically) as placeholder when the input is not focused */
	label?: string;
	/** input change callback */
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	/** ref to the input element */
	inputRef?: React.RefObject<HTMLInputElement>;
	/** value of the input */
	value?: string | number;
	/** default value of the input */
	defaultValue?: string | number;
	/** Whether the input has an error */
	hasError?: boolean;
	/** Whether the input should focus on load */
	autoFocus?: boolean;
	/** input autocompletion type (HTML input attribute) */
	autoComplete?: string;
	/** HTML input name */
	inputName?: string;
	/** Custom component to show on the right of the input, it occupies 56x42 px */
	CustomIcon?: React.ComponentType<{ hasError: boolean; hasFocus: boolean; disabled: boolean }>;
	/** input type attribute */
	type?: string;
	/** hide the inputs bottom line
	 * @deprecated
	 * */
	hideBorder?: boolean;
	/** on Enter key callback */
	onEnter?: (e: KeyboardEvent) => void;
	/** Description of the input */
	description?: string;
}

type Input = React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLDivElement>> & {
	_newId?: number;
};

const Input: Input = React.forwardRef<HTMLDivElement, InputProps>(function InputFn(
	{
		autoFocus = false,
		autoComplete = 'off',
		borderColor = INPUT_DIVIDER_COLOR,
		backgroundColor = INPUT_BACKGROUND_COLOR,
		defaultValue,
		disabled = false,
		textColor = 'text',
		label,
		inputRef = null,
		value,
		CustomIcon,
		onChange,
		hasError = false,
		inputName,
		type = 'text',
		hideBorder = false,
		onEnter,
		description,
		...rest
	},
	ref
) {
	const [hasFocus, setHasFocus] = useState(false);
	const innerRef = useCombinedRefs<HTMLInputElement>(inputRef);
	const [id] = useState(() => {
		if (!Input._newId) {
			Input._newId = 0;
		}
		// eslint-disable-next-line no-plusplus
		return `input-${Input._newId++}`;
	});

	const onInputFocus = useCallback(() => {
		if (!disabled && innerRef?.current) {
			setHasFocus(true);
			innerRef.current.focus();
		}
	}, [innerRef, disabled]);

	const onInputBlur = useCallback(() => {
		setHasFocus(false);
	}, []);

	const keyboardEvents = useMemo<KeyboardPresetObj[]>(() => {
		const events: KeyboardPresetObj[] = [];
		if (onEnter) {
			events.push({
				type: 'keyup',
				callback: onEnter,
				keys: [{ key: 'Enter', ctrlKey: false }],
				haveToPreventDefault: true
			});
		}
		return events;
	}, [onEnter]);

	useKeyboard(innerRef, keyboardEvents);

	const dividerColor = useMemo<DividerProps['color']>(
		() =>
			`${
				(hideBorder && 'transparent') ||
				(hasError && 'error') ||
				(hasFocus && 'primary') ||
				borderColor
			}${disabled ? '.disabled' : ''}`,
		[borderColor, disabled, hasError, hasFocus, hideBorder]
	);

	return (
		<Container height="fit" width="fill" crossAlignment="flex-start">
			<InputContainer
				ref={ref}
				orientation="horizontal"
				width="fill"
				height="fit"
				crossAlignment={'center'}
				borderRadius="half"
				background={backgroundColor}
				onClick={onInputFocus}
				$disabled={disabled}
				padding={{ horizontal: '0.75rem' }}
				gap={'0.5rem'}
				{...rest}
			>
				<RelativeContainer
					padding={{ vertical: label ? '0.0625rem' : '0.625rem' }}
					mainAlignment={'flex-end'}
					height={'fill'}
					width={'fill'}
					minHeight={'inherit'}
				>
					<InputEl
						// eslint-disable-next-line jsx-a11y/no-autofocus
						autoFocus={autoFocus || undefined}
						autoComplete={autoComplete || 'off'} // This one seems to be a React quirk, 'off' doesn't really work
						$color={textColor}
						ref={innerRef}
						type={type}
						onFocus={onInputFocus}
						onBlur={onInputBlur}
						id={id}
						name={inputName ?? label}
						defaultValue={defaultValue}
						value={value}
						onChange={onChange}
						disabled={disabled}
						placeholder={label}
					/>
					{label && (
						<Label htmlFor={id} hasFocus={hasFocus} hasError={hasError} disabled={disabled}>
							{label}
						</Label>
					)}
				</RelativeContainer>
				{CustomIcon && (
					<span>
						<CustomIcon hasError={hasError} hasFocus={hasFocus} disabled={disabled} />
					</span>
				)}
			</InputContainer>
			<Divider color={dividerColor} />
			{description !== undefined && (
				<InputDescription
					color={(hasError && 'error') || (hasFocus && 'primary') || 'secondary'}
					disabled={disabled}
				>
					{description}
				</InputDescription>
			)}
		</Container>
	);
});

Input._newId = 0;

export { Input, InputProps };
