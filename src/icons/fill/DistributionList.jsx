/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';

function SvgDistributionList(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M18.992 3c1.646 0 3 1.354 3 3v12c0 1.646-1.354 3-3 3h-12c-1.646 0-3-1.354-3-3v-1h-1c-.548 0-1-.451-1-1 0-.549.452-1 1-1h1V9h-1c-.548 0-1-.451-1-1 0-.549.452-1 1-1h1V6c0-1.646 1.354-3 3-3h12zm-8.128 11.498a1 1 0 000 2h6.006a1 1 0 000-2h-6.006zm0-3.498a1 1 0 000 2h6.006a1 1 0 000-2h-6.006zm0-3.498a1 1 0 000 2h6.006a1 1 0 000-2h-6.006z" />
		</svg>
	);
}

export default SvgDistributionList;
