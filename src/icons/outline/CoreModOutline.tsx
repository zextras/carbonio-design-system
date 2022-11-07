/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgCoreModOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M12.005 18.065a1.267 1.267 0 10.001-2.534 1.267 1.267 0 00-.001 2.534zM12.004 5.095a1.549 1.549 0 10.002-3.097 1.549 1.549 0 00-.002 3.097zM12.002 13.841a1.83 1.83 0 10.002-3.66 1.83 1.83 0 00-.002 3.66z" />
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M9.943 17.7a6.062 6.062 0 01-3.999-5.695 6.062 6.062 0 016.062-6.056 6.062 6.062 0 016.062 6.056A6.062 6.062 0 0114.07 17.7a2.238 2.238 0 00-.139-2.077 4.097 4.097 0 002.176-3.618 4.1 4.1 0 00-8.202 0c0 1.566.882 2.929 2.177 3.618a2.239 2.239 0 00-.14 2.077z"
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M9.815 2.26a2.521 2.521 0 00-.217 2.096C6.339 5.376 3.972 8.42 3.972 12.01c0 4.426 3.597 8.02 8.028 8.02 4.43 0 8.028-3.594 8.028-8.02 0-3.587-2.362-6.627-5.617-7.651a2.53 2.53 0 00-.215-2.097C18.66 3.264 22 7.25 22 12.01 22 17.524 17.52 22 12 22S2 17.524 2 12.01c0-4.764 3.346-8.754 7.815-9.75z"
		/>
	</svg>
);

export default SvgCoreModOutline;
