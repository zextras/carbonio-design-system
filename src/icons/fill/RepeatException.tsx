/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { SVGProps } from 'react';

const SvgRepeatException = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M6.09 19h12l-1.3 1.29a1.004 1.004 0 101.42 1.42l3-3a1.002 1.002 0 000-1.42l-3-3a1.002 1.002 0 00-1.639.325 1 1 0 00.219 1.095l1.3 1.29h-12a1.559 1.559 0 01-1.59-1.53V13a1 1 0 10-2 0v2.47A3.56 3.56 0 006.09 19zM5.79 9.71a1.004 1.004 0 001.42-1.42L5.91 7h12a1.56 1.56 0 011.59 1.53V11a1 1 0 102 0V8.53A3.56 3.56 0 0017.91 5h-12l1.3-1.29a1 1 0 000-1.42 1 1 0 00-1.42 0l-3 3a1 1 0 000 1.42l3 3z" />
		<path d="M12 16a1 1 0 100-2 1 1 0 000 2zM12 8c-.265 0-.52.088-.707.244a.77.77 0 00-.293.59v3.333a.77.77 0 00.293.589c.187.156.442.244.707.244.265 0 .52-.088.707-.244a.77.77 0 00.293-.59V8.834a.77.77 0 00-.293-.589A1.11 1.11 0 0012 8z" />
	</svg>
);

export default SvgRepeatException;