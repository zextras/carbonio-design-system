/*
 * SPDX-FileCopyrightText: 2021 2018 Akveo
 *
 * SPDX-License-Identifier: MIT
 */

import React, { SVGProps } from 'react';

const SvgNpm = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M18 3H6a3 3 0 00-3 3v12a3 3 0 003 3h7V11h4v10h1a3 3 0 003-3V6a3 3 0 00-3-3z"
				data-name="npm"
			/>
		</g>
	</svg>
);

export default SvgNpm;
