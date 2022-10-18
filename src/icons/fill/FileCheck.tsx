/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgFileCheck = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M19.748 8.331l-5.44-6a1 1 0 00-.74-.33h-7.03a2.542 2.542 0 00-2.53 2.5v15a2.542 2.542 0 002.53 2.5h10.94a2.542 2.542 0 002.53-2.5v-10.5a1 1 0 00-.26-.67zm-5.075 4.927a1.005 1.005 0 00-1.41.09l-1.87 2.15-.63-.71a1.003 1.003 0 00-1.5 1.33l1.39 1.56c.192.212.465.332.75.33a1 1 0 00.74-.34l2.61-3a1.005 1.005 0 00-.08-1.41zM17.658 9h-3.94a.794.794 0 01-.71-.85v-4.15h.11l4.54 5z"
		/>
	</svg>
);

export default SvgFileCheck;
