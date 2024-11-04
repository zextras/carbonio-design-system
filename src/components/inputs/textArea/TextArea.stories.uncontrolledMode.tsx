/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback, useRef } from 'react';

import styled from 'styled-components';

import { TextArea, TextAreaProps } from './TextArea';
import { Container } from '../../layout/Container';

const StyledParagraph = styled.p`
	border: 1px solid gray;
	width: 100%;
	min-height: 1.5rem;
`;

export const UncontrolledTextArea = (): React.JSX.Element => {
	const printContentPRef = useRef<HTMLParagraphElement | null>(null);

	const onInput = useCallback<NonNullable<TextAreaProps['onInput']>>((event) => {
		if (printContentPRef.current) {
			printContentPRef.current.textContent = event.currentTarget.value;
		}
	}, []);

	return (
		<Container gap={'0.5rem'} crossAlignment={'flex-start'}>
			<TextArea
				label={'Label for the textarea'}
				description={'Description to describe what is this textarea meant for'}
				defaultValue={'Default value for the text area'}
				onInput={onInput}
			/>
			<StyledParagraph ref={printContentPRef}>Type something</StyledParagraph>
		</Container>
	);
};
