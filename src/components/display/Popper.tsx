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
import styled, { css, SimpleInterpolation } from 'styled-components';
import {
	createPopper,
	OptionsGeneric,
	Placement,
	StrictModifiers,
	VirtualElement
} from '@popperjs/core';
import { Portal } from '../utilities/Portal';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { KeyboardPreset, useKeyboard } from '../../hooks/useKeyboard';
import { ThemeContext } from '../../theme/theme-context-provider';

const PopperContainer = styled.div<{ open: boolean }>`
	display: none;
	${({ open }): SimpleInterpolation =>
		open &&
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
	/** Optional parameter to anchor the popper to a virtual element, defined by his x, y coordinates (ex. {x: 2, y: 2}) */
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
			if (!(popperRef.current && popperRef.current.contains(e.target as Node)) && onClose) {
				onClose();
			}
		},
		[onClose, popperRef]
	);

	const keyboardClosePopper = useCallback(() => {
		!disableRestoreFocus && anchorEl.current && anchorEl.current.focus();
		onClose && onClose();
	}, [anchorEl, disableRestoreFocus, onClose]);

	const onStartSentinelFocus = useCallback(() => {
		const nodeList = wrapperRef.current
			? wrapperRef.current.querySelectorAll<HTMLElement>(
					'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			  )
			: [];
		nodeList.length > 0 && nodeList[nodeList.length - 1].focus();
	}, []);

	const onEndSentinelFocus = useCallback(() => {
		const node =
			wrapperRef.current &&
			wrapperRef.current.querySelector<HTMLElement>(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			);
		node && node.focus();
	}, []);

	const escapeEvent = useMemo<KeyboardPreset>(
		() => [{ type: 'keydown', callback: keyboardClosePopper, keys: ['Escape'] }],
		[keyboardClosePopper]
	);

	useKeyboard(popperRef, escapeEvent);

	useLayoutEffect(() => {
		if (open) {
			const popperOptions: Pick<OptionsGeneric<StrictModifiers>, 'placement' | 'modifiers'> = {
				placement,
				modifiers: [
					{
						name: 'offset',
						options: {
							offset: [0, 8]
						}
					}
				]
			};

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
						x: virtualElement.x,
						toJSON: (): unknown => undefined
					})
				};
				if (!virtualEl) {
					popperOptions.modifiers.push({
						name: 'flip',
						options: {
							fallbackPlacements: ['bottom']
						}
					});
				}
				const popperInstance =
					popperRef.current &&
					createPopper<StrictModifiers>(
						virtualEl || anchorElement,
						popperRef.current,
						popperOptions
					);
				return (): void => {
					popperInstance && popperInstance.destroy();
				};
			}
		}
		return (): void => undefined;
	}, [open, placement, anchorEl, virtualElement, popperRef]);

	useEffect(() => {
		if (open) {
			setTimeout(() => {
				windowObj.document.addEventListener('click', closePopper);
			}, 1);
		}
		return (): void => {
			windowObj.document.removeEventListener('click', closePopper);
		};
	}, [open, closePopper, windowObj.document]);

	useEffect(() => {
		const startSentinelRefSave = startSentinelRef.current;
		const endSentinelRefSave = endSentinelRef.current;
		if (open) {
			wrapperRef.current && wrapperRef.current.focus();
			startSentinelRefSave && startSentinelRefSave.addEventListener('focus', onStartSentinelFocus);
			endSentinelRefSave && endSentinelRefSave.addEventListener('focus', onEndSentinelFocus);
		}

		return (): void => {
			startSentinelRefSave &&
				startSentinelRefSave.removeEventListener('focus', onStartSentinelFocus);
			endSentinelRefSave && endSentinelRefSave.removeEventListener('focus', onEndSentinelFocus);
		};
	}, [open, startSentinelRef, endSentinelRef, onStartSentinelFocus, onEndSentinelFocus]);

	return (
		<Portal show={open} disablePortal={disablePortal}>
			<PopperContainer ref={popperRef} open={open} data-testid="popper" {...rest}>
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
