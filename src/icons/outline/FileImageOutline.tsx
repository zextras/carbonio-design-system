/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgFileImageOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M19.72 8.322l-5.434-5.994a1 1 0 00-.74-.33H6.525a2.54 2.54 0 00-2.528 2.498V19.48a2.54 2.54 0 002.528 2.498H17.453a2.54 2.54 0 002.527-2.498V8.99a.999.999 0 00-.26-.67zm-5.734-3.327l2.738 2.997h-1.998a.792.792 0 01-.74-.849V4.995zm3.437 14.985H6.553l-.03.001a.532.532 0 01-.529-.5V4.496a.532.532 0 01.56-.5h5.434v3.147a2.8 2.8 0 002.708 2.847h3.286v9.49a.532.532 0 01-.559.5z" />
		<path d="M9.883 11.083c.822 0 1.499.676 1.499 1.498s-.677 1.499-1.499 1.499a1.506 1.506 0 01-1.498-1.499c0-.822.676-1.498 1.498-1.498zM15.888 18.19a.657.657 0 01-.6.701H8.085l4.544-4.093a.416.416 0 01.558 0l2.701 2.689v.702z" />
	</svg>
);

export default SvgFileImageOutline;
