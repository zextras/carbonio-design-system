/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { VirtualElement } from '@popperjs/core';
import React, { useEffect, useState, useCallback, useMemo, useContext } from 'react';
import { debounce } from 'lodash';
import styled from 'styled-components';
import { Popper, PopperProps } from './Popper';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { ThemeContext } from '../../theme/theme-context-provider';

const PopoverContainer = styled.div<{ styleAsModal: boolean }>`
	padding: ${({ theme }): string => theme.sizes.padding.small};
	border-radius: ${({ styleAsModal, theme }): string =>
		styleAsModal ? '16px' : theme.borderRadius};
	background-color: ${({ theme }): string => theme.palette.gray6.regular};
	box-shadow: 0 0 4px 0 rgba(166, 166, 166, 0.5);
	max-width: 92vw;
	outline: none;
`;

interface PopoverProps extends PopperProps {
	/** Whether to activate the popover on hover of anchorEl. If true, the 'open' prop will be ignored.  */
	activateOnHover?: boolean;
	/** Whether to style the popover container as a modal component */
	styleAsModal?: boolean;
}

const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(function PopoverFn(
	{
		children,
		open,
		anchorEl,
		activateOnHover = false,
		placement,
		onClose,
		styleAsModal = false,
		...rest
	},
	ref
) {
	const { windowObj } = useContext(ThemeContext);
	const popoverRef = useCombinedRefs<HTMLDivElement>(ref);
	const [innerOpen, setInnerOpen] = useState(false);
	const [virtualElement, setVirtualElement] =
		useState<ReturnType<VirtualElement['getBoundingClientRect']>>();

	const onMouseMove = useMemo(
		() =>
			debounce(({ clientX, clientY }: MouseEvent) => {
				if (!innerOpen) {
					setVirtualElement({
						height: 0,
						width: 0,
						top: clientY,
						right: clientX,
						bottom: clientY,
						left: clientX,
						x: clientX,
						y: clientY,
						toJSON: (): unknown => undefined
					});
					setInnerOpen(true);
					onMouseMove.cancel();
					if (anchorEl.current) {
						anchorEl.current.removeEventListener('mousemove', onMouseMove);
					}
				}
			}, 300),
		[anchorEl, innerOpen]
	);

	const closePopover = useCallback(() => {
		setInnerOpen(false);
		onMouseMove.cancel();
		if (anchorEl.current) {
			anchorEl.current.removeEventListener('mousemove', onMouseMove);
		}
	}, [onMouseMove, anchorEl]);

	const innerOnClose = useCallback(() => {
		!activateOnHover && onClose();
	}, [activateOnHover, onClose]);

	const onMouseEnter = useCallback(
		() =>
			!innerOpen && anchorEl.current && anchorEl.current.addEventListener('mousemove', onMouseMove),
		[innerOpen, onMouseMove, anchorEl]
	);
	const onMouseLeave = useCallback(
		(e: MouseEvent) => {
			onMouseMove.cancel();
			if (
				e.relatedTarget !== popoverRef.current &&
				popoverRef.current &&
				!popoverRef.current.contains(e.relatedTarget as Node | null)
			) {
				closePopover();
			} else if (popoverRef.current) {
				popoverRef.current.addEventListener('mouseleave', (ev) => {
					if (
						ev.target !== anchorEl.current &&
						anchorEl.current &&
						!anchorEl.current.contains(ev.target as Node | null)
					) {
						closePopover();
					}
				});
			}
		},
		[closePopover, popoverRef, anchorEl, onMouseMove]
	);

	useEffect(() => {
		const anchorElement = anchorEl.current;
		if (activateOnHover && anchorElement) {
			anchorElement.addEventListener('mouseenter', onMouseEnter);
			anchorElement.addEventListener('mouseleave', onMouseLeave);
			windowObj.document.addEventListener('scroll', closePopover);
		}
		return (): void => {
			anchorElement && anchorElement.removeEventListener('mouseenter', onMouseEnter);
			anchorElement && anchorElement.removeEventListener('mouseleave', onMouseLeave);
			windowObj.document.removeEventListener('scroll', closePopover);
		};
	}, [anchorEl, activateOnHover, onMouseEnter, onMouseLeave, closePopover, windowObj.document]);

	return (
		<Popper
			ref={popoverRef}
			open={activateOnHover ? innerOpen : open}
			anchorEl={anchorEl}
			virtualElement={virtualElement}
			placement={activateOnHover ? 'top-end' : placement}
			onClose={innerOnClose}
			{...rest}
		>
			<PopoverContainer styleAsModal={styleAsModal}>{children}</PopoverContainer>
		</Popper>
	);
});

export { Popover, PopoverProps };
