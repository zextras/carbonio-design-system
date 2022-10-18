/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgBottomViewOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M18 3H6C4.354 3 3 4.354 3 6v12c0 1.646 1.354 3 3 3h12c1.646 0 3-1.354 3-3V6c0-1.646-1.354-3-3-3zm1 12.5V18c0 .549-.451 1-1 1H6c-.549 0-1-.451-1-1v-2.5h14zm0-2H5V10h14v3.5zM6 5h12c.549 0 1 .451 1 1v2H5V6c0-.549.451-1 1-1z" />
	</svg>
);

export default SvgBottomViewOutline;
