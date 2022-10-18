/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgBottomView = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M21 15.504V18c0 1.646-1.354 3-3 3H6c-1.646 0-3-1.354-3-3v-2.496h18zm0-2H3V10h18v3.504zM3 8V6c0-1.646 1.354-3 3-3h12c1.646 0 3 1.354 3 3v2H3z" />
	</svg>
);

export default SvgBottomView;
