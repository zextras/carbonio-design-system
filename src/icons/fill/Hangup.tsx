/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgHangup = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M8.09 21.75a1 1 0 00.65-.72l1.37-6a1.001 1.001 0 00-.26-.92c-.13-.14-.14-.15-1.38-.8a9.912 9.912 0 014.89-4.87c.64 1.27.64 1.28.79 1.41a1 1 0 00.92.26L21 8.74a1 1 0 00.72-.65 3.79 3.79 0 00.18-.72 3.94 3.94 0 00.1-.77C22 4.077 19.924 2 17.4 2 8.956 2.01 2.01 8.956 2 17.4 2 19.924 4.077 22 6.6 22a4.338 4.338 0 001.49-.25z" />
	</svg>
);

export default SvgHangup;
