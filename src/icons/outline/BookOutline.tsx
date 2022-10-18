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

const SvgBookOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M19 3H7a3 3 0 00-3 3v12a3 3 0 003 3h12a1 1 0 001-1V4a1 1 0 00-1-1zM7 5h11v10H7a3 3 0 00-1 .18V6a1 1 0 011-1zm0 14a1 1 0 010-2h11v2z"
				data-name="book"
			/>
		</g>
	</svg>
);

export default SvgBookOutline;
