/*
 * SPDX-FileCopyrightText: 2021 2018 Akveo
 *
 * SPDX-License-Identifier: MIT
 */

import React, { SVGProps } from 'react';

const SvgPersonRemove = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="person-remove">
				<path d="M21 6h-4a1 1 0 000 2h4a1 1 0 000-2zM10 11a4 4 0 10-4-4 4 4 0 004 4zM16 21a1 1 0 001-1 7 7 0 00-14 0 1 1 0 001 1" />
			</g>
		</g>
	</svg>
);

export default SvgPersonRemove;
