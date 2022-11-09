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
import { rgba } from 'polished';
import styled, { css, SimpleInterpolation } from 'styled-components';

import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { Text, TextProps } from '../basic/Text';
import { Portal } from '../utilities/Portal';

interface TooltipWrapperProps extends TextProps {
	open: boolean;
}

const TooltipWrapper = React.forwardRef<HTMLDivElement, TooltipWrapperProps>(
	function TooltipWrapperFn(
		{ open, children, size = 'extrasmall', overflow = 'break-word', ...rest },
		ref
	) {
		if (!open) return null;

		return (
			<Text ref={ref} size={size} overflow={overflow} {...rest}>
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
	box-shadow: 0 0 0.25rem 0 ${({ theme }): string => rgba(theme.palette.gray0.regular, 0.5)};

	${({ open }): SimpleInterpolation =>
		open &&
		css`
			display: block;
		`};
`;

interface TooltipProps extends TextProps {
	/** Tooltip text */
	label: string | React.ReactNode | undefined;
	/** Tooltip placement */
	placement?: Placement;
	/** Fallback placements to use when tooltip cannot fit in the primary placement */
	fallbackPlacements?: Placement[];
	/** Tooltip max-width css property */
	maxWidth?: string;
	/** Whether to disable the tooltip and render only the child component */
	disabled?: boolean;
	/** Flag to disable the Portal implementation */
	disablePortal?: boolean;
	/** Show tooltip only when child has class Text and text content is partially hidden */
	overflowTooltip?: boolean;
	/** Tooltip trigger */
	children: React.ReactElement;
	/** time before tooltip shows, in milliseconds */
	triggerDelay?: number;
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(function TooltipFn(
	{
		label = '',
		placement = 'bottom',
		fallbackPlacements = ['bottom', 'top', 'left'],
		maxWidth = '17.75rem',
		children,
		disabled = false,
		disablePortal = false,
		overflowTooltip = false,
		triggerDelay = 500,
		...rest
	},
	ref
) {
	const [open, setOpen] = useState(false);
	const popperInstanceRef = useRef<Instance>();
	const triggerRef = useRef<HTMLElement>();
	const tooltipRef = useCombinedRefs<HTMLDivElement>(ref);
	const timeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null);

	const showTooltip = useCallback(() => {
		const triggerElement = triggerRef.current;
		if (triggerElement) {
			const textIsCropped =
				(triggerElement.className.slice(0, 4) === 'Text' &&
					triggerElement.clientWidth < triggerElement.scrollWidth) ||
				triggerElement.clientHeight < triggerElement.scrollHeight;
			if ((textIsCropped && overflowTooltip) || !overflowTooltip) {
				clearTimeout(timeoutRef.current as ReturnType<typeof setTimeout>);
				timeoutRef.current = setTimeout(() => {
					setOpen(true);
				}, triggerDelay);
			}
		}
	}, [overflowTooltip, triggerRef, triggerDelay]);

	const hideTooltip = useCallback(() => {
		setOpen(false);
		timeoutRef.current && clearTimeout(timeoutRef.current);
	}, []);

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
							fallbackPlacements
						}
					}
				]
			});
		} else if (popperInstanceRef.current) {
			popperInstanceRef.current.destroy();
		}
	}, [disabled, fallbackPlacements, open, placement, tooltipRef]);

	useEffect(() => {
		// Added timeout to fix Preact weird bug
		const timeout = setTimeout(() => {
			if (triggerRef.current && !disabled) {
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
			clearTimeout(timeout);
		};
	}, [triggerRef, showTooltip, hideTooltip, disabled]);

	useEffect(
		() => (): void => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		},
		[]
	);

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
