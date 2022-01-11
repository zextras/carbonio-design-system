/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';

function SvgCinemaView(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M18.984 2.997H4.998A2.008 2.008 0 003 4.995v3.996c0 1.096.902 1.998 1.998 1.998h13.986a2.008 2.008 0 001.998-1.998V4.995a2.008 2.008 0 00-1.998-1.998zM8.994 12.987H4.998A2.008 2.008 0 003 14.985v3.997c0 1.096.902 1.998 1.998 1.998h3.996a2.008 2.008 0 001.998-1.998v-3.997a2.008 2.008 0 00-1.998-1.998zM18.979 12.987h-3.997a2.008 2.008 0 00-1.998 1.998v3.997c0 1.096.902 1.998 1.998 1.998h3.997a2.008 2.008 0 001.998-1.998v-3.997a2.008 2.008 0 00-1.998-1.998z" />
		</svg>
	);
}

export default SvgCinemaView;
