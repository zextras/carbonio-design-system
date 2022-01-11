/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';

function SvgReadReceipt(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M19.326 3.996c.44 0 .855.107 1.22.297l-8.583 8.584-2.825-2.826a.998.998 0 10-1.413 1.413l3.532 3.532c.28.28.714.368 1.082.219.125-.05.235-.126.33-.22l9.177-9.176c.086.261.133.54.133.83v10.679a2.654 2.654 0 01-2.653 2.652H4.651a2.654 2.654 0 01-2.653-2.652V6.648a2.654 2.654 0 012.653-2.652h14.675z"
			/>
		</svg>
	);
}

export default SvgReadReceipt;
