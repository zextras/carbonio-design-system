/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';

function SvgSquare2(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M18 21H6a3 3 0 01-3-3V6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3z" />
		</svg>
	);
}

export default SvgSquare2;
