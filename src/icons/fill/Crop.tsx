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

const SvgCrop = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M21 16h-3V8.56A2.56 2.56 0 0015.44 6H8V3a1 1 0 00-2 0v3H3a1 1 0 000 2h3v7.44A2.56 2.56 0 008.56 18H16v3a1 1 0 002 0v-3h3a1 1 0 000-2zM8.56 16a.56.56 0 01-.56-.56V8h7.44a.56.56 0 01.56.56V16z"
				data-name="crop"
			/>
		</g>
	</svg>
);

export default SvgCrop;
