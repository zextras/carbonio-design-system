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

const SvgGlobe2Outline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 2a8.19 8.19 0 011.79.21 2.61 2.61 0 01-.78 1c-.22.17-.46.31-.7.46a4.56 4.56 0 00-1.85 1.67 6.49 6.49 0 00-.62 3.3c0 1.36 0 2.16-.95 2.87-1.37 1.07-3.46.47-4.76-.07A8.33 8.33 0 014 12a8 8 0 018-8zM5 15.8a8.42 8.42 0 002 .27 5 5 0 003.14-1c1.71-1.34 1.71-3.06 1.71-4.44a4.76 4.76 0 01.37-2.34 2.86 2.86 0 011.12-.91 9.75 9.75 0 00.92-.61 4.55 4.55 0 001.4-1.87A8 8 0 0119 8.12c-1.43.2-3.46.67-3.86 2.53A7 7 0 0015 12a2.93 2.93 0 01-.29 1.47l-.1.17c-.65 1.08-1.38 2.31-.39 4 .12.21.25.41.38.61a2.29 2.29 0 01.52 1.08A7.89 7.89 0 0112 20a8 8 0 01-7-4.2zm11.93 2.52a6.79 6.79 0 00-.63-1.14c-.11-.16-.22-.32-.32-.49-.39-.68-.25-1 .38-2l.1-.17a4.77 4.77 0 00.54-2.43 5.42 5.42 0 01.09-1c.16-.73 1.71-.93 2.67-1a7.94 7.94 0 01-2.86 8.28z"
				data-name="globe-2"
			/>
		</g>
	</svg>
);

export default SvgGlobe2Outline;