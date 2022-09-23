/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import styled, { css, SimpleInterpolation } from 'styled-components';

const ModalBody = styled.div.attrs<{
	maxHeight?: string;
	centered?: boolean;
}>(({ maxHeight, centered = false }) => ({
	maxHeight,
	centered
}))<{ maxHeight?: string; centered?: boolean }>`
	overflow-y: auto;
	max-height: ${({ maxHeight }): SimpleInterpolation => maxHeight};
	max-width: 100%;
	box-sizing: border-box;
	width: 100%;
	padding-top: ${({ theme }): string => theme.sizes.padding.large};
	padding-bottom: ${({ theme }): string => theme.sizes.padding.large};
	${({ centered }): SimpleInterpolation =>
		centered &&
		css`
			text-align: center;
		`};
	&::-webkit-scrollbar {
		width: 8px;
	}

	&::-webkit-scrollbar-track {
		background-color: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background-color: ${({ theme }): string => theme.palette.gray3.regular};
		border-radius: 4px;
	}
`;

export { ModalBody };
