/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgFileHtmlOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M19.72 8.322l-5.434-5.994a1 1 0 00-.74-.33H6.525a2.54 2.54 0 00-2.528 2.498V19.48a2.54 2.54 0 002.528 2.498H17.453a2.54 2.54 0 002.527-2.498V8.99a.999.999 0 00-.26-.67zm-5.734-3.327l2.738 2.997h-1.998a.792.792 0 01-.74-.849V4.995zm3.437 14.985H6.553l-.03.001a.532.532 0 01-.529-.5V4.496a.532.532 0 01.56-.5h5.434v3.147a2.8 2.8 0 002.708 2.847h3.286v9.49a.532.532 0 01-.559.5z" />
		<path d="M9.223 14.987l2.238-2.677a.5.5 0 10-.77-.64l-2.497 2.997a.5.5 0 000 .635l2.413 2.997a.5.5 0 00.39.185h.001a.502.502 0 00.388-.814l-2.163-2.683zM15.806 14.672l-2.387-2.997a.501.501 0 00-.78.63l2.134 2.682-2.238 2.682a.5.5 0 00.065.705c.09.073.203.111.32.11a.5.5 0 00.384-.18l2.497-2.997a.501.501 0 00.005-.635z" />
	</svg>
);

export default SvgFileHtmlOutline;
