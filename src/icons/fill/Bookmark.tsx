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

const SvgBookmark = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M6 21a1 1 0 01-.49-.13A1 1 0 015 20V5.33A2.28 2.28 0 017.2 3h9.6A2.28 2.28 0 0119 5.33V20a1 1 0 01-.5.86 1 1 0 01-1 0l-5.67-3.21-5.33 3.2A1 1 0 016 21z"
				data-name="bookmark"
			/>
		</g>
	</svg>
);

export default SvgBookmark;
