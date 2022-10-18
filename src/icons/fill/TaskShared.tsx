/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgTaskShared = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M18 21H6c-1.646 0-3-1.354-3-3V6c0-1.646 1.354-3 3-3h12c1.646 0 3 1.354 3 3v12c0 1.646-1.354 3-3 3zM11.931 9.119a1.97 1.97 0 113.901-.38 1.97 1.97 0 01-2.603 1.865l-1.16 1.014a1.974 1.974 0 010 .76l1.162 1.018a1.97 1.97 0 11.633 3.833 1.97 1.97 0 01-1.933-2.35l-1.162-1.017a1.97 1.97 0 11.001-3.729l1.161-1.014z"
		/>
	</svg>
);

export default SvgTaskShared;
