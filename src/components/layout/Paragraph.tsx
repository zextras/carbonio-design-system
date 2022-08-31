/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';
import styled from 'styled-components';

import { Text, TextProps } from '../basic/Text';

const P = styled(Text)`
	line-height: 1.4;
	padding-bottom: 0.8em;

	&:last-child {
		padding-bottom: 0;
	}
`;

type ParagraphProps = TextProps;

const Paragraph = React.forwardRef<HTMLDivElement, ParagraphProps>(function ParagraphFn(
	{ children, ...rest },
	ref
) {
	return (
		<P ref={ref} {...rest}>
			{children}
		</P>
	);
});

Paragraph.defaultProps = {
	overflow: 'break-word'
};

export { Paragraph, ParagraphProps };
