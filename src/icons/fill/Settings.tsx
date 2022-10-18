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

const SvgSettings = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="settings">
				<circle cx={12} cy={12} r={1.5} />
				<path d="M21.89 10.32L21.1 7.8a2.26 2.26 0 00-2.88-1.51l-.34.11a1.74 1.74 0 01-1.59-.26l-.11-.08a1.76 1.76 0 01-.69-1.43v-.28a2.37 2.37 0 00-.68-1.68 2.26 2.26 0 00-1.6-.67h-2.55a2.32 2.32 0 00-2.29 2.33v.24a1.94 1.94 0 01-.73 1.51l-.13.1a1.93 1.93 0 01-1.78.29 2.14 2.14 0 00-1.68.12 2.18 2.18 0 00-1.12 1.33l-.82 2.6a2.34 2.34 0 001.48 2.94h.16a1.83 1.83 0 011.12 1.22l.06.16a2.06 2.06 0 01-.23 1.86 2.37 2.37 0 00.49 3.3l2.07 1.57a2.25 2.25 0 001.35.43A2 2 0 009 22a2.25 2.25 0 001.47-1l.23-.33a1.8 1.8 0 011.43-.77 1.75 1.75 0 011.5.78l.12.17a2.24 2.24 0 003.22.53L19 19.86a2.38 2.38 0 00.5-3.23l-.26-.38A2 2 0 0119 14.6a1.89 1.89 0 011.21-1.28l.2-.07a2.36 2.36 0 001.48-2.93zM12 15.5a3.5 3.5 0 113.5-3.5 3.5 3.5 0 01-3.5 3.5z" />
			</g>
		</g>
	</svg>
);

export default SvgSettings;
