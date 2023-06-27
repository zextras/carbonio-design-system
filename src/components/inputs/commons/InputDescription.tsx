/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import styled from 'styled-components';

import { Text } from '../../basic/Text';

export const InputDescription = styled(Text).attrs({
	overflow: 'break-word',
	size: 'extrasmall'
})`
	line-height: 1.5;
	padding-block-start: 0.25rem;
	min-height: calc(${({ theme, size }): string => theme.sizes.font[size]} * 1.5);
`;
