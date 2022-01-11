/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useScreenMode } from '../../hooks/useScreenMode';

function Responsive({ children, mode, target }) {
	const screenMode = useScreenMode(target || window);
	return <>{screenMode === mode && children}</>;
}

Responsive.propTypes = {
	/** Whether the component's children should be displayed on mobile or desktop mode */
	mode: PropTypes.oneOf(['desktop', 'mobile']).isRequired,
	/** The Window element to use to determine the screenMode */
	// eslint-disable-next-line react/forbid-prop-types
	target: PropTypes.object
};

Responsive.defaultProps = {
	target: undefined
};

export default Responsive;
