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

const SvgBookmarkOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M6.09 21.06a1 1 0 01-1-1L4.94 5.4a2.26 2.26 0 012.18-2.35L16.71 3a2.27 2.27 0 012.23 2.31l.14 14.66a1 1 0 01-.49.87 1 1 0 01-1 0l-5.7-3.16-5.29 3.23a1.2 1.2 0 01-.51.15zm5.76-5.55a1.11 1.11 0 01.5.12l4.71 2.61-.12-12.95c0-.2-.13-.34-.21-.33l-9.6.09c-.08 0-.19.13-.19.33l.12 12.9 4.28-2.63a1.06 1.06 0 01.51-.14z"
				data-name="bookmark"
			/>
		</g>
	</svg>
);

export default SvgBookmarkOutline;