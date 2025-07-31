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
	cloneElement,
	createRef,
	useMemo
} from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { Placement } from '@floating-ui/dom';
import { flip, offset, shift, limitShift } from '@floating-ui/dom';
import { rgba } from 'polished';

import { useCombinedRefs } from '../../../hooks/useCombinedRefs';
import { setupFloating } from '../../../utils/floating-ui';
import type { TextProps } from '../../basic/text/Text';
import { Text } from '../../basic/text/Text';
import { Portal } from '../../utilities/Portal';

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
			<Text ref={ref} size={size} overflow={overflow} data-testid={'tooltip'} {...rest}>
				{children}
			</Text>
		);
	}
);
const TooltipWrapperWithCss = styled(TooltipWrapper)<{ $maxWidth: string }>`
	display: none;
	position: absolute;
	top: -1000px;
	left: -1000px;
	z-index: 5000;

	max-width: ${({ $maxWidth }): string => $maxWidth};
	padding: ${({ theme }): string => theme.sizes.padding.small};
	background: ${({ theme }): string => theme.palette.gray3.regular};
	border-radius: ${({ theme }): string => theme.borderRadius};
	user-select: none;
	box-shadow: 0 0 0.25rem 0 ${({ theme }): string => rgba(theme.palette.gray0.regular, 0.5)};

	${({ open }): ReturnType<typeof css> | false =>
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
	/** Tooltip max-width CSS property */
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
	/** trigger ref that can be used instead of lost children ref caused by cloneElement */
	triggerRef?: React.Ref<HTMLElement>;
}

const isClosestTooltipTarget = (
	tooltipTargetId: string | undefined,
	element: Element | undefined
): boolean => {
	const closestTooltipEl = element?.closest('[data-tooltip-target]');
	const attributesArray = [...(closestTooltipEl?.attributes ?? [])];
	const tooltipTarget = attributesArray.find((el) => el.name === 'data-tooltip-target');
	return tooltipTarget?.value === tooltipTargetId;
};

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
		triggerRef = createRef<HTMLElement>(),
		...rest
	},
	ref
) {
	const [open, setOpen] = useState(false);
	const combinedTriggerRef = useCombinedRefs<HTMLElement>(triggerRef);
	const tooltipRef = useCombinedRefs<HTMLDivElement>(ref);
	const timeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null);
	const tooltipTargetId = useMemo(() => (disabled ? undefined : crypto.randomUUID()), [disabled]);

	const showTooltip = useCallback(
		(event: FocusEvent) => {
			const targetEl = event.target as Element;
			const triggerElement = combinedTriggerRef.current;

			const isClosestTargetTooltipId = isClosestTooltipTarget(tooltipTargetId, targetEl);

			if (triggerElement && isClosestTargetTooltipId) {
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
		},
		[combinedTriggerRef, overflowTooltip, tooltipTargetId, triggerDelay]
	);

	const hideTooltip = useCallback(
		(event: FocusEvent) => {
			const relatedStartElement = event.relatedTarget as Element;

			const isClosestTargetTooltipId = isClosestTooltipTarget(tooltipTargetId, relatedStartElement);

			if (!isClosestTargetTooltipId) {
				setOpen(false);
				timeoutRef.current && clearTimeout(timeoutRef.current);
			}
		},
		[tooltipTargetId]
	);

	useLayoutEffect(() => {
		let cleanup: ReturnType<typeof setupFloating>;
		if (open && !disabled && combinedTriggerRef.current && tooltipRef.current) {
			cleanup = setupFloating(combinedTriggerRef.current, tooltipRef.current, {
				placement,
				middleware: [offset(8), flip({ fallbackPlacements }), shift({ limiter: limitShift() })]
			});
		}
		return (): void => {
			cleanup?.();
		};
	}, [disabled, fallbackPlacements, open, placement, tooltipRef, combinedTriggerRef]);

	useEffect(() => {
		if (combinedTriggerRef.current && !disabled) {
			combinedTriggerRef.current.addEventListener('focus', showTooltip);
			combinedTriggerRef.current.addEventListener('blur', hideTooltip);
			combinedTriggerRef.current.addEventListener('mouseover', showTooltip);
			combinedTriggerRef.current.addEventListener('mouseout', hideTooltip);
		}
		const refSave = combinedTriggerRef.current;
		return (): void => {
			if (refSave) {
				refSave.removeEventListener('focus', showTooltip);
				refSave.removeEventListener('blur', hideTooltip);
				refSave.removeEventListener('mouseover', showTooltip);
				refSave.removeEventListener('mouseout', hideTooltip);
			}
		};
	}, [combinedTriggerRef, showTooltip, hideTooltip, disabled]);

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
			{cloneElement(children, {
				ref: combinedTriggerRef,
				'data-tooltip-target': tooltipTargetId
			})}
			<Portal show={open && !disabled} disablePortal={disablePortal}>
				<TooltipWrapperWithCss ref={tooltipRef} open={open} $maxWidth={maxWidth} {...rest}>
					{label}
				</TooltipWrapperWithCss>
			</Portal>
		</>
	);
});

export type { TooltipProps };
export { Tooltip };
