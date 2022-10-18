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

const SvgArrowIosDownward = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M12 16a1 1 0 01-.64-.23l-6-5a1 1 0 111.28-1.54L12 13.71l5.36-4.32a1 1 0 011.41.15 1 1 0 01-.14 1.46l-6 4.83A1 1 0 0112 16z"
				data-name="arrow-ios-downward"
			/>
		</g>
	</svg>
);

export default SvgArrowIosDownward;