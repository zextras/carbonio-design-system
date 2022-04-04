/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Container, ContainerProps } from '../layout/Container';
import { Icon } from '../basic/Icon';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';

const InputEl = styled.input`
	border: none;
	width: 100%;
	outline: 0;
	font-size: ${({ theme }): string => theme.sizes.font.medium};
	font-weight: ${({ theme }): number => theme.fonts.weight.regular};
	font-family: ${({ theme }): string => theme.fonts.default};
`;

const Label = styled.label<{ active: boolean }>`
	position: absolute;
	left: calc(
		${({ theme }): string => theme.sizes.padding.large} +
			${({ theme }): string => theme.sizes.icon.large} + 2px
	);
	font-size: ${({ theme }): string => theme.sizes.font.medium};
	font-weight: ${({ theme }): number => theme.fonts.weight.regular};
	font-family: ${({ theme }): string => theme.fonts.default};
	color: ${({ theme }): string => theme.palette.secondary.regular};
	display: ${({ active }): string => (active ? 'none' : 'block')};
`;

interface SearchInputProps extends ContainerProps {
	onChange?: () => void;
	inputRef?: React.RefObject<HTMLInputElement>;
}

const SearchInput = React.forwardRef<HTMLDivElement, SearchInputProps>(function SearchInputFn(
	{ inputRef = null, onChange, ...rest },
	ref
) {
	const [active, setActive] = useState(false);
	const comboRef = useCombinedRefs<HTMLInputElement>(inputRef);

	const onInputFocus = useCallback(() => {
		setActive(true);
		comboRef.current && comboRef.current.focus();
	}, [setActive, comboRef]);

	const onInputBlur = useCallback(() => setActive(false), [setActive]);

	return (
		<Container
			ref={ref}
			orientation="horizontal"
			width="fill"
			height="fit"
			borderRadius="half"
			background="gray6"
			mainAlignment="baseline"
			padding={{
				vertical: 'small',
				horizontal: 'large'
			}}
			style={{
				cursor: 'text',
				position: 'relative'
			}}
			onClick={onInputFocus}
			{...rest}
		>
			<Label
				htmlFor="search"
				active={active || (comboRef.current !== null && comboRef.current.value !== '')}
			>
				Search
			</Label>
			<Container
				width="fit"
				height="fit"
				padding={{ right: 'small' }}
				style={{ cursor: 'pointer' }}
			>
				<Icon icon="Search" size="large" color={active ? 'primary' : 'secondary'} />
			</Container>
			<InputEl
				ref={comboRef}
				type="text"
				onBlur={onInputBlur}
				id="search"
				name="search"
				onChange={onChange}
			/>
			<Container width="fit" height="fit" style={{ cursor: 'pointer' }} mainAlignment="center">
				<Icon icon="ArrowDown" size="large" color={active ? 'primary' : 'secondary'} />
			</Container>
		</Container>
	);
});

export { SearchInput, SearchInputProps };
