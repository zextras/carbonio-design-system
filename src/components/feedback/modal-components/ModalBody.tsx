/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { HTMLAttributes } from 'react';

import styled, { css } from 'styled-components';

import { With$Prefix } from '../../../types/utils';

interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
	/** Max height of the body container */
	maxHeight?: string;
	/** Align text to the center */
	centered?: boolean;
}

const ModalBodyComponent = styled.div<With$Prefix<ModalBodyProps>>`
	overflow-y: auto;
	max-height: ${({ $maxHeight }): string | undefined => $maxHeight};
	max-width: 100%;
	box-sizing: border-box;
	width: 100%;
	padding-top: ${({ theme }): string => theme.sizes.padding.large};
	padding-bottom: ${({ theme }): string => theme.sizes.padding.large};
	${({ $centered }): ReturnType<typeof css> | false | undefined =>
		$centered &&
		css`
			text-align: center;
		`};
	&::-webkit-scrollbar {
		width: 0.5rem;
	}

	&::-webkit-scrollbar-track {
		background-color: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background-color: ${({ theme }): string => theme.palette.gray3.regular};
		border-radius: 0.25rem;
	}
	flex-grow: 1;
`;

const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(function ModalBodyFn(
	{ maxHeight, centered, children, ...rest },
	ref
) {
	return (
		<ModalBodyComponent $centered={centered} $maxHeight={maxHeight} ref={ref} {...rest}>
			{children}
		</ModalBodyComponent>
	);
});

export { ModalBody, ModalBodyProps };
