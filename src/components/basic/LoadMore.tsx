/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { Container, ContainerProps } from '../layout/Container';
import { Text, TextProps } from './Text';
import { Icon } from './Icon';
import { Padding } from '../layout/Padding';

const CustomText = styled(Text)`
	user-select: none;
`;

interface LoadMoreProps extends ContainerProps {
	label?: TextProps['children'];
}

const LoadMore = React.forwardRef<HTMLDivElement, LoadMoreProps>(function LoadMoreFn(
	{ label, ...rest },
	ref
) {
	return (
		<Container ref={ref} orientation="horizontal" width="fill" height="40px" {...rest}>
			<Icon icon="Sync" />
			{label && (
				<Padding left="small">
					<CustomText>{label}</CustomText>
				</Padding>
			)}
		</Container>
	);
});

export { LoadMore, LoadMoreProps };
