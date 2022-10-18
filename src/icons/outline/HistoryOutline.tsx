/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgHistoryOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M3.697 13.417c.52-.162 1.082.13 1.248.65a7.149 7.149 0 006.864 4.914c3.883.044 7.118-3.11 7.173-6.993-.055-3.883-3.29-7.037-7.173-6.993a7.255 7.255 0 00-4.646 1.668l2.168-.36a1.003 1.003 0 01.32 1.978l-4.236.7h-.17c-.116 0-.23-.02-.34-.06a.334.334 0 01-.1-.06.776.776 0 01-.2-.11l-.09-.11c0-.05-.09-.09-.13-.15-.04-.06 0-.1-.049-.14a1.348 1.348 0 01-.07-.179l-.75-3.996a1.017 1.017 0 011.999-.38l.27 1.449a9.203 9.203 0 016.024-2.248c4.98-.044 9.116 4.012 9.17 8.991-.054 4.98-4.19 9.036-9.17 8.992a9.132 9.132 0 01-8.812-6.314 1 1 0 01.7-1.25z" />
	</svg>
);

export default SvgHistoryOutline;
