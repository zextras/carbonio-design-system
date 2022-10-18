/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
/*
 * SPDX-FileCopyrightText: 2021 2018 Akveo
 *
 * SPDX-License-Identifier: MIT
 */

import React, { SVGProps } from 'react';

const SvgPieChart = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="pie-chart">
				<path d="M14.5 10.33h6.67A.83.83 0 0022 9.5 7.5 7.5 0 0014.5 2a.83.83 0 00-.83.83V9.5a.83.83 0 00.83.83z" />
				<path d="M21.08 12h-8.15a.91.91 0 01-.91-.91V2.92A.92.92 0 0011 2a10 10 0 1011 11 .92.92 0 00-.92-1z" />
			</g>
		</g>
	</svg>
);

export default SvgPieChart;
