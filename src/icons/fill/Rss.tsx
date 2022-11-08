/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgRss = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M18 21H6c-1.646 0-3-1.354-3-3V6c0-1.646 1.354-3 3-3h12c1.646 0 3 1.354 3 3v12c0 1.646-1.354 3-3 3zM7.842 6.576c-.497.07-.87.499-.87 1a1.015 1.015 0 001.15 1 6.004 6.004 0 015.09 1.71 6.007 6.007 0 011.53 5.95 1 1 0 00.68 1.26.9.9 0 00.28 0c.457.019.872-.28 1-.72.22-.74.332-1.51.332-2.283 0-4.389-3.611-8-8-8a8 8 0 00-1.152.083h-.04zm0 3.92c.208-.03.419-.044.63-.044 2.48 0 4.52 2.04 4.52 4.52 0 .665-.147 1.322-.43 1.924-.164.354-.52.581-.91.58a1.063 1.063 0 01-.42-.09 1.005 1.005 0 01-.48-1.33 2.525 2.525 0 00-.51-2.84 2.491 2.491 0 00-2.12-.72 1.005 1.005 0 01-1.14-.83 1.001 1.001 0 01.86-1.17zm.14 4a1 1 0 11-.001 2.001 1 1 0 010-2z"
		/>
	</svg>
);

export default SvgRss;
