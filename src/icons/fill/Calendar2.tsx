/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgCalendar2 = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M20.98 10.974H2.997v8.007a3.011 3.011 0 002.997 2.997h11.988a3.011 3.011 0 002.998-2.997v-8.007zm-12.988 6.01c-.548 0-.999-.452-.999-1s.451-.999 1-.999c.547 0 .998.451.998 1 0 .547-.45.998-.999.998zm7.992 0h-3.996c-.548 0-.999-.452-.999-1s.451-.999 1-.999h3.995c.548 0 1 .451 1 1 0 .547-.452.998-1 .998zM14.985 3.996v-.999c0-.548.451-.999 1-.999.547 0 .998.451.998 1v.998h1a3.011 3.011 0 012.997 2.997v1.983H2.997V6.993a3.011 3.011 0 012.997-2.997h1v-.999a.997.997 0 01.503-.866A1.007 1.007 0 018.037 2a.987.987 0 01.652.285 1.01 1.01 0 01.302.713v1h5.994z" />
	</svg>
);

export default SvgCalendar2;
