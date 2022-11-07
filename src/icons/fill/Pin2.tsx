/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgPin2 = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<g clipPath="url(#pin2_svg__clip0)">
			<path d="M11.89 3.072a7.334 7.334 0 00-5.23 2.26c-2.841 2.979-2.797 7.743.098 10.67l4.597 4.607a.934.934 0 00.704.297.991.991 0 00.704-.307l4.517-4.677c2.843-2.977 2.804-7.74-.089-10.67a7.265 7.265 0 00-5.3-2.18z" />
		</g>
		<defs>
			<clipPath id="pin2_svg__clip0">
				<path d="M0 0h24v24H0z" />
			</clipPath>
		</defs>
	</svg>
);

export default SvgPin2;
