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

const SvgShoppingCart = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="shopping-cart">
				<path d="M21.08 7a2 2 0 00-1.7-1H6.58L6 3.74A1 1 0 005 3H3a1 1 0 000 2h1.24L7 15.26A1 1 0 008 16h9a1 1 0 00.89-.55l3.28-6.56A2 2 0 0021.08 7z" />
				<circle cx={7.5} cy={19.5} r={1.5} />
				<circle cx={17.5} cy={19.5} r={1.5} />
			</g>
		</g>
	</svg>
);

export default SvgShoppingCart;
