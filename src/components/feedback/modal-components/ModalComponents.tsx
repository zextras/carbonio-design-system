/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { rgba } from 'polished';
import styled, { css } from 'styled-components';

import { Container } from '../../layout/Container';

const modalMinWidth = {
	extrasmall: '20%',
	small: '25%',
	medium: '35%',
	large: '50%'
};
const modalWidth = {
	extrasmall: '25rem',
	small: '31.25rem',
	medium: '40.625rem',
	large: '50rem'
};

function isBodyOverflowing(modalRef: React.RefObject<HTMLDivElement>, windowObj: Window): boolean {
	if (windowObj) {
		return (
			windowObj.document.body.scrollHeight > (modalRef.current as HTMLDivElement).clientHeight ||
			windowObj.document.body.scrollWidth > windowObj.document.body.clientWidth
		);
	}
	return false;
}

function getScrollbarSize(windowObj: Window): number {
	const scrollDiv = windowObj.document.createElement('div');
	if (scrollDiv && windowObj) {
		scrollDiv.style.width = '99px';
		scrollDiv.style.height = '99px';
		scrollDiv.style.position = 'absolute';
		scrollDiv.style.top = '-9999px';
		scrollDiv.style.overflow = 'scroll';
		windowObj.document.body.appendChild(scrollDiv);
		const scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
		windowObj.document.body.removeChild(scrollDiv);
		return scrollbarSize;
	}
	return 0;
}

const ModalContainer = styled.div<{ $mounted: boolean; $open: boolean; $zIndex: number }>`
	display: flex;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	padding: ${(props): string =>
		`${props.theme.sizes.padding.medium} ${props.theme.sizes.padding.medium} 0`};
	background-color: ${({ theme }): string => theme.palette.transparent.regular};
	opacity: 0;
	pointer-events: none;
	transition: 0.3s ease-out;
	z-index: -1;
	justify-content: center;
	align-items: center;
	overflow-y: auto;

	${({ $mounted, $open, $zIndex }): ReturnType<typeof css> | false =>
		($mounted || $open) &&
		css`
			z-index: ${$zIndex};
		`};
	${({ $open, theme }): ReturnType<typeof css> | false =>
		$open &&
		css`
			background-color: ${rgba(theme.palette.black.regular, 0.5)};
			opacity: 1;
			pointer-events: auto;
		`};
`;

const ModalWrapper = styled.div`
	max-width: 100%;
	width: 100%;
	margin: auto;
	box-sizing: border-box;
	pointer-events: none;
`;

const ModalContent = styled(Container).attrs<{
	$size: keyof typeof modalMinWidth & keyof typeof modalWidth;
}>(({ $size }) => ({
	maxWidth: '100%',
	minWidth: modalMinWidth[$size],
	width: modalWidth[$size],
	padding: '2rem',
	mainAlignment: 'flex-start',
	crossAlignment: 'flex-start',
	height: 'auto',
	tabIndex: -1
}))<{
	$size: keyof typeof modalMinWidth & keyof typeof modalWidth;
}>`
	position: relative;
	margin: 0 auto ${({ theme }): string => theme.sizes.padding.medium};
	border-radius: 1rem;
	box-shadow: ${({ theme }): string => theme.shadows.regular};
	outline: none;
	pointer-events: auto;
`;

export { ModalContent, ModalWrapper, ModalContainer, getScrollbarSize, isBodyOverflowing };
