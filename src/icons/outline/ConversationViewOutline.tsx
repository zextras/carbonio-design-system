/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgConversationViewOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M16.016 11.969a.984.984 0 010 1.967H7.96a.984.984 0 010-1.967h8.055zM16.016 8.067a.984.984 0 010 1.967H7.96a.984.984 0 010-1.967h8.055z"
		/>
		<path d="M18.982 2.997a3.011 3.011 0 012.997 2.997V20.98a1.002 1.002 0 01-1.509.859l-4.812-2.857H8.542a.998.998 0 00-.55.14l-4.485 2.717a.998.998 0 01-1.509-.86V5.995a3.011 3.011 0 012.997-2.997h13.986zm0 13.986c.548 0 .998-.45.998-.999v-9.99c0-.548-.45-.999-.998-.999H4.995c-.548 0-.999.451-.999 1V19.21l2.997-1.798a2.996 2.996 0 011.549-.43h10.44z" />
	</svg>
);

export default SvgConversationViewOutline;
