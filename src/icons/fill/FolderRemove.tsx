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

const SvgFolderRemove = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M19.5 7.05h-7L9.87 3.87a1 1 0 00-.77-.37H4.5A2.47 2.47 0 002 5.93v12.14a2.47 2.47 0 002.5 2.43h15a2.47 2.47 0 002.5-2.43V9.48a2.47 2.47 0 00-2.5-2.43zM14 15h-4a1 1 0 010-2h4a1 1 0 010 2z"
				data-name="folder-remove"
			/>
		</g>
	</svg>
);

export default SvgFolderRemove;