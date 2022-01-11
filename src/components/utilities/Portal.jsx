/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Portal = React.forwardRef(function PortalFn(
	{ children, container, show, disablePortal = false },
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	ref
) {
	if (disablePortal) return children;
	if (!show) return null;

	return ReactDOM.createPortal(children, container || window.top.document.body);
});

Portal.propTypes = {
	/** The children to render into the `container` */
	children: PropTypes.node,
	/**
	 * HTML node where to insert the Portal's children.
	 * The default value is 'window.top.document'.
	 * */
	container: PropTypes.instanceOf(Element),
	/** Flag to show or hide Portal's content */
	show: PropTypes.bool,
	/** Flag to disable the Portal implementation */
	disablePortal: PropTypes.bool
};

Portal.defaultProps = {
	disablePortal: false,
	children: null,
	container: undefined,
	show: false
};

export default Portal;
