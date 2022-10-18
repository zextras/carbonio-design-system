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

const SvgMoreHorizontalOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="more-horizotnal">
				<circle cx={12} cy={12} r={2} />
				<circle cx={19} cy={12} r={2} />
				<circle cx={5} cy={12} r={2} />
			</g>
		</g>
	</svg>
);

export default SvgMoreHorizontalOutline;
