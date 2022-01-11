/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';

function SvgWeekView(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M14.985 3.996v-.999c0-.548.451-.999 1-.999.547 0 .998.451.998 1v.998h1a3.011 3.011 0 012.997 2.997v11.989a3.011 3.011 0 01-2.998 2.997H5.994a3.011 3.011 0 01-2.997-2.997V6.992a3.011 3.011 0 012.997-2.997h1v-.999A1.004 1.004 0 018.043 2a.985.985 0 01.645.285c.19.186.302.446.302.713v1h5.994zm1.497 6.987a1 1 0 00-1.998 0v6a1 1 0 001.998 0v-6zm-6.99 0a1 1 0 00-1.997 0v6a1 1 0 001.998 0v-6zm3.495 0a1 1 0 00-1.998 0v6a1 1 0 001.998 0v-6z" />
		</svg>
	);
}

export default SvgWeekView;
