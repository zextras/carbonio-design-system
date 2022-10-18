/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgCinemaViewOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M18.984 3H4.998A2.008 2.008 0 003 4.998v3.996c0 1.096.902 1.998 1.998 1.998h13.986a2.008 2.008 0 001.998-1.998V4.998A2.008 2.008 0 0018.984 3zM4.998 8.994V4.998h13.986v3.996H4.998zM8.994 12.99H4.998A2.008 2.008 0 003 14.988v3.996c0 1.096.902 1.998 1.998 1.998h3.996a2.008 2.008 0 001.998-1.998v-3.996a2.008 2.008 0 00-1.998-1.998zm-3.996 5.994v-3.996h3.996v3.996H4.998zM18.979 12.99h-3.997a2.008 2.008 0 00-1.998 1.998v3.996c0 1.096.902 1.998 1.998 1.998h3.997a2.008 2.008 0 001.998-1.998v-3.996a2.008 2.008 0 00-1.998-1.998zm-3.997 5.994v-3.996h3.997v3.996h-3.997z" />
	</svg>
);

export default SvgCinemaViewOutline;
