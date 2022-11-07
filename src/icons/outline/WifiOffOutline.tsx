/*
 * SPDX-FileCopyrightText: 2021 2018 Akveo
 *
 * SPDX-License-Identifier: MIT
 */

import React, { SVGProps } from 'react';

const SvgWifiOffOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="wifi-off">
				<circle cx={12} cy={19} r={1} />
				<path d="M12.44 11l-1.9-1.89-2.46-2.44-1.55-1.55-1.82-1.83a1 1 0 00-1.42 1.42l1.38 1.37 1.46 1.46 2.23 2.24 1.55 1.54 2.74 2.74 2.79 2.8 3.85 3.85a1 1 0 001.42 0 1 1 0 000-1.42zM21.72 7.93A13.93 13.93 0 0012 4a14.1 14.1 0 00-4.44.73l1.62 1.62a11.89 11.89 0 0111.16 3 1 1 0 00.69.28 1 1 0 00.72-.31 1 1 0 00-.03-1.39zM3.82 6.65a14.32 14.32 0 00-1.54 1.28 1 1 0 001.38 1.44 13.09 13.09 0 011.6-1.29zM17 13.14a1 1 0 00.71.3 1 1 0 00.72-1.69A9 9 0 0012 9h-.16l2.35 2.35A7 7 0 0117 13.14zM7.43 10.26a8.8 8.8 0 00-1.9 1.49A1 1 0 007 13.14a7.3 7.3 0 012-1.41zM8.53 15.4a1 1 0 101.39 1.44 3.06 3.06 0 013.84-.25l-2.52-2.52a5 5 0 00-2.71 1.33z" />
			</g>
		</g>
	</svg>
);

export default SvgWifiOffOutline;
