/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgAppointment = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M17.93 21.953h-12c-1.646 0-3-1.354-3-3v-12c0-1.646 1.354-3 3-3h1v-1a1.004 1.004 0 011.05-.999.987.987 0 01.647.285c.191.187.303.447.303.714v1h6v-1c0-.549.451-1 1-1 .548 0 1 .451 1 1v1h1c1.645 0 3 1.354 3 3v12c0 1.646-1.355 3-3 3zm-3.3-11.61l-3.78 5-1.63-2.11a1.002 1.002 0 00-1.58 1.23l2.43 3.11a1 1 0 001.58-.01l4.57-6a1.006 1.006 0 10-1.6-1.22h.01z" />
	</svg>
);

export default SvgAppointment;
