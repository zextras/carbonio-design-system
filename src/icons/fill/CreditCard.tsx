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

const SvgCreditCard = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M19 5H5a3 3 0 00-3 3v8a3 3 0 003 3h14a3 3 0 003-3V8a3 3 0 00-3-3zm-8 10H7a1 1 0 010-2h4a1 1 0 010 2zm6 0h-2a1 1 0 010-2h2a1 1 0 010 2zm3-6H4V8a1 1 0 011-1h14a1 1 0 011 1z"
				data-name="credit-card"
			/>
		</g>
	</svg>
);

export default SvgCreditCard;
