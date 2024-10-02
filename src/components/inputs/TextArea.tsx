/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, {
	TextareaHTMLAttributes,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react';

import styled, { css, DefaultTheme } from 'styled-components';

import { InputContainer } from './commons/InputContainer';
import { InputDescription } from './commons/InputDescription';
import { InputLabel } from './commons/InputLabel';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { getColor } from '../../theme/theme-utils';
import { TextProps } from '../basic/text/Text';
import { INPUT_BACKGROUND_COLOR, INPUT_DIVIDER_COLOR } from '../constants';
import { Container } from '../layout/Container';
import { Divider, DividerProps } from '../layout/divider/Divider';

type HTMLTextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

interface AdjustHeightTextAreaProps extends HTMLTextAreaProps {
	hasLabel: boolean;
	maxHeight?: string;
	color: string;
}

interface TextAreaProps extends HTMLTextAreaProps {
	/** Description - helper text */
	description?: string;
	/** Error state */
	hasError?: boolean;
	/** Ref for the textarea element */
	textAreaRef?: React.Ref<HTMLTextAreaElement> | null;
	/** Label for the textarea */
	label?: string;
	/** Background color for the textarea */
	backgroundColor?: string | keyof DefaultTheme['palette'];
	/** Color for the text */
	textColor?: string;
	/** Max height for the text area, limit beyond which the scroll is enabled */
	maxHeight?: string;
	/** Divider color */
	borderColor?: string | keyof DefaultTheme['palette'];
}

type TextArea = ReturnType<typeof React.forwardRef<HTMLDivElement, TextAreaProps>> & {
	_newId?: number;
};

const StyledTextArea = styled.textarea<{ $color: string }>`
	resize: none;
	width: 100%;
	max-height: 100%;
	overflow-y: hidden;
	outline: none;
	background: transparent;
	font-size: ${({ theme }): string => theme.sizes.font.medium};
	font-weight: ${({ theme }): number => theme.fonts.weight.regular};
	font-family: ${({ theme }): string => theme.fonts.default};
	line-height: 1.5;
	border: none;
	padding: 0;
	margin: 0;

	&:disabled {
		color: ${({ theme, $color }): string => getColor(`${$color}.disabled`, theme)};
	}

	&::placeholder {
		color: transparent;
		font-size: 0;
		user-select: none;
	}
`;

const GrowContainer = styled.div<{ $hasLabel: boolean; $maxHeight?: string }>`
	width: 100%;
	height: auto;
	margin-top: ${({ $hasLabel, theme }): ReturnType<typeof css> | string =>
		$hasLabel ? css`calc(${theme.sizes.font.extrasmall} * 1.5)` : '0px'};
	max-height: ${({ $maxHeight }): string | undefined => $maxHeight};
	overflow-y: auto;
	font-size: ${({ theme }): string => theme.sizes.font.medium};
	font-weight: ${({ theme }): number => theme.fonts.weight.regular};
	font-family: ${({ theme }): string => theme.fonts.default};
	line-height: 1.5;
	/** set cursor auto so that the scrollbar keep the default cursor and not the text one */
	cursor: auto;

	/* easy way to plop the elements on top of each other and have them both sized based on the tallest one's height */
	display: grid;

	&::after {
		/* Note the weird space! Needed to prevent jumpy behavior */
		content: attr(data-replicated-value) ' ';
		/* This is how textarea text behaves */
		white-space: pre-wrap;
		/* Hidden from view, clicks, and screen readers */
		visibility: hidden;
	}

	& > textarea,
	&::after {
		/* Place on top of each other */
		grid-area: 1 / 1 / 2 / 2;
	}

	&::-webkit-scrollbar {
		width: 0.5rem;
	}

	&::-webkit-scrollbar-track {
		background-color: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background-color: ${({ theme }): string => theme.palette.gray2.regular};
		border-radius: 0.25rem;
	}
`;

const AdjustHeightTextArea = React.forwardRef<HTMLTextAreaElement, AdjustHeightTextAreaProps>(
	function AdjustTextAreaHeightFn({ hasLabel, maxHeight, onInput, color, ...props }, ref) {
		const { value, defaultValue } = props;
		const containerRef = useRef<HTMLDivElement>(null);
		const textAreaRef = useCombinedRefs<HTMLTextAreaElement>(ref);

		const resizeTextArea = useCallback(() => {
			if (containerRef.current) {
				containerRef.current.dataset.replicatedValue = textAreaRef.current?.value ?? '';
			}
		}, [textAreaRef]);

		useEffect(() => {
			// resize text area when value or default value change
			resizeTextArea();
		}, [resizeTextArea, value, defaultValue]);

		const onInputHandler = useCallback<NonNullable<HTMLTextAreaProps['onInput']>>(
			(event) => {
				resizeTextArea();
				onInput?.(event);
			},
			[resizeTextArea, onInput]
		);

		return (
			<GrowContainer $hasLabel={hasLabel} $maxHeight={maxHeight} ref={containerRef}>
				<StyledTextArea
					{...props}
					$color={color}
					onInput={onInputHandler}
					rows={1}
					ref={textAreaRef}
				/>
			</GrowContainer>
		);
	}
);

const Label = styled(InputLabel)<{ $textAreaHasValue: boolean }>`
	${InputContainer}:focus-within & {
		top: 0.0625rem;
		transform: translateY(0);
		font-size: ${({ theme }): string => theme.sizes.font.extrasmall};
	}
	${({ $textAreaHasValue, theme }): ReturnType<typeof css> | false =>
		$textAreaHasValue &&
		css`
			top: 0.0625rem;
			transform: translateY(0);
			font-size: ${theme.sizes.font.extrasmall};
		`};
`;

const RelativeContainer = styled(Container)`
	position: relative;
`;

const TextArea: TextArea = React.forwardRef<HTMLDivElement, TextAreaProps>(function TextAreaFn(
	{
		maxHeight = '10.313rem',
		hasError,
		textAreaRef = null,
		label,
		description,
		backgroundColor = INPUT_BACKGROUND_COLOR,
		textColor = 'text',
		borderColor = INPUT_DIVIDER_COLOR,
		...props
	},
	ref
) {
	const { defaultValue, value, onInput, disabled, onFocus, onBlur } = props;
	const innerTextAreaRef = useCombinedRefs(textAreaRef);
	const [hasFocus, setHasFocus] = useState(false);
	const [textAreaHasValue, setTextAreaHasValue] = useState(!!defaultValue || !!value);

	useEffect(() => {
		setTextAreaHasValue(!!defaultValue || !!value);
	}, [defaultValue, value]);

	const [id] = useState<string>(() => {
		if (TextArea._newId === undefined) {
			TextArea._newId = 0;
		}
		TextArea._newId += 1;
		return `textarea-${TextArea._newId}`;
	});

	const onTextAreaFocus = useCallback<NonNullable<HTMLTextAreaProps['onFocus']>>(
		(event) => {
			if (!disabled && innerTextAreaRef.current) {
				setHasFocus(true);
			}
			onFocus?.(event);
		},
		[disabled, innerTextAreaRef, onFocus]
	);

	const onTextAreaBlur = useCallback<NonNullable<HTMLTextAreaProps['onBlur']>>(
		(event) => {
			setHasFocus(false);
			onBlur?.(event);
		},
		[onBlur]
	);

	const onTextAreaInput = useCallback<NonNullable<HTMLTextAreaProps['onInput']>>(
		(event) => {
			setTextAreaHasValue(!!event.currentTarget.value);
			onInput?.(event);
		},
		[onInput]
	);

	const forceFocusOnTextArea = useCallback(() => {
		if (!disabled && innerTextAreaRef.current) {
			setHasFocus(true);
			innerTextAreaRef.current.focus();
		}
	}, [disabled, innerTextAreaRef]);

	const dividerColor = useMemo<DividerProps['color']>(
		() =>
			`${(hasError && 'error') || (hasFocus && 'primary') || borderColor}${
				disabled ? '.disabled' : ''
			}`,
		[borderColor, disabled, hasError, hasFocus]
	);

	const descriptionColor = useMemo<TextProps['color']>(
		() => (hasError && 'error') || (hasFocus && 'primary') || 'secondary',
		[hasError, hasFocus]
	);

	return (
		<Container height="fit" width="fill" crossAlignment="flex-start" ref={ref}>
			<InputContainer
				orientation="horizontal"
				width="fill"
				height="fit"
				crossAlignment={label ? 'flex-end' : 'center'}
				borderRadius="half"
				background={backgroundColor}
				onClick={forceFocusOnTextArea}
				$disabled={disabled}
				padding={{ horizontal: '0.75rem' }}
				gap={'0.5rem'}
			>
				<RelativeContainer
					padding={{ vertical: label ? '0.0625rem' : '0.625rem' }}
					mainAlignment={'flex-end'}
					height={'fill'}
					width={'fill'}
					minHeight={'inherit'}
				>
					<AdjustHeightTextArea
						maxHeight={maxHeight}
						placeholder={label}
						color={textColor}
						{...props}
						id={id}
						ref={innerTextAreaRef}
						onInput={onTextAreaInput}
						onFocus={onTextAreaFocus}
						onBlur={onTextAreaBlur}
						hasLabel={!!label}
					/>
					{label && (
						<Label
							htmlFor={id}
							hasFocus={hasFocus}
							hasError={hasError}
							disabled={disabled}
							$textAreaHasValue={textAreaHasValue}
						>
							{label}
						</Label>
					)}
				</RelativeContainer>
			</InputContainer>
			<Divider color={dividerColor} />
			{description !== undefined && (
				<InputDescription color={descriptionColor} disabled={disabled}>
					{description}
				</InputDescription>
			)}
		</Container>
	);
});

export { TextArea, TextAreaProps };
