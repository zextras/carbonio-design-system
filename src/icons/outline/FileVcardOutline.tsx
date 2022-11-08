/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgFileVcardOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M19.72 8.322l-5.434-5.994a1 1 0 00-.74-.33H6.525a2.54 2.54 0 00-2.528 2.498V19.48a2.54 2.54 0 002.528 2.498H17.453a2.54 2.54 0 002.527-2.498V8.99a.999.999 0 00-.26-.67zm-5.734-3.327l2.738 2.997h-1.998a.792.792 0 01-.74-.849V4.995zm3.437 14.985H6.553l-.03.001a.532.532 0 01-.529-.5V4.496a.532.532 0 01.56-.5h5.434v3.147a2.8 2.8 0 002.708 2.847h3.286v9.49a.532.532 0 01-.559.5z" />
		<path d="M14.59 18.889a.436.436 0 00.434-.434 3.05 3.05 0 00-3.036-3.036 3.05 3.05 0 00-3.036 3.036c0 .238.196.434.434.434h5.204zm-2.602-4.337c.952 0 1.735-.783 1.735-1.735 0-.952-.783-1.735-1.735-1.735-.952 0-1.735.783-1.735 1.735 0 .952.783 1.735 1.735 1.735z" />
	</svg>
);

export default SvgFileVcardOutline;
