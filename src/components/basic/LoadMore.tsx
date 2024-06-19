/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import styled from 'styled-components';

import { Icon } from './icon/Icon';
import { Text, TextProps } from './text/Text';
import { Container, ContainerProps } from '../layout/Container';
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
		<Container ref={ref} orientation="horizontal" width="fill" height="2.5rem" {...rest}>
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
