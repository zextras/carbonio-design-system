/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgSignatureOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M21.964 20.09a.984.984 0 00-.984-.984H6.932a.984.984 0 000 1.967H20.98c.543 0 .984-.44.984-.983z"
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M20.98 19.106a.984.984 0 010 1.967H6.932a.984.984 0 010-1.967H20.98zM4.314 18.732l-.308 1.563a.984.984 0 01-1.93-.38l1.692-8.593.013-.054.032-.175c1.064-5.402 6.313-8.923 11.715-7.86a9.944 9.944 0 016.354 4.23L9.395 15.843a4.006 4.006 0 00-5.078 2.891h-.003zm4.666-8.64v-.015a.995.995 0 01-.143-.761.985.985 0 01.95-.77.993.993 0 01.826.435l1.819 2.454 1.715-1.15-1.266-1.887a.992.992 0 01.066-1.184.986.986 0 011.27-.2c.119.074.22.173.298.288L15.78 9.19l3.17-2.127a7.96 7.96 0 00-3.803-1.899 8.012 8.012 0 00-9.43 6.45 1.958 1.958 0 01-.023.111l-.557 2.826a5.948 5.948 0 013.85-.803s1.191-.806 1.784-1.197l-1.79-2.457zm-3.286 1.632l.004-.021a.918.918 0 01-.012.053l.008-.032z"
		/>
	</svg>
);

export default SvgSignatureOutline;
