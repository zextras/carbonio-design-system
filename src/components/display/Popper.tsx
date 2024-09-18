/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, {
	useLayoutEffect,
	useEffect,
	useRef,
	useCallback,
	useMemo,
	useContext,
	HTMLAttributes
} from 'react';

import { flip, Placement, VirtualElement, offset, shift, limitShift } from '@floating-ui/dom';
import styled, { css, SimpleInterpolation, ThemeContext } from 'styled-components';

import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { KeyboardPresetObj, useKeyboard } from '../../hooks/useKeyboard';
import { setupFloating } from '../../utils/floating-ui';
import { Portal } from '../utilities/Portal';

const PopperContainer = styled.div<{ $open: boolean }>`
	display: none;
	position: absolute;
	${({ $open }): SimpleInterpolation =>
		$open &&
		css`
			display: block;
			z-index: 99;
		`};
`;

const PopperWrapper = styled.div`
	outline: 0;
`;

interface PopperProps extends HTMLAttributes<HTMLDivElement> {
	/** Whether the popper is open or not */
	open?: boolean;
	/** Ref to the DOM element triggering the popper */
	anchorEl: React.RefObject<HTMLElement>;
	/** Optional parameter to anchor the popper to a virtual element, defined by his x, y coordinates (ex. \{x: 2, y: 2\}) */
	virtualElement?: { x: number; y: number };
	/** Whether to disable the re-focus of Popper trigger */
	disableRestoreFocus?: boolean;
	/** Popper placement relative to the anchorEl */
	placement?: Placement;
	/** Callback for closed Popper */
	onClose: () => void;
	/** Flag to disable the Portal implementation */
	disablePortal?: boolean;
	/** Popper content */
	children: React.ReactNode | React.ReactNode[];
}

const Popper = React.forwardRef<HTMLDivElement, PopperProps>(function PopperFn(
	{
		open = false,
		anchorEl,
		virtualElement,
		disableRestoreFocus = false,
		placement = 'bottom-end',
		onClose,
		children,
		disablePortal = false,
		...rest
	},
	ref
) {
	const { windowObj } = useContext(ThemeContext);
	const popperRef = useCombinedRefs<HTMLDivElement>(ref);
	const wrapperRef = useRef<HTMLDivElement>(null);

	const startSentinelRef = useRef<HTMLDivElement>(null);
	const endSentinelRef = useRef<HTMLDivElement>(null);

	const closePopper = useCallback(
		(e: Event) => {
			if (!popperRef.current?.contains(e.target as Node)) {
				onClose?.();
			}
		},
		[onClose, popperRef]
	);

	const keyboardClosePopper = useCallback(() => {
		!disableRestoreFocus && anchorEl.current?.focus();
		onClose?.();
	}, [anchorEl, disableRestoreFocus, onClose]);

	const onStartSentinelFocus = useCallback(() => {
		const nodeList =
			wrapperRef.current?.querySelectorAll<HTMLElement>(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			) ?? [];
		nodeList.length > 0 && nodeList[nodeList.length - 1].focus();
	}, []);

	const onEndSentinelFocus = useCallback(() => {
		const node = wrapperRef.current?.querySelector<HTMLElement>(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		);
		node?.focus();
	}, []);

	const escapeEvent = useMemo<KeyboardPresetObj[]>(
		() => [
			{ type: 'keydown', callback: keyboardClosePopper, keys: [{ key: 'Escape', ctrlKey: false }] }
		],
		[keyboardClosePopper]
	);

	useKeyboard(popperRef, escapeEvent);

	useLayoutEffect(() => {
		let cleanup: ReturnType<typeof setupFloating>;
		if (open) {
			const anchorElement = anchorEl.current;
			if (anchorElement) {
				const virtualEl = virtualElement && {
					getBoundingClientRect: (): ReturnType<VirtualElement['getBoundingClientRect']> => ({
						width: 0,
						height: 0,
						top: virtualElement.y,
						right: virtualElement.x,
						bottom: virtualElement.y,
						left: virtualElement.x,
						y: virtualElement.y,
						x: virtualElement.x
					})
				};

				if (popperRef.current) {
					cleanup = setupFloating(virtualEl || anchorElement, popperRef.current, {
						placement,
						middleware: [
							offset(8),
							!virtualEl && flip({ fallbackPlacements: ['bottom'] }),
							shift({ limiter: limitShift() })
						]
					});
				}
			}
		}
		return (): void => {
			cleanup?.();
		};
	}, [open, placement, anchorEl, virtualElement, popperRef]);

	useEffect(() => {
		let listenerTimeout: ReturnType<typeof setTimeout>;
		if (open) {
			listenerTimeout = setTimeout(() => {
				windowObj.document.addEventListener('click', closePopper);
			}, 1);
		}
		return (): void => {
			windowObj.document.removeEventListener('click', closePopper);
			listenerTimeout && clearTimeout(listenerTimeout);
		};
	}, [open, closePopper, windowObj]);

	useEffect(() => {
		const startSentinelRefSave = startSentinelRef.current;
		const endSentinelRefSave = endSentinelRef.current;
		if (open) {
			wrapperRef.current?.focus();
			startSentinelRefSave?.addEventListener('focus', onStartSentinelFocus);
			endSentinelRefSave?.addEventListener('focus', onEndSentinelFocus);
		}

		return (): void => {
			startSentinelRefSave?.removeEventListener('focus', onStartSentinelFocus);
			endSentinelRefSave?.removeEventListener('focus', onEndSentinelFocus);
		};
	}, [open, startSentinelRef, endSentinelRef, onStartSentinelFocus, onEndSentinelFocus]);

	return (
		<Portal show={open} disablePortal={disablePortal}>
			<PopperContainer ref={popperRef} $open={open} data-testid="popper" {...rest}>
				<div tabIndex={0} ref={startSentinelRef} />
				<PopperWrapper ref={wrapperRef} tabIndex={-1}>
					{children}
				</PopperWrapper>
				<div tabIndex={0} ref={endSentinelRef} />
			</PopperContainer>
		</Portal>
	);
});

export { Popper, PopperProps };
