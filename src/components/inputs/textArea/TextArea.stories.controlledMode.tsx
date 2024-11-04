/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback, useState } from 'react';

import styled from 'styled-components';

import { TextArea, TextAreaProps } from './TextArea';
import { Button } from '../../basic/button/Button';
import { Container } from '../../layout/Container';

const StyledParagraph = styled.p`
	border: 1px solid gray;
	width: 100%;
	min-height: 1.5rem;
`;

export const ControlledTextArea = (): React.JSX.Element => {
	const [textAreaValue, setTextAreaValue] = useState<string>('');

	const onChange = useCallback<NonNullable<TextAreaProps['onChange']>>((event) => {
		setTextAreaValue(event.currentTarget.value);
	}, []);

	const veryLongText =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis aliquet ex, ac pellentesque velit. Nunc sed cursus odio. Nam viverra et mauris at maximus. Mauris imperdiet neque nec dolor pretium, elementum posuere ipsum egestas. Maecenas ut sagittis quam. Sed volutpat commodo orci vitae fringilla. Vivamus sapien nisi, viverra non consequat nec, venenatis vitae orci. Nulla sed nisl ut nunc euismod egestas. Maecenas vehicula accumsan nunc quis imperdiet. Pellentesque ut dolor luctus, sodales dolor at, laoreet libero. Quisque vulputate, diam sit amet eleifend malesuada, eros dolor porttitor turpis, ac consectetur augue elit vitae ante. Mauris eget magna quis lacus imperdiet sagittis ut eu est. Sed ligula arcu, maximus vel dictum vel, scelerisque ac eros. Pellentesque eu accumsan nulla. Pellentesque magna justo, laoreet nec ligula vel, varius imperdiet lorem. Nulla facilisi. Vestibulum molestie rutrum justo, sit amet feugiat ex iaculis id. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae iaculis ex. Proin fermentum augue sit amet tincidunt elementum.';

	const setValueFromButton = useCallback(() => {
		setTextAreaValue(veryLongText);
	}, []);

	return (
		<Container gap={'0.5rem'} crossAlignment={'flex-start'}>
			<TextArea
				label={'Label for the textarea'}
				description={'Description to describe what is this textarea meant for'}
				value={textAreaValue}
				onChange={onChange}
			/>
			<StyledParagraph>{textAreaValue || 'Type something'}</StyledParagraph>
			<Button label={'Set value of TextArea'} onClick={setValueFromButton} />
		</Container>
	);
};
