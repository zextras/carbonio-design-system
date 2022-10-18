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

const SvgStopCircle = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="stop-circle">
				<path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm4 12.75A1.25 1.25 0 0114.75 16h-5.5A1.25 1.25 0 018 14.75v-5.5A1.25 1.25 0 019.25 8h5.5A1.25 1.25 0 0116 9.25z" />
				<path d="M10 10h4v4h-4z" />
			</g>
		</g>
	</svg>
);

export default SvgStopCircle;
