/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';

function SvgSeries(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M10.99 3.996v-.999c0-.548.45-.999.998-.999s1 .451 1 1v.998h.998a3.011 3.011 0 012.997 2.997v8.055a3.011 3.011 0 01-2.997 2.997H5.932a3.011 3.011 0 01-2.997-2.997V6.993a3.011 3.011 0 012.997-2.997h.999v-.999A1.004 1.004 0 017.98 2a.985.985 0 01.645.285c.191.186.303.446.303.713v1h2.06z" />
			<path d="M18.97 7.992a3.015 3.015 0 012.014 2.83l-.005 8.16a3.011 3.011 0 01-2.997 2.997H9.817a3.015 3.015 0 01-2.824-1.998h10.99c.547 0 .998-.451.998-1L18.97 7.992z" />
		</svg>
	);
}

export default SvgSeries;
