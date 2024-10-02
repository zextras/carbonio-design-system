/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import styled from 'styled-components';

import { Text, TextProps } from '../../basic/text/Text';

const StyledText = styled(Text)<{ size: NonNullable<TextProps['size']> }>`
	line-height: 1.5;
	padding-top: 0.25rem;
	min-height: calc(${({ theme, size }): string => theme.sizes.font[size]} * 1.5);
`;

export const InputDescription = React.forwardRef<HTMLDivElement, TextProps>(
	function InputDescriptionFn(props: TextProps, ref): React.JSX.Element {
		return <StyledText ref={ref} {...props} size={'extrasmall'} overflow={'break-word'} />;
	}
);
