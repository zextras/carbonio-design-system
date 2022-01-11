/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';

function SvgBoardOpenOutline(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M17.982 2.997H5.994a3.011 3.011 0 00-2.997 2.997v11.988a3.011 3.011 0 002.997 2.997h11.988a3.011 3.011 0 002.998-2.997V5.994a3.011 3.011 0 00-2.998-2.997zM5.994 4.995h11.988c.549 0 1 .45 1 .999v.968H4.995v-.968c0-.548.451-.999 1-.999zm-.999 12.987V8.96h1.967V18.98h-.968c-.548 0-.999-.45-.999-.999zm12.987 1H8.96V8.96h10.021v9.022c0 .548-.45 1-.999 1z" />
			<path d="M12.94 17.003a1 1 0 01-.709-1.709l1.409-1.32-1.257-1.34a1 1 0 111.418-1.409l1.937 2.03a1.004 1.004 0 010 1.399l-2.098 2.029a1 1 0 01-.7.32z" />
		</svg>
	);
}

export default SvgBoardOpenOutline;
