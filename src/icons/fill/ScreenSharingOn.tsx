/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgScreenSharingOn = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M18.982 2.997a3.011 3.011 0 012.997 2.997v7.992a3.011 3.011 0 01-2.997 2.997h-5.995v1.998h3.996c.549 0 1 .451 1 1 0 .548-.451.998-1 .998h-9.99c-.548 0-.999-.45-.999-.998 0-.549.451-1 1-1h3.995v-1.998H4.995a3.011 3.011 0 01-2.997-2.997V5.994a3.011 3.011 0 012.997-2.997h13.986zm-7.83 9.973a.998.998 0 00.73-.33l3.558-3.902A1 1 0 1013.962 7.4l-2.83 3.104-1.166-1.249a1 1 0 00-1.458 1.369l1.906 2.027a.998.998 0 00.729.32h.01z" />
	</svg>
);

export default SvgScreenSharingOn;
