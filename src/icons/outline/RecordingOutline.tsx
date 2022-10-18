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

const SvgRecordingOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M18 8a4 4 0 00-4 4 3.91 3.91 0 00.56 2H9.44a3.91 3.91 0 00.56-2 4 4 0 10-4 4h12a4 4 0 000-8zM4 12a2 2 0 112 2 2 2 0 01-2-2zm14 2a2 2 0 112-2 2 2 0 01-2 2z"
				data-name="recording"
			/>
		</g>
	</svg>
);

export default SvgRecordingOutline;
