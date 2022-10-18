/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
/*
 * SPDX-FileCopyrightText: 2021 2018 Akveo
 *
 * SPDX-License-Identifier: MIT
 */

import React, { SVGProps } from 'react';

const SvgTrash2Outline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="trash-2">
				<path d="M21 6h-5V4.33A2.42 2.42 0 0013.5 2h-3A2.42 2.42 0 008 4.33V6H3a1 1 0 000 2h1v11a3 3 0 003 3h10a3 3 0 003-3V8h1a1 1 0 000-2zM10 4.33c0-.16.21-.33.5-.33h3c.29 0 .5.17.5.33V6h-4zM18 19a1 1 0 01-1 1H7a1 1 0 01-1-1V8h12z" />
				<path d="M9 17a1 1 0 001-1v-4a1 1 0 00-2 0v4a1 1 0 001 1zM15 17a1 1 0 001-1v-4a1 1 0 00-2 0v4a1 1 0 001 1z" />
			</g>
		</g>
	</svg>
);

export default SvgTrash2Outline;
