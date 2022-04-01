/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState, useEffect, useRef, useCallback, useContext, HTMLAttributes } from 'react';
import styled, { css, SimpleInterpolation } from 'styled-components';
import { Text } from '../basic/Text';
import { ThemeContext } from '../../theme/theme-context-provider';

const PlaceholderInline = styled(Text)`
	font-size: ${({ theme }): string => theme.sizes.font.medium};
	color: ${({ theme }): string => theme.palette.secondary.regular};
	user-select: none;
`;

const PlaceholderDefault = styled(PlaceholderInline)`
	position: absolute;
	top: 50%;
	left: 0;
	transform: translateY(-50%);
	transition: transform 150ms ease-out, font-size 150ms ease-out, top 150ms ease-out;
`;

const EmailComposerInputContainer = styled.div<{
	disabled?: boolean;
	active: boolean;
	hasFocus: boolean;
}>`
	width: 100%;
	padding: ${({ theme }): string =>
		`${theme.sizes.padding.extrasmall} ${theme.sizes.padding.large}`};
	box-sizing: border-box;
	cursor: text;
	${({ theme, disabled }): SimpleInterpolation =>
		!disabled &&
		css`
			transition: background 0.2s ease-out;
			&:focus {
				outline: none;
				background: ${theme.palette.gray6.focus};
			}
			&:hover {
				outline: none;
				background: ${theme.palette.gray6.hover};
			}
			&:active {
				outline: none;
				background: ${theme.palette.gray6.active};
			}
		`};
	${({ active, theme }): SimpleInterpolation =>
		active &&
		css`
			${PlaceholderDefault} {
				top: 3px;
				font-size: ${theme.sizes.font.small};
				transform: translateY(0);
			}
		`};

	${({ theme, hasFocus }): SimpleInterpolation =>
		hasFocus &&
		css`
			${PlaceholderDefault},
			${PlaceholderInline} {
				color: ${theme.palette.primary.regular};
			}
		`};
`;

const EmailComposerInputWrapper = styled.div<{ placeholderType: 'default' | 'inline' }>`
	position: relative;
	display: flex;
	align-items: center;
	flex-wrap: ${({ placeholderType }): string =>
		placeholderType === 'default' ? 'wrap' : 'nowrap'};
	padding: ${({ placeholderType, theme }): string =>
		placeholderType === 'default'
			? `${theme.sizes.avatar.small.diameter} 0 0`
			: `calc(${theme.sizes.avatar.small.diameter} / 2) 0 calc(${theme.sizes.avatar.small.diameter} / 2)`};

	> div {
		margin: calc(${({ theme }): string => theme.sizes.padding.extrasmall} / 2);
		margin-left: ${({ placeholderType, theme }): string =>
			placeholderType === 'default' ? '0' : theme.sizes.padding.medium};
	}
`;

const InputContainer = styled.div`
	flex-grow: 1;
	flex-basis: 0;
	max-width: 100%;
	font-family: 'Roboto', sans-serif;
	overflow: hidden;

	> input {
		width: 100%;
		height: ${({ theme }): string =>
			`calc(${theme.sizes.avatar.small.diameter} + ${theme.sizes.padding.extrasmall} * 2)`};
		margin: 0;
		border: none;
		color: ${({ theme }): string => theme.palette.text.regular};
		padding: 0;
		background-color: transparent !important;
		font-size: ${({ theme }): string => theme.sizes.font.medium};
		line-height: ${({ theme }): string =>
			`calc(${theme.sizes.avatar.small.diameter} + ${theme.sizes.padding.extrasmall} * 2)`};

		&:focus {
			outline: none;
		}
	}
`;

interface EmailComposerInputProps extends HTMLAttributes<HTMLDivElement> {
	/** Input's Placeholder */
	placeholder?: string;
	/** Placeholder Type */
	placeholderType?: 'default' | 'inline';
	/** Input's value */
	value?: string;
	/** Callback to call when Input's value changes */
	onChange?: () => void;
}

const EmailComposerInput = React.forwardRef<HTMLDivElement, EmailComposerInputProps>(
	function EmailComposerInputFn(
		{ placeholder = '', placeholderType = 'default', value, onChange, ...rest },
		ref
	) {
		const [active, setActive] = useState(false);
		const [hasFocus, setHasFocus] = useState(false);
		const inputRef = useRef<HTMLInputElement>(null);
		const { windowObj } = useContext(ThemeContext);

		const checkIfSetActive = useCallback(() => {
			setActive(windowObj.document.activeElement === inputRef.current || !!inputRef.current?.value);
		}, [windowObj.document.activeElement]);

		const onFocus = useCallback(() => {
			checkIfSetActive();
			setHasFocus(true);
		}, [checkIfSetActive, setHasFocus]);

		const onBlur = useCallback(() => {
			checkIfSetActive();
			setHasFocus(false);
		}, [checkIfSetActive, setHasFocus]);

		const setFocus = useCallback(() => inputRef.current && inputRef.current.focus(), [inputRef]);

		useEffect(() => {
			checkIfSetActive();
		});

		return (
			<EmailComposerInputContainer
				ref={ref}
				tabIndex={0}
				active={active}
				hasFocus={hasFocus}
				onClick={setFocus}
				role="textbox"
				{...rest}
			>
				<EmailComposerInputWrapper placeholderType={placeholderType}>
					{placeholderType === 'inline' ? (
						<PlaceholderInline>{placeholder}</PlaceholderInline>
					) : (
						<PlaceholderDefault>{placeholder}</PlaceholderDefault>
					)}
					<InputContainer>
						<input
							style={{ transition: 'background 0.2s ease-out' }}
							ref={inputRef}
							onFocus={onFocus}
							onBlur={onBlur}
							onChange={onChange}
							value={value}
						/>
					</InputContainer>
				</EmailComposerInputWrapper>
			</EmailComposerInputContainer>
		);
	}
);

export { EmailComposerInput, EmailComposerInputProps };
