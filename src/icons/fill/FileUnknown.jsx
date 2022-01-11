/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';

function SvgFileUnknown(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M19.72 7.323c.167.183.26.422.26.67V19.48a2.54 2.54 0 01-2.527 2.498H6.523a2.54 2.54 0 01-2.527-2.498V4.496a2.54 2.54 0 012.528-2.498h8.022a1 1 0 01.74.33l4.435 4.995zm-7.732 10.263a.488.488 0 110 .976.488.488 0 010-.976zm2.44-4.391c0 1.155-.82 2.16-1.952 2.39v.537a.49.49 0 01-.488.488.49.49 0 01-.488-.488v-.976a.49.49 0 01.488-.488 1.47 1.47 0 001.464-1.463 1.47 1.47 0 00-1.464-1.464 1.47 1.47 0 00-1.463 1.464.49.49 0 01-.488.487.49.49 0 01-.488-.487 2.451 2.451 0 012.44-2.44 2.451 2.451 0 012.439 2.44zm-.442-9.199l3.737 3.996h-2.997a.792.792 0 01-.74-.849V3.996z"
			/>
		</svg>
	);
}

export default SvgFileUnknown;
