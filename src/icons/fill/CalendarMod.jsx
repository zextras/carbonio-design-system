/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';

function SvgCalendarMod(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M17.01 2.997h1.923c1.122 0 2.046.924 2.047 2.046v13.89a2.056 2.056 0 01-2.047 2.047H5.044a2.056 2.056 0 01-2.047-2.046V5.043c0-1.123.925-2.046 2.047-2.046h1.88V5.08a.984.984 0 001.967 0V2.997h6.151V5.08a.984.984 0 001.967 0V2.997zm-2.914 8.991a1.827 1.827 0 11-3.655-.001 1.827 1.827 0 013.655.001zm-4.636 0a1.546 1.546 0 11-3.093 0 1.546 1.546 0 013.093 0zm8.148 0a1.265 1.265 0 11-2.53-.001 1.265 1.265 0 012.53.001z"
			/>
		</svg>
	);
}

export default SvgCalendarMod;
