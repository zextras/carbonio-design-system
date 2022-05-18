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
import { createPopper } from '@popperjs/core';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Portal from '../utilities/Portal';
import Text from '../basic/Text';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';

const TooltipWrapper = React.forwardRef(function TooltipWrapperFn(
	{ open, children, label, ...rest },
	ref
) {
	if (!open) return null;

	return (
		<Text ref={ref} size="medium" {...rest}>
			{children}
		</Text>
	);
});
const TooltipWrapperWithCss = styled(TooltipWrapper)`
	display: none;
	position: fixed;
	top: -1000px;
	left: -1000px;
	z-index: 5000;

	max-width: ${(props) => props.maxWidth};
	padding: ${(props) => props.theme.sizes.padding.small};
	background: ${(props) => props.theme.palette.gray3.regular};
	border-radius: ${(props) => props.theme.borderRadius};
	user-select: none;

	${(props) =>
		props.open &&
		css`
			display: block;
		`};
`;

const Tooltip = React.forwardRef(function TooltipFn(
	{
		label,
		placement,
		maxWidth,
		children,
		disabled,
		disablePortal,
		overflowTooltip,
		triggerDelay,
		...rest
	},
	ref
) {
	const [open, setOpen] = useState(undefined);
	const popperInstanceRef = useRef(undefined);
	const triggerRef = useRef(undefined);
	const innerRef = useRef(undefined);
	const tooltipRef = useCombinedRefs(ref, innerRef);
	const timeoutRef = useRef(undefined);

	const showTooltip = useCallback(() => {
		const textIsCropped =
			(triggerRef.current.className.slice(0, 4) === 'Text' &&
				triggerRef.current.clientWidth < triggerRef.current.scrollWidth) ||
			triggerRef.current.clientHeight < triggerRef.current.scrollHeight;
		if ((textIsCropped && overflowTooltip) || !overflowTooltip) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = setTimeout(() => {
				setOpen(true);
			}, triggerDelay);
		}
	}, [overflowTooltip, triggerRef, triggerDelay]);

	const hideTooltip = useCallback(() => {
		setOpen(false);
		clearTimeout(timeoutRef.current);
	}, []);

	useLayoutEffect(() => {
		if (typeof open === 'undefined') return;

		if (open && !disabled) {
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
		} else if (typeof popperInstanceRef.current !== 'undefined') {
			popperInstanceRef.current.destroy();
		}
	}, [disabled, open, placement, tooltipRef]);

	useEffect(() => {
		// Added timeout to fix Preact weird bug
		setTimeout(() => {
			if (triggerRef && triggerRef.current && !disabled) {
				triggerRef.current.addEventListener('focus', showTooltip);
				triggerRef.current.addEventListener('blur', hideTooltip);
				triggerRef.current.addEventListener('mouseenter', showTooltip);
				triggerRef.current.addEventListener('mouseleave', hideTooltip);
			}
		}, 1);
		const refSave = triggerRef.current;
		return () => {
			if (refSave) {
				refSave.removeEventListener('focus', showTooltip);
				refSave.removeEventListener('blur', hideTooltip);
				refSave.removeEventListener('mouseenter', showTooltip);
				refSave.removeEventListener('mouseleave', hideTooltip);
			}
		};
	}, [triggerRef, showTooltip, hideTooltip, disabled]);

	useEffect(
		() => () => {
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
				<TooltipWrapperWithCss ref={tooltipRef} open={open} maxWidth={maxWidth} {...rest}>
					{label}
				</TooltipWrapperWithCss>
			</Portal>
		</>
	);
});

Tooltip.propTypes = {
	/** Tooltip text */
	label: PropTypes.string,
	/** Tooltip placement */
	placement: PropTypes.oneOf([
		'left',
		'left-start',
		'left-end',
		'top',
		'top-start',
		'top-end',
		'right',
		'right-start',
		'right-end',
		'bottom',
		'bottom-start',
		'bottom-end'
	]),
	/** Tooltip max-width css property */
	maxWidth: PropTypes.string,
	/** Whether to disable the tooltip and render only the child component */
	disabled: PropTypes.bool,
	/** Flag to disable the Portal implementation */
	disablePortal: PropTypes.bool,
	/** Invoked by TextWithTooltip component */
	overflowTooltip: PropTypes.bool,
	/** time before tooltip shows, in milliseconds */
	triggerDelay: PropTypes.number
};

Tooltip.defaultProps = {
	placement: 'bottom',
	maxWidth: '284px',
	label: undefined,
	disabled: false,
	disablePortal: false,
	overflowTooltip: false,
	triggerDelay: 500
};

export default Tooltip;
