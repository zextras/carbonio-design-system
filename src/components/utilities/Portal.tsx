/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { ThemeContext } from '../../theme/theme-context-provider';

interface PortalProps {
	/** The children to render into the `container` */
	children: React.ReactElement;
	/**
	 * HTML node where to insert the Portal's children.
	 * The default value is 'windowObj.document'.
	 * */
	container?: Element;
	/** Flag to show or hide Portal's content */
	show?: boolean;
	/** Flag to disable the Portal implementation */
	disablePortal?: boolean;
}

const Portal = React.forwardRef<React.ReactPortal, PortalProps>(function PortalFn(
	{ children, container, show = false, disablePortal = false },
	ref
): React.ReactElement | null {
	const { windowObj } = useContext(ThemeContext);

	if (!show) return null;

	if (disablePortal) return children;

	return ReactDOM.createPortal(children, container || windowObj.document.body);
});

export { Portal, PortalProps };
