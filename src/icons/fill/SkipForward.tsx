/*
 * SPDX-FileCopyrightText: 2021 2018 Akveo
 *
 * SPDX-License-Identifier: MIT
 */

import React, { SVGProps } from 'react';

const SvgSkipForward = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M16 6a1 1 0 00-1 1v3.82l-.14-.15-5.1-4.21a2.1 2.1 0 00-2.21-.26 1.76 1.76 0 00-1 1.59v8.42a1.76 1.76 0 001 1.59 2.23 2.23 0 00.91.2 2.06 2.06 0 001.3-.46l5.1-4.21.14-.15V17a1 1 0 002 0V7a1 1 0 00-1-1z"
				data-name="skip-forward"
			/>
		</g>
	</svg>
);

export default SvgSkipForward;
