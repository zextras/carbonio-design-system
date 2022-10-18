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

const SvgUploadOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="upload">
				<rect x={4} y={4} width={16} height={2} rx={1} ry={1} transform="rotate(180 12 5)" />
				<rect x={17} y={5} width={4} height={2} rx={1} ry={1} transform="rotate(90 19 6)" />
				<rect x={3} y={5} width={4} height={2} rx={1} ry={1} transform="rotate(90 5 6)" />
				<path d="M8 14a1 1 0 01-.8-.4 1 1 0 01.2-1.4l4-3a1 1 0 011.18 0l4 2.82a1 1 0 01.24 1.39 1 1 0 01-1.4.24L12 11.24 8.6 13.8a1 1 0 01-.6.2z" />
				<path d="M12 21a1 1 0 01-1-1v-8a1 1 0 012 0v8a1 1 0 01-1 1z" />
			</g>
		</g>
	</svg>
);

export default SvgUploadOutline;
