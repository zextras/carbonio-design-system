/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useEffect, useState, useRef, useCallback, useContext } from 'react';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Popper from './Popper';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { ThemeContext } from '../../theme/theme-context-provider';

const PopoverContainer = styled.div`
	padding: ${(props) => props.theme.sizes.padding.small};
	border-radius: ${(props) => (props.styleAsModal ? '16px' : props.theme.borderRadius)};
	background-color: ${(props) => props.theme.palette.gray6.regular};
	box-shadow: 0px 0px 4px 0px rgba(166, 166, 166, 0.5);
	max-width: 92vw;
	outline: none;
`;

const Popover = React.forwardRef(function PopoverFn(
	{ children, open, anchorEl, activateOnHover, placement, onClose, styleAsModal, ...rest },
	ref
) {
	const { windowObj } = useContext(ThemeContext);
	const innerRef = useRef(undefined);
	const popoverRef = useCombinedRefs(ref, innerRef);
	const [innerOpen, setInnerOpen] = useState(false);
	const [virtualElement, setVirtualElement] = useState(undefined);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const onMouseMove = useCallback(
		debounce(({ clientX, clientY }) => {
			if (!innerOpen) {
				setVirtualElement({
					x: clientX,
					y: clientY
				});
				setInnerOpen(true);
				onMouseMove.cancel();
				if (anchorEl.current) {
					anchorEl.current.removeEventListener('mousemove', onMouseMove);
				}
			}
		}, 300),
		[innerOpen, anchorEl]
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
		(e) => {
			onMouseMove.cancel();
			if (
				e.relatedTarget !== popoverRef.current &&
				popoverRef.current &&
				!popoverRef.current.contains(e.relatedTarget)
			) {
				closePopover();
			} else if (popoverRef.current) {
				popoverRef.current.addEventListener('mouseleave', (ev) => {
					if (
						ev.toElement !== anchorEl.current &&
						anchorEl.current &&
						!anchorEl.current.contains(ev.toElement)
					) {
						closePopover();
					}
				});
			}
		},
		[closePopover, popoverRef, anchorEl, onMouseMove]
	);

	useEffect(() => {
		if (activateOnHover && anchorEl.current) {
			anchorEl.current.addEventListener('mouseenter', onMouseEnter);
			anchorEl.current.addEventListener('mouseleave', onMouseLeave);
			windowObj.document.addEventListener('scroll', closePopover);
			const anchorSave = anchorEl.current;
			return () => {
				anchorSave.removeEventListener('mouseenter', onMouseEnter);
				anchorSave.removeEventListener('mouseleave', onMouseLeave);
				windowObj.document.removeEventListener('scroll', closePopover);
			};
		}
		return () => undefined;
	}, [anchorEl, activateOnHover, onMouseEnter, onMouseLeave, closePopover, windowObj]);

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

Popover.propTypes = {
	/** Whether to activate the popover on hover of anchorEl. If true, the 'open' prop will be ignored.  */
	activateOnHover: PropTypes.bool,
	/** Whether to style the popover container as a modal component */
	styleAsModal: PropTypes.bool
};
Popover.defaultProps = {
	activateOnHover: false,
	styleAsModal: false
};

export default Popover;
