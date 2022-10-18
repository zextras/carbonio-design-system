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

const SvgArrowDown = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M12 17a1.72 1.72 0 01-1.33-.64l-4.21-5.1a2.1 2.1 0 01-.26-2.21A1.76 1.76 0 017.79 8h8.42a1.76 1.76 0 011.59 1.05 2.1 2.1 0 01-.26 2.21l-4.21 5.1A1.72 1.72 0 0112 17z"
				data-name="arrow-downward"
			/>
		</g>
	</svg>
);

export default SvgArrowDown;
