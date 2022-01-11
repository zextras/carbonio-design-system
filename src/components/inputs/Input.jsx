/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/* eslint-disable no-nested-ternary */
import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Container from '../layout/Container';
import Icon from '../basic/Icon';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { Theme } from '../../theme/theme';

const ContainerEl = styled(Container)`
	${(props) =>
		props.disabled &&
		css`
			opacity: 0.5;
		`};
	${({ theme, background, disabled }) =>
		!disabled &&
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
		`};
`;
const InputEl = styled.input`
	border: none !important;
	height: auto !important;
	width: 100%;
	outline: 0;
	background: transparent !important;
	font-size: ${({ theme }) => theme.sizes.font.medium};
	font-weight: ${({ theme }) => theme.fonts.weight.regular};
	font-family: ${({ theme }) => theme.fonts.default};
	color: ${({ theme, color }) => theme.palette[color].regular};
	transition: background 0.2s ease-out;
	padding: ${({ theme }) =>
		`calc(${theme.sizes.padding.large} + ${theme.sizes.padding.extrasmall}) ${theme.sizes.padding.large} ${theme.sizes.padding.small}`}!important;
	${({ hasIcon, theme }) =>
		hasIcon &&
		css`
			padding-right: calc(
				${theme.sizes.padding.large} * 2 + ${theme.sizes.icon.large} + ${theme.sizes.padding.small}
			) !important;
		`}
	&::placeholder {
		color: transparent;
	}
`;

const Label = styled.label`
	position: absolute;
	top: 50%;
	left: ${({ theme }) => theme.sizes.padding.large};
	font-size: ${({ theme }) => theme.sizes.font.medium};
	font-weight: ${({ theme }) => theme.fonts.weight.regular};
	font-family: ${({ theme }) => theme.fonts.default};
	color: ${({ theme, hasError, hasFocus }) =>
		// eslint-disable-next-line no-nested-ternary
		theme.palette[hasError ? 'error' : hasFocus ? 'primary' : 'secondary'].regular};
	transform: translateY(-50%);
	transition: transform 150ms ease-out, font-size 150ms ease-out, top 150ms ease-out,
		left 150ms ease-out;
	pointer-events: none;
	user-select: none;
	max-width: calc(100% - ${({ theme }) => `${theme.sizes.padding.large} * 2`});
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	${({ hasIcon, theme }) =>
		hasIcon &&
		css`
			max-width: calc(
				100% -
					${`${theme.sizes.padding.large} * 3 - ${theme.sizes.icon.large} - ${theme.sizes.padding.small}`}
			);
		`}

	${InputEl}:focus + &,
	${InputEl}:not(:placeholder-shown) + & {
		top: ${({ theme }) => `calc(${theme.sizes.padding.small} - 1px)`};
		transform: translateY(0);
		font-size: ${({ theme }) => theme.sizes.font.small};
	}
`;
const InputUnderline = styled.div`
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 1px;
	background: ${({ theme, color, hideBorder }) =>
		hideBorder ? 'none' : theme.palette[color].regular};
`;

const CustomIconContainer = styled(Container)`
	position: absolute;
	top: 0;
	right: 0;
	width: 56px;
	height: 100%;
`;

const Input = React.forwardRef(function InputFn(
	{
		autoFocus,
		autoComplete,
		borderColor,
		backgroundColor,
		defaultValue,
		disabled,
		textColor,
		label,
		inputRef,
		value,
		CustomIcon,
		onChange,
		hasError,
		inputName,
		type,
		hideBorder,
		...rest
	},
	ref
) {
	const [hasFocus, setHasFocus] = useState(false);
	const innerRef = useRef();
	const comboRef = useCombinedRefs(inputRef, innerRef);
	// eslint-disable-next-line no-plusplus
	const [id] = useState(`input-${Input._newId++}`);

	const onInputFocus = useCallback(() => {
		if (!disabled && comboRef && comboRef.current) {
			setHasFocus(true);
			comboRef.current.focus();
		}
	}, [setHasFocus, comboRef, disabled]);

	const onInputBlur = useCallback(() => setHasFocus(false), [setHasFocus]);

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
				background={backgroundColor}
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
				color={hasError ? 'error' : hasFocus ? 'primary' : borderColor}
			/>
		</ContainerEl>
	);
});

Input.propTypes = {
	/** Input's background color */
	backgroundColor: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.oneOf(Object.keys(Theme.palette))
	]),
	/** whether to disable the Input or not */
	disabled: PropTypes.bool,
	/** Input's text color */
	textColor: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(Object.keys(Theme.palette))]),
	/** Input's bottom border color */
	borderColor: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(Object.keys(Theme.palette))]),
	/** Label of the input, will act (graphically) as placeholder when the input is not focused */
	label: PropTypes.string.isRequired,
	/** input change callback */
	onChange: PropTypes.func,
	/** ref to the input element */
	// eslint-disable-next-line react/forbid-prop-types
	inputRef: PropTypes.object,
	/** value of the input */
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	/** default value of the input */
	defaultValue: PropTypes.string,
	/** Whether or not the input has an error */
	hasError: PropTypes.bool,
	/** Whether or not the input should focus on load */
	autoFocus: PropTypes.bool,
	/** input autocompletion type (HTML input attribute) */
	autoComplete: PropTypes.string,
	/** HTML input name */
	inputName: PropTypes.string,
	/** Custom component to show on the right of the input, it occupy 56x42 px */
	CustomIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
	/** input type attribute */
	type: PropTypes.string,
	/** hide the inputs bottom line */
	hideBorder: PropTypes.bool
};

Input.defaultProps = {
	autoFocus: false,
	autoComplete: 'off',
	backgroundColor: 'gray6',
	disabled: false,
	textColor: 'text',
	borderColor: 'gray2',
	hasError: false,
	type: 'text',
	hideBorder: false
};

Input._newId = 0;

const PasswordInput = React.forwardRef(function PasswordInputFn(props, ref) {
	const [show, setShow] = useState(false);
	const showRef = useRef(show);
	const onShowClick = useCallback((ev) => {
		ev.stopPropagation();
		setShow((s) => {
			showRef.current = !s;
			return !s;
		});
	}, []);
	const CustomIcon = useCallback(
		({ hasError, hasFocus, disabled }) => (
			<Container
				style={{
					cursor: disabled ? 'default' : 'pointer',
					userSelect: 'none'
				}}
				onClick={(ev) => !disabled && onShowClick(ev)}
			>
				<Icon
					icon={showRef.current ? 'EyeOutline' : 'EyeOffOutline'}
					size="large"
					color={hasError ? 'error' : hasFocus ? 'primary' : 'secondary'}
					disabled={disabled}
				/>
			</Container>
		),
		[onShowClick]
	);
	return <Input ref={ref} {...props} type={show ? 'text' : 'password'} CustomIcon={CustomIcon} />;
});

PasswordInput.propTypes = Input.PropTypes;

PasswordInput.defaultProps = Input.defaultProps;

PasswordInput._newId = 0;

export { Input, PasswordInput };
