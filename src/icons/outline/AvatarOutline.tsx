/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgAvatarOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M11.992 22c-5.486 0-10-4.513-10-9.999 0-5.486 4.514-10 10-10s10 4.514 10 10-4.514 10-10 10zm3.282-2.712a4.974 4.974 0 00-3.282-1.24c-1.251 0-2.401.47-3.282 1.24a7.9 7.9 0 003.282.713 7.899 7.899 0 003.282-.713zm1.75-1.087c1.806-1.472 2.968-3.71 2.968-6.2 0-4.389-3.611-8-8-8-4.389 0-8 3.611-8 8 0 2.49 1.162 4.728 2.968 6.2a6.982 6.982 0 015.032-2.153c1.967 0 3.755.829 5.032 2.153zm-5.032-4.153c2.194 0 4-1.806 4-4s-1.806-4-4-4-4 1.806-4 4 1.806 4 4 4zm0-6c1.097 0 2 .903 2 2s-.903 2-2 2-2-.903-2-2 .903-2 2-2z" />
	</svg>
);

export default SvgAvatarOutline;
