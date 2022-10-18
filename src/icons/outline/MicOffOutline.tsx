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

const SvgMicOffOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="mic-off">
				<path d="M10 6a2 2 0 014 0v5a1 1 0 010 .16l1.6 1.59A4 4 0 0016 11V6a4 4 0 00-7.92-.75L10 7.17zM19 11a1 1 0 00-2 0 4.86 4.86 0 01-.69 2.48L17.78 15A7 7 0 0019 11zM12 15h.16L8 10.83V11a4 4 0 004 4zM20.71 19.29l-16-16a1 1 0 00-1.42 1.42l16 16a1 1 0 001.42 0 1 1 0 000-1.42z" />
				<path d="M15 20h-2v-2.08a7 7 0 001.65-.44l-1.6-1.6A4.57 4.57 0 0112 16a5 5 0 01-5-5 1 1 0 00-2 0 7 7 0 006 6.92V20H9a1 1 0 000 2h6a1 1 0 000-2z" />
			</g>
		</g>
	</svg>
);

export default SvgMicOffOutline;
