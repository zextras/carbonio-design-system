/*
 * SPDX-FileCopyrightText: 2021 2018 Akveo
 *
 * SPDX-License-Identifier: MIT
 */

import React, { SVGProps } from 'react';

const SvgGift = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="gift">
				<path d="M4.64 15.27v4.82a.92.92 0 00.92.91h5.62v-5.73zM12.82 21h5.62a.92.92 0 00.92-.91v-4.82h-6.54zM20.1 7.09h-1.84a2.82 2.82 0 00.29-1.23A2.87 2.87 0 0015.68 3 4.21 4.21 0 0012 5.57 4.21 4.21 0 008.32 3a2.87 2.87 0 00-2.87 2.86 2.82 2.82 0 00.29 1.23H3.9c-.5 0-.9.59-.9 1.31v3.93c0 .72.4 1.31.9 1.31h7.28V7.09h1.64v6.55h7.28c.5 0 .9-.59.9-1.31V8.4c0-.72-.4-1.31-.9-1.31zm-11.78 0a1.23 1.23 0 110-2.45c1.4 0 2.19 1.44 2.58 2.45zm7.36 0H13.1c.39-1 1.18-2.45 2.58-2.45a1.23 1.23 0 110 2.45z" />
			</g>
		</g>
	</svg>
);

export default SvgGift;
