/*
 * SPDX-FileCopyrightText: 2021 2018 Akveo
 *
 * SPDX-License-Identifier: MIT
 */

import React, { SVGProps } from 'react';

const SvgFunnel = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M13.9 22a1 1 0 01-.6-.2l-4-3.05a1 1 0 01-.39-.8v-3.27l-4.8-9.22A1 1 0 015 4h14a1 1 0 01.86.49 1 1 0 010 1l-5 9.21V21a1 1 0 01-.55.9 1 1 0 01-.41.1z"
				data-name="funnel"
			/>
		</g>
	</svg>
);

export default SvgFunnel;
