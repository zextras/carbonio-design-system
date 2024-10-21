/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import styled from 'styled-components';

import { Text, TextProps } from '../basic/text/Text';

const StyledText = styled(Text)`
	padding-bottom: 0.8em;

	&:last-child {
		padding-bottom: 0;
	}
`;

type ParagraphProps = TextProps;

const Paragraph = React.forwardRef<HTMLDivElement, ParagraphProps>(function ParagraphFn(
	{ children, overflow = 'break-word', ...rest },
	ref
) {
	return (
		<StyledText ref={ref} overflow={overflow} lineHeight={1.4} {...rest}>
			{children}
		</StyledText>
	);
});

export { Paragraph, ParagraphProps };
