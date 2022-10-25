/*
 * SPDX-FileCopyrightText: 2021 2018 Akveo
 *
 * SPDX-License-Identifier: MIT
 */

import React, { SVGProps } from 'react';

const SvgClock = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm4 11h-4a1 1 0 01-1-1V8a1 1 0 012 0v3h3a1 1 0 010 2z"
				data-name="clock"
			/>
		</g>
	</svg>
);

export default SvgClock;
