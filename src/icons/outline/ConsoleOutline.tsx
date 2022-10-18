/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgConsoleOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M17.982 2.997H5.994a3.011 3.011 0 00-2.997 2.997v11.988a3.011 3.011 0 002.997 2.998h11.988a3.011 3.011 0 002.998-2.998V5.994a3.011 3.011 0 00-2.998-2.997zm1 14.985c0 .549-.451 1-1 1H5.994c-.548 0-.999-.451-.999-1V8.976h13.986v9.006zM4.995 6.978v-.984c0-.548.451-.999 1-.999h11.987c.549 0 1 .451 1 1v.983H4.995z" />
		<path d="M7.977 17.05a1 1 0 01-.71-1.709l1.409-1.32-1.257-1.34a1 1 0 111.419-1.409l1.936 2.03a1.003 1.003 0 010 1.399L8.676 16.73a1 1 0 01-.7.32z" />
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M16.063 15.083a.984.984 0 010 1.967h-2.998a.984.984 0 010-1.967h2.998z"
		/>
	</svg>
);

export default SvgConsoleOutline;
