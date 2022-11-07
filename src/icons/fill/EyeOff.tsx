/*
 * SPDX-FileCopyrightText: 2021 2018 Akveo
 *
 * SPDX-License-Identifier: MIT
 */

import React, { SVGProps } from 'react';

const SvgEyeOff = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="eye-off">
				<circle cx={12} cy={12} r={1.5} />
				<path d="M15.29 18.12L14 16.78l-.07-.07-1.27-1.27a4.07 4.07 0 01-.61.06A3.5 3.5 0 018.5 12a4.07 4.07 0 01.06-.61l-2-2L5 7.87a15.89 15.89 0 00-2.87 3.63 1 1 0 000 1c.63 1.09 4 6.5 9.89 6.5h.25a9.48 9.48 0 003.23-.67zM8.59 5.76l2.8 2.8A4.07 4.07 0 0112 8.5a3.5 3.5 0 013.5 3.5 4.07 4.07 0 01-.06.61l2.68 2.68.84.84a15.89 15.89 0 002.91-3.63 1 1 0 000-1c-.64-1.11-4.16-6.68-10.14-6.5a9.48 9.48 0 00-3.23.67zM20.71 19.29L19.41 18l-2-2-9.52-9.53L6.42 5 4.71 3.29a1 1 0 00-1.42 1.42L5.53 7l1.75 1.7 7.31 7.3.07.07L16 17.41l.59.59 2.7 2.71a1 1 0 001.42 0 1 1 0 000-1.42z" />
			</g>
		</g>
	</svg>
);

export default SvgEyeOff;
