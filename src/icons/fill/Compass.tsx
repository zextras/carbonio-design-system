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

const SvgCompass = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="compass">
				<path d="M10.8 13.21l1.69-.68.71-1.74-1.69.68-.71 1.74z" />
				<path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm3.93 7.42l-1.75 4.26a1 1 0 01-.55.55l-4.21 1.7A1 1 0 019 16a1 1 0 01-.71-.31h-.05a1 1 0 01-.18-1l1.75-4.26a1 1 0 01.55-.55l4.21-1.7a1 1 0 011.1.25 1 1 0 01.26.99z" />
			</g>
		</g>
	</svg>
);

export default SvgCompass;
