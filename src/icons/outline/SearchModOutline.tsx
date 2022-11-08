/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgSearchModOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0019 11a8 8 0 10-8 8 7.92 7.92 0 004.9-1.69l3.39 3.4a1 1 0 001.42 0 1 1 0 000-1.42zM5 11a6 6 0 116 6 6 6 0 01-6-6z"
				data-name="search"
			/>
		</g>
	</svg>
);

export default SvgSearchModOutline;
