/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useMemo, useRef, useState } from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { KeyboardPreset, useKeyboard } from '../../hooks/useKeyboard';
import { ThemeObj } from '../../theme/theme';
import Container from '../layout/Container';

const ContainerEl = styled(Container)`
	${(props): FlattenSimpleInterpolation | string =>
		(props.disabled &&
			css`
				opacity: 0.5;
			`) ||
		''};
	${({ theme, background, disabled }): FlattenSimpleInterpolation | string =>
		(!disabled &&
			css`
				transition: background 0.2s ease-out;
				&:focus {
					outline: none;
					background: ${theme.palette[background].focus};
				}
				&:hover {
					outline: none;
					background: ${theme.palette[background].hover};
				}
				&:active {
					outline: none;
					background: ${theme.palette[background].active};
				}
			`) ||
		''};
`;

const InputEl = styled.input<{ color: keyof ThemeObj['palette']; hasIcon: boolean }>`
	border: none !important;
	height: auto !important;
	width: 100%;
	outline: 0;
	background: transparent !important;
	font-size: ${({ theme }): string => theme.sizes.font.medium};
	font-weight: ${({ theme }): number => theme.fonts.weight.regular};
	font-family: ${({ theme }): string => theme.fonts.default};
	color: ${({ theme, color }): string => theme.palette[color].regular};
	transition: background 0.2s ease-out;
	padding: ${({ theme }): string =>
		`calc(${theme.sizes.padding.large} + ${theme.sizes.padding.extrasmall}) ${theme.sizes.padding.large} ${theme.sizes.padding.small}`}!important;
	${({ hasIcon, theme }): FlattenSimpleInterpolation | string =>
		(hasIcon &&
			css`
				padding-right: calc(
					${theme.sizes.padding.large} * 2 + ${theme.sizes.icon.large} +
						${theme.sizes.padding.small}
				) !important;
			`) ||
		''}
	&::placeholder {
		color: transparent;
	}
`;

const Label = styled.label<{ hasError: boolean; hasFocus: boolean; hasIcon: boolean }>`
	position: absolute;
	top: 50%;
	left: ${({ theme }): string => theme.sizes.padding.large};
	font-size: ${({ theme }): string => theme.sizes.font.medium};
	font-weight: ${({ theme }): number => theme.fonts.weight.regular};
	font-family: ${({ theme }): string => theme.fonts.default};
	color: ${({ theme, hasError, hasFocus }): string =>
		theme.palette[(hasError && 'error') || (hasFocus && 'primary') || 'secondary'].regular};
	transform: translateY(-50%);
	transition: transform 150ms ease-out, font-size 150ms ease-out, top 150ms ease-out,
		left 150ms ease-out;
	pointer-events: none;
	user-select: none;
	max-width: calc(100% - ${({ theme }): string => `${theme.sizes.padding.large} * 2`});
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	${({ hasIcon, theme }): FlattenSimpleInterpolation | string =>
		(hasIcon &&
			css`
				max-width: calc(
					100% -
						${`${theme.sizes.padding.large} * 3 - ${theme.sizes.icon.large} - ${theme.sizes.padding.small}`}
				);
			`) ||
		''}

	${InputEl}:focus + &,
	${InputEl}:not(:placeholder-shown) + & {
		top: ${({ theme }): string => `calc(${theme.sizes.padding.small} - 1px)`};
		transform: translateY(0);
		font-size: ${({ theme }): string => theme.sizes.font.small};
	}
`;
const InputUnderline = styled.div<{ hideBorder: boolean; color: keyof ThemeObj['palette'] }>`
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 1px;
	background: ${({ theme, color, hideBorder }): string =>
		hideBorder ? 'none' : theme.palette[color].regular};
`;

const CustomIconContainer = styled(Container)`
	position: absolute;
	top: 0;
	right: 0;
	width: 56px;
	height: 100%;
`;

export interface InputProps {
	/** Input's background color */
	backgroundColor?: string;
	/** whether to disable the Input or not */
	disabled?: boolean;
	/** Input's text color */
	textColor?: keyof ThemeObj['palette'];
	/** Input's bottom border color */
	borderColor?: keyof ThemeObj['palette'];
	/** Label of the input, will act (graphically) as placeholder when the input is not focused */
	label: string;
	/** input change callback */
	onChange?: (e: React.SyntheticEvent) => void;
	/** ref to the input element */
	inputRef: React.MutableRefObject<HTMLInputElement>;
	/** value of the input */
	value?: string | number;
	/** default value of the input */
	defaultValue?: string | number;
	/** Whether or not the input has an error */
	hasError?: boolean;
	/** Whether or not the input should focus on load */
	autoFocus?: boolean;
	/** input autocompletion type (HTML input attribute) */
	autoComplete?: string;
	/** HTML input name */
	inputName?: string;
	/** Custom component to show on the right of the input, it occupies 56x42 px */
	CustomIcon?: React.ComponentType<{ hasError: boolean; hasFocus: boolean; disabled: boolean }>;
	/** input type attribute */
	type?: string;
	/** hide the inputs bottom line */
	hideBorder?: boolean;
	/** on Enter key callback */
	onEnter?: (e: KeyboardEvent) => void;
}

type Input = React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLDivElement>> & {
	_newId?: number;
};

const Input: Input = React.forwardRef<HTMLDivElement, InputProps>(function InputFn(
	{
		autoFocus = false,
		autoComplete = 'off',
		borderColor = 'gray2',
		backgroundColor = 'gray6',
		defaultValue,
		disabled = false,
		textColor = 'text',
		label,
		inputRef,
		value,
		CustomIcon,
		onChange,
		hasError = false,
		inputName,
		type = 'text',
		hideBorder = false,
		onEnter,
		...rest
	},
	ref
) {
	const [hasFocus, setHasFocus] = useState(false);
	const innerRef = useRef<HTMLInputElement | null>(null);
	const comboRef = useCombinedRefs<HTMLInputElement>(inputRef, innerRef);
	const [id] = useState(() => {
		if (!Input._newId) {
			Input._newId = 0;
		}
		// eslint-disable-next-line no-plusplus
		return `input-${Input._newId++}`;
	});

	const onInputFocus = useCallback(() => {
		if (!disabled && comboRef && comboRef.current) {
			setHasFocus(true);
			comboRef.current.focus();
		}
	}, [setHasFocus, comboRef, disabled]);

	const onInputBlur = useCallback(() => setHasFocus(false), [setHasFocus]);

	const keyboardEvents = useMemo<KeyboardPreset>(() => {
		const events: KeyboardPreset = [];
		if (onEnter) {
			events.push({
				type: 'keyup',
				callback: onEnter,
				keys: ['Enter'],
				haveToPreventDefault: true,
				modifier: false
			});
		}
		return events;
	}, [onEnter]);

	useKeyboard(comboRef, keyboardEvents);

	return (
		<ContainerEl
			ref={ref}
			orientation="horizontal"
			width="fill"
			height="fit"
			borderRadius="half"
			background={backgroundColor}
			style={{
				cursor: 'text',
				position: 'relative'
			}}
			onClick={onInputFocus}
			disabled={disabled}
			{...rest}
		>
			<InputEl
				// eslint-disable-next-line jsx-a11y/no-autofocus
				autoFocus={autoFocus || undefined}
				autoComplete={autoComplete || 'off'} // This one seems to be a React quirk, 'off' doesn't really work
				color={textColor}
				ref={comboRef}
				type={type}
				onFocus={onInputFocus}
				onBlur={onInputBlur}
				id={id}
				name={inputName || label}
				defaultValue={defaultValue}
				value={value}
				onChange={onChange}
				disabled={disabled}
				placeholder={label}
				hasIcon={!!CustomIcon}
			/>
			<Label htmlFor={id} hasFocus={hasFocus} hasError={hasError} hasIcon={!!CustomIcon}>
				{label}
			</Label>
			{CustomIcon && (
				<CustomIconContainer>
					<CustomIcon hasError={hasError} hasFocus={hasFocus} disabled={disabled} />
				</CustomIconContainer>
			)}
			<InputUnderline
				hideBorder={hideBorder}
				color={(hasError && 'error') || (hasFocus && 'primary') || borderColor}
			/>
		</ContainerEl>
	);
});

Input._newId = 0;

export default Input;
