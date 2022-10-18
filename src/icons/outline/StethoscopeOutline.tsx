/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgStethoscopeOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M16.995 8.902V4.976h-.758a1.967 1.967 0 110-1.99h1.753c.55 0 .995.445.995.994v5.058c0 .032-.001.063-.004.094-.043 3.424-2.597 6.345-5.994 6.835v2.382a1.967 1.967 0 11-1.998 0v-2.382C7.567 15.473 5 12.51 4.995 9.054c0-.03.001-.06.004-.088V3.98c0-.55.445-.996.995-.996h1.753a1.967 1.967 0 110 1.99H6.99v3.99c.003.03.004.059.004.089 0 2.74 2.255 4.995 4.995 4.995s4.995-2.255 4.995-4.995a.98.98 0 01.012-.152z" />
	</svg>
);

export default SvgStethoscopeOutline;
