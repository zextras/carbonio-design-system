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

const SvgFolder = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M19.5 20.5h-15A2.47 2.47 0 012 18.07V5.93A2.47 2.47 0 014.5 3.5h4.6a1 1 0 01.77.37l2.6 3.18h7A2.47 2.47 0 0122 9.48v8.59a2.47 2.47 0 01-2.5 2.43z"
				data-name="folder"
			/>
		</g>
	</svg>
);

export default SvgFolder;