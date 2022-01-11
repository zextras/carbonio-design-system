/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';

function SvgConsole(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M20.98 17.982a2.98 2.98 0 01-.908 2.14 2.978 2.978 0 01-2.08.857H5.994a2.98 2.98 0 01-2.09-.856 2.978 2.978 0 01-.908-2.14V8.99H20.98v8.991zM8.667 11.176a.996.996 0 00-.303-.207.993.993 0 00-1.123.244.98.98 0 00.035 1.354l1.499 1.416L7.276 15.4a.993.993 0 00.037 1.426.98.98 0 001.354-.035l2.012-2.013a.987.987 0 00.395-.795.981.981 0 00-.395-.795l-2.012-2.012zm7.395 3.907h-2.997a.984.984 0 000 1.967h2.997a.984.984 0 000-1.967zm4.918-8.105H2.997v-.984a3.011 3.011 0 012.997-2.997h11.988a3.011 3.011 0 012.998 2.997v.984z" />
		</svg>
	);
}

export default SvgConsole;
