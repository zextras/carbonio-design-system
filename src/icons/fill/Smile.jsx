/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';

function SvgSmile(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M11.988 1.998c-5.48 0-9.99 4.51-9.99 9.99s4.51 9.99 9.99 9.99 9.99-4.51 9.99-9.99-4.51-9.99-9.99-9.99zm1.954 11.944a.984.984 0 011.39 1.39 4.732 4.732 0 01-6.688 0 .984.984 0 011.39-1.39 2.764 2.764 0 003.908 0zm-4.014-4.95a.984.984 0 11-.001 1.967.984.984 0 010-1.968zm4.044 0a.984.984 0 110 1.967.984.984 0 010-1.968z" />
		</svg>
	);
}

export default SvgSmile;
