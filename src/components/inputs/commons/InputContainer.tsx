/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import styled, { css, SimpleInterpolation } from 'styled-components';

import { getColor, pseudoClasses } from '../../../theme/theme-utils';
import { Container, ContainerProps } from '../../layout/Container';

export const InputContainer = styled(Container)<{
	background: NonNullable<ContainerProps['background']>;
	$disabled?: boolean;
}>`
	${({ $disabled, background, theme }): SimpleInterpolation =>
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
