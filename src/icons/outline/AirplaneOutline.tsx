/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgAirplaneOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M14.11 15.5c1.553-1.553 2.248-4.771.695-6.324-1.553-1.554-4.771-.859-6.325.695-1.553 1.553-.858 3.38.696 4.934 1.553 1.553 3.38 2.249 4.934.695zm-1.408-1.407c-.695.695-1.424 0-2.119-.696-.695-.695-1.39-1.423-.695-2.119.499-.499 1.275-.839 2.042-.95.544-.08 1.113-.1 1.468.255.354.354.334.924.255 1.468-.112.766-.452 1.543-.95 2.042z"
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M10.452 10.445a.98.98 0 000-1.384L5.247 3.857a.98.98 0 00-1.384 0l-.006.006a.98.98 0 000 1.384l5.204 5.205a.98.98 0 001.384 0l.007-.007zM20.119 20.113a.979.979 0 000-1.384l-5.017-5.017a.979.979 0 00-1.384 0l-.007.007a.98.98 0 000 1.384l5.017 5.017a.98.98 0 001.384 0l.007-.007z"
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M6.415 7.764a1.514 1.514 0 01-2.14 2.14 1.514 1.514 0 012.14-2.14zM16.216 17.566a1.514 1.514 0 01-2.14 2.14 1.514 1.514 0 012.14-2.14zM16.954 7.02a.98.98 0 00-1.385 0L13.41 9.179a.98.98 0 000 1.384l.007.006a.98.98 0 001.384 0l2.16-2.158a.98.98 0 000-1.385l-.007-.006z"
		/>
	</svg>
);

export default SvgAirplaneOutline;
