/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';

function SvgKeyOutline(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M9.907 12.162l8.83-8.83a.986.986 0 011.394 1.394l-1.44 1.44 1.44 1.44a.986.986 0 01-1.394 1.393l-1.44-1.44-1.39 1.392 2.617 2.617a.986.986 0 01-1.394 1.394l-2.617-2.618-3.233 3.233a4.498 4.498 0 01-3.834 6.843 4.498 4.498 0 01-4.496-4.496 4.498 4.498 0 016.957-3.762zm-4.986 3.762a2.526 2.526 0 015.05 0 2.526 2.526 0 01-5.05 0z"
			/>
		</svg>
	);
}

export default SvgKeyOutline;
