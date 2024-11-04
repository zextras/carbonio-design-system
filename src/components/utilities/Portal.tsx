/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import ReactDOM from 'react-dom';
import { useTheme } from 'styled-components';

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
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	_ref
): React.ReactElement | null {
	const { windowObj } = useTheme();

	if (!show) return null;

	if (disablePortal) return children;

	return ReactDOM.createPortal(children, container ?? windowObj.document.body);
});

export { Portal, PortalProps };
