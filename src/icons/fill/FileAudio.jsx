/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';

function SvgFileAudio(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M19.72 7.323c.167.183.26.422.26.67V19.48a2.54 2.54 0 01-2.527 2.498H6.523a2.54 2.54 0 01-2.527-2.498V4.496a2.54 2.54 0 012.528-2.498h8.022a1 1 0 01.74.33l4.435 4.995zm-4.428 3.879l-4.394.977a.49.49 0 00-.381.48v3.09a1.702 1.702 0 00-.728-.163c-.935 0-1.704.77-1.704 1.706 0 .935.77 1.705 1.704 1.705.93 0 1.698-.762 1.704-1.693v-4.255l3.418-.757v2.48a1.703 1.703 0 00-.727-.163c-.935 0-1.704.77-1.704 1.705 0 .936.769 1.706 1.704 1.706.932 0 1.7-.766 1.704-1.699v-4.64a.489.489 0 00-.186-.381.487.487 0 00-.3-.109l-.11.01zm-1.306-7.206l3.737 3.996h-2.997a.792.792 0 01-.74-.849V3.996z"
			/>
		</svg>
	);
}

export default SvgFileAudio;
