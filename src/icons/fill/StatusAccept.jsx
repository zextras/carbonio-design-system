/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';

function SvgStatusAccept(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M15 4v-.999c0-.549.451-1 1-1 .549 0 1 .451 1 1v1h1c1.646 0 3 1.354 3 3v12c0 1.646-1.354 3-3 3H6c-1.646 0-3-1.354-3-3v-12c0-1.646 1.354-3 3-3h1V3a1.006 1.006 0 01.751-.968.991.991 0 01.946.254C8.888 2.474 9 2.733 9 3v1h6zm-.334 6.75a1.005 1.005 0 00-1.41.09l-1.87 2.15-.63-.71a1.003 1.003 0 00-1.5 1.33l1.39 1.56c.19.211.464.332.75.33a1 1 0 00.74-.34l2.61-3a1.005 1.005 0 00-.08-1.41z" />
		</svg>
	);
}

export default SvgStatusAccept;
