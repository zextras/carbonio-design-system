/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';

function SvgBoardOpen(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M7.001 8.944V20.98H5.994a3.011 3.011 0 01-2.997-2.998V8.944h4.004zM20.98 6.978H2.997v-.984a3.011 3.011 0 012.997-2.997h11.988a3.011 3.011 0 012.998 2.997v.984zM16.733 15.65l-2.098 2.028a1 1 0 01-.7.32 1 1 0 01-.709-1.708l1.409-1.32-1.257-1.34a1 1 0 111.419-1.409l1.936 2.03a1.004 1.004 0 010 1.398zM8.968 8.943V20.98h9.014a3.012 3.012 0 002.998-2.997V8.944H8.968z" />
		</svg>
	);
}

export default SvgBoardOpen;
