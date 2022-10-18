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

const SvgSlashOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm8 10a7.92 7.92 0 01-1.69 4.9L7.1 5.69A7.92 7.92 0 0112 4a8 8 0 018 8zM4 12a7.92 7.92 0 011.69-4.9L16.9 18.31A7.92 7.92 0 0112 20a8 8 0 01-8-8z"
				data-name="slash"
			/>
		</g>
	</svg>
);

export default SvgSlashOutline;
