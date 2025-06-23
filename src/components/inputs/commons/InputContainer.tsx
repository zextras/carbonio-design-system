/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { getColor, pseudoClasses } from '../../../theme/theme-utils';
import type { ContainerProps } from '../../layout/container/Container';
import { Container } from '../../layout/container/Container';
import { transientOptions } from '../../../utils/emotion';

export const InputContainer = styled(Container, transientOptions)<{
	background: NonNullable<ContainerProps['background']>;
	$disabled?: boolean;
}>`
	${({ $disabled, background, theme }): ReturnType<typeof css> =>
		$disabled
			? css`
					background: ${getColor(`${background}.disabled`, theme)};
				`
			: css`
					cursor: text;
					${pseudoClasses(theme, background)}
				`};
	min-height: calc(
		${({ theme }): string => theme.sizes.font.medium} * 1.5 +
			${({ theme }): string => theme.sizes.font.extrasmall} * 1.5 + 0.125rem
	);
`;
