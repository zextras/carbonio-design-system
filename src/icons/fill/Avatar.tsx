/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgAvatar = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M7.485 20.91c.808-1.687 2.535-2.863 4.515-2.863 1.98 0 3.707 1.176 4.515 2.863A9.881 9.881 0 0112 22a9.882 9.882 0 01-4.515-1.09zm-1.688-1.09C3.49 17.982 2 15.151 2 12 2 6.514 6.514 2 12 2s10 4.514 10 10c0 3.151-1.49 5.981-3.797 7.82-1.175-2.235-3.523-3.773-6.203-3.773s-5.028 1.538-6.203 3.773zM12 14.047c2.194 0 4-1.806 4-4s-1.806-4-4-4-4 1.806-4 4 1.806 4 4 4z" />
	</svg>
);

export default SvgAvatar;
