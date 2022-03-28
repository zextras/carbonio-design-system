/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, {
	useState,
	useEffect,
	useLayoutEffect,
	useCallback,
	useRef,
	cloneElement
} from 'react';
import { createPopper, Instance, Placement } from '@popperjs/core';
import styled, { css, SimpleInterpolation } from 'styled-components';
import { Portal } from '../utilities/Portal';
import { Text, TextProps } from '../basic/Text';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';

interface TooltipWrapperProps extends TextProps {
	open: boolean;
}
const TooltipWrapper = React.forwardRef<HTMLDivElement, TooltipWrapperProps>(
	function TooltipWrapperFn({ open, children, ...rest }, ref) {
		if (!open) return null;

		return (
			<Text ref={ref} size="medium" {...rest}>
				{children}
			</Text>
		);
	}
);
const TooltipWrapperWithCss = styled(TooltipWrapper)<{ $maxWidth: string }>`
	display: none;
	position: fixed;
	top: -1000px;
	left: -1000px;
	z-index: 5000;

	max-width: ${({ $maxWidth }): string => $maxWidth};
	padding: ${({ theme }): string => theme.sizes.padding.small};
	background: ${({ theme }): string => theme.palette.gray3.regular};
	border-radius: ${({ theme }): string => theme.borderRadius};
	user-select: none;

	${({ open }): SimpleInterpolation =>
		open &&
		css`
			display: block;
		`};
`;

interface TooltipProps extends TextProps {
	/** Tooltip text */
	label: string | undefined;
	/** Tooltip placement */
	placement?: Placement;
	/** Tooltip max-width css property */
	maxWidth?: string;
	/** Whether to disable the tooltip and render only the child component */
	disabled?: boolean;
	/** Flag to disable the Portal implementation */
	disablePortal?: boolean;
	/** Invoked by TextWithTooltip component */
	overflowTooltip?: boolean;
	/** Tooltip trigger */
	children: React.ReactElement;
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(function TooltipFn(
	{
		label = '',
		placement = 'bottom',
		maxWidth = '284px',
		children,
		disabled = false,
		disablePortal = false,
		overflowTooltip = false,
		...rest
	},
	ref
) {
	const [open, setOpen] = useState(false);
	const popperInstanceRef = useRef<Instance>();
	const triggerRef = useRef<HTMLElement>();
	const tooltipRef = useCombinedRefs<HTMLDivElement>(ref);

	const showTooltip = useCallback(() => {
		const triggerElement = triggerRef.current;
		if (triggerElement) {
			const textIsCropped =
				(triggerElement.className.slice(0, 4) === 'Text' &&
					triggerElement.clientWidth < triggerElement.scrollWidth) ||
				triggerElement.clientHeight < triggerElement.scrollHeight;
			if ((textIsCropped && overflowTooltip) || !overflowTooltip) {
				setOpen(true);
			}
		}
	}, [overflowTooltip, triggerRef]);

	const hideTooltip = useCallback(() => setOpen(false), []);

	useLayoutEffect(() => {
		if (open && !disabled && triggerRef.current && tooltipRef.current) {
			popperInstanceRef.current = createPopper(triggerRef.current, tooltipRef.current, {
				placement,
				modifiers: [
					{
						name: 'offset',
						options: {
							offset: [0, 8]
						}
					},
					{
						name: 'flip',
						options: {
							fallbackPlacements: ['bottom', 'top', 'left']
						}
					}
				]
			});
		} else if (popperInstanceRef.current) {
			popperInstanceRef.current.destroy();
		}
	}, [disabled, open, placement, tooltipRef]);

	useEffect(() => {
		// Added timeout to fix Preact weird bug
		setTimeout(() => {
			if (triggerRef.current) {
				triggerRef.current.addEventListener('focus', showTooltip);
				triggerRef.current.addEventListener('blur', hideTooltip);
				triggerRef.current.addEventListener('mouseenter', showTooltip);
				triggerRef.current.addEventListener('mouseleave', hideTooltip);
			}
		}, 1);
		const refSave = triggerRef.current;
		return (): void => {
			if (refSave) {
				refSave.removeEventListener('focus', showTooltip);
				refSave.removeEventListener('blur', hideTooltip);
				refSave.removeEventListener('mouseenter', showTooltip);
				refSave.removeEventListener('mouseleave', hideTooltip);
			}
		};
	}, [triggerRef, showTooltip, hideTooltip]);

	return (
		<>
			{cloneElement(children, { ref: triggerRef })}
			<Portal show={open && !disabled} disablePortal={disablePortal}>
				<TooltipWrapperWithCss ref={tooltipRef} open={open} $maxWidth={maxWidth} {...rest}>
					{label}
				</TooltipWrapperWithCss>
			</Portal>
		</>
	);
});

export { Tooltip, TooltipProps };
