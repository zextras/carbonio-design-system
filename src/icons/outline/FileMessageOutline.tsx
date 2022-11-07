/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgFileMessageOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M19.72 8.322l-5.434-5.994a1 1 0 00-.74-.33H6.525a2.54 2.54 0 00-2.528 2.498V19.48a2.54 2.54 0 002.528 2.498H17.453a2.54 2.54 0 002.527-2.498V8.99a.999.999 0 00-.26-.67zm-5.734-3.327l2.738 2.997h-1.998a.792.792 0 01-.74-.849V4.995zm3.437 14.985H6.553l-.03.001a.532.532 0 01-.529-.5V4.496a.532.532 0 01.56-.5h5.434v3.147a2.8 2.8 0 002.708 2.847h3.286v9.49a.532.532 0 01-.559.5z" />
		<path d="M15.219 11.41H8.777c-.801 0-1.46.66-1.46 1.461v4.495c0 .8.659 1.46 1.46 1.46h6.442c.801 0 1.46-.66 1.46-1.46V12.87c0-.8-.659-1.46-1.46-1.46zm-.326.975l-2.895 2.312-2.895-2.312h5.79zm.326 5.467H8.777a.49.49 0 01-.487-.486v-4.373l3.416 2.702a.488.488 0 00.584 0l3.416-2.702v4.373a.49.49 0 01-.487.486z" />
	</svg>
);

export default SvgFileMessageOutline;
