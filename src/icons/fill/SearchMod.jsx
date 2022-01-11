/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';

function SvgSearchMod(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M18.327 19.683a9.93 9.93 0 01-6.354 2.288C6.468 21.971 2 17.503 2 11.998c0-5.504 4.468-9.972 9.973-9.972 5.504 0 9.972 4.468 9.972 9.973a9.92 9.92 0 01-2.24 6.294l2.006 2.006a.978.978 0 11-1.384 1.384l-2-2zM7.83 15.277a1.548 1.548 0 013.093 0 1.548 1.548 0 01-3.093 0zm2.75-3.033a1.829 1.829 0 113.658 0 1.829 1.829 0 01-3.658 0zm3.49-3.093a1.268 1.268 0 112.535.001 1.268 1.268 0 01-2.535-.001z"
			/>
		</svg>
	);
}

export default SvgSearchMod;
