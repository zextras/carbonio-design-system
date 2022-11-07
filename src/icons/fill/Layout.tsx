/*
 * SPDX-FileCopyrightText: 2021 2018 Akveo
 *
 * SPDX-License-Identifier: MIT
 */

import React, { SVGProps } from 'react';

const SvgLayout = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="layout">
				<path d="M21 8V6a3 3 0 00-3-3H6a3 3 0 00-3 3v2zM3 10v8a3 3 0 003 3h5V10zM13 10v11h5a3 3 0 003-3v-8z" />
			</g>
		</g>
	</svg>
);

export default SvgLayout;
