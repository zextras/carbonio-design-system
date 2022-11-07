/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgEmailRead = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M2.215 7.848l3.25 2.463 5.924 4.443a.999.999 0 001.199 0l6.065-4.548 3.113-2.35c.137.342.213.715.213 1.104v9.99a3.011 3.011 0 01-2.997 2.997H4.995a2.978 2.978 0 01-2.153-.92 3.023 3.023 0 01-.685-1.12 2.967 2.967 0 01-.159-.957V8.96a2.968 2.968 0 01.217-1.112zm1.251-1.46c.067-.04.135-.078.205-.113l7.66-4.048c.214-.134.427-.213.657-.213.216 0 .39.07.6.187l7.718 4.074c.065.033.129.067.191.105L17.251 8.82l-5.263 3.885-4.994-3.661-3.528-2.657z"
		/>
	</svg>
);

export default SvgEmailRead;
