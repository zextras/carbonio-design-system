/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgFileCalcOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M19.72 8.322l-5.434-5.994a1 1 0 00-.74-.33H6.525a2.54 2.54 0 00-2.528 2.498V19.48a2.54 2.54 0 002.528 2.498H17.453a2.54 2.54 0 002.527-2.498V8.99a.999.999 0 00-.26-.67zm-5.734-3.327l2.738 2.997h-1.998a.792.792 0 01-.74-.849V4.995zm3.437 14.985H6.553l-.03.001a.532.532 0 01-.529-.5V4.496a.532.532 0 01.56-.5h5.434v3.147a2.8 2.8 0 002.708 2.847h3.286v9.49a.532.532 0 01-.559.5z" />
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M8.595 18.892H8.577a.492.492 0 01-.492-.492v-6.825c0-.272.22-.492.492-.492h6.845c.27 0 .49.22.49.49v6.829c0 .27-.22.49-.49.49H8.595zm6.333-2.276H12.5v1.292h2.43v-1.292zm-3.412 0H9.068v1.292h2.448v-1.292zm3.412-2.275H12.5v1.292h2.43V14.34zm-3.412 0H9.068v1.292h2.448V14.34zm3.412-2.275H12.5v1.292h2.43v-1.292zm-3.412 0H9.068v1.292h2.448v-1.292z"
		/>
	</svg>
);

export default SvgFileCalcOutline;
