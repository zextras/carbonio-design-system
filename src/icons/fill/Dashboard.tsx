/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgDashboard = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M19.943 20.016H4.057a9.938 9.938 0 01-2.041-6.047c0-5.51 4.473-9.985 9.984-9.985 5.51 0 9.984 4.474 9.984 9.985 0 2.272-.76 4.368-2.04 6.047zm-3.25-9.765a1 1 0 00-1.415 0l-4.142 4.142a1 1 0 001.415 1.414l4.142-4.142a1 1 0 000-1.414zM6.973 13a.995.995 0 110 1.991.995.995 0 010-1.99zm10.05-.196a.995.995 0 110 1.99.995.995 0 010-1.99zm-9.192-2.614a.995.995 0 110 1.99.995.995 0 010-1.99zm2.432-1.87a.995.995 0 11-.001 1.99.995.995 0 01.001-1.99zm2.984-.12a.995.995 0 110 1.99.995.995 0 010-1.99z"
		/>
	</svg>
);

export default SvgDashboard;
