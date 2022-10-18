/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgCrownOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M4.418 16.679c-.021-.02-1.383-8.852-1.383-8.852-.208-.92.849-1.598 1.599-1.025l2.205 1.685a1.072 1.072 0 001.512-.214l2.826-3.812a1.01 1.01 0 011.623 0l2.826 3.812c.356.48 1.037.577 1.512.214l2.205-1.685c.75-.573 1.806.104 1.598 1.025l-1.348 8.617c-.15 1.933-3.5 3.48-7.605 3.48-3.937 0-7.18-1.424-7.57-3.245zm7.57-1.344c2.985 0 4.94.579 4.94 1.292 0 .714-1.955 1.293-4.94 1.293-2.985 0-4.94-.58-4.94-1.293s1.955-1.292 4.94-1.292zm5.892-.693l.754-4.818-.3.229a3.042 3.042 0 01-4.291-.606l-2.055-2.771-2.054 2.77a3.042 3.042 0 01-4.292.607l-.305-.233c.233 1.504.533 3.44.748 4.814 1.116-.785 3.337-1.32 5.892-1.32 2.564 0 4.79.539 5.903 1.328z"
		/>
	</svg>
);

export default SvgCrownOutline;
