/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';

function SvgBoardCollapse(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M7.001 8.944V20.98H5.994a3.011 3.011 0 01-2.997-2.998V8.944h4.004zM20.98 6.978H2.997v-.984a3.011 3.011 0 012.997-2.997h11.988a3.011 3.011 0 012.998 2.997v.984zM16.57 16.294a1 1 0 11-1.419 1.409l-1.937-2.03a1.004 1.004 0 010-1.398l2.098-2.03a1 1 0 01.7-.32.999.999 0 01.709 1.71l-1.409 1.32 1.257 1.34zm-7.602-7.35V20.98h9.014a3.011 3.011 0 002.998-2.997V8.944H8.968z" />
		</svg>
	);
}

export default SvgBoardCollapse;
