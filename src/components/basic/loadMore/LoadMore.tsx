/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import styled from '@emotion/styled';

import { Container } from '../../layout/container/Container';
import type { ContainerProps } from '../../layout/container/Container';
import { Padding } from '../../layout/Padding';
import { Icon } from '../icon/Icon';
import type { TextProps } from '../text/Text';
import { Text } from '../text/Text';

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

export type { LoadMoreProps };
export { LoadMore };
