/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';

function SvgAgenda(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M18.982 20.98H6.992a3.011 3.011 0 01-2.997-2.998v-.999h-.999c-.548 0-.999-.45-.999-.999 0-.548.451-.999 1-.999h.998V8.991h-.999c-.548 0-.999-.45-.999-.999 0-.548.451-.999 1-.999h.998v-.999a3.011 3.011 0 012.997-2.997h11.989a3.011 3.011 0 012.997 2.997v11.988a3.011 3.011 0 01-2.997 2.998zM15.902 8.382l-3.776 4.995-1.629-2.108a1 1 0 00-.789-.386c-.548 0-1 .452-1 1 0 .223.074.44.211.615l2.428 3.107a1 1 0 001.578-.01L17.492 9.6a1.005 1.005 0 10-1.599-1.22h.01z" />
		</svg>
	);
}

export default SvgAgenda;
