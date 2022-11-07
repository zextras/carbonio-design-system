/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgActiveBoardOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M15.809 4.997l1.808.042-3.998 3.998a1.004 1.004 0 000 1.413 1.004 1.004 0 001.413 0l3.948-3.949-.007 1.83a1.004 1.004 0 002.007 0V4.092a1 1 0 00-.085-.381.939.939 0 00-.537-.537.542.542 0 00-.184-.042.494.494 0 00-.176-.036l-4.14-.099a1 1 0 10-.05 2z" />
		<path d="M11.927 2.997a1 1 0 11-.072 1.998h-5.86a1.003 1.003 0 00-1 .999v.968H9.96v.002a1 1 0 11-.095 1.996H8.96V18.98h9.035a.971.971 0 00.376-.08c.226-.096.412-.276.516-.497a.976.976 0 00.095-.422v-5.65a1 1 0 111.998-.064v5.714a3.011 3.011 0 01-2.998 2.997H5.994a3.011 3.011 0 01-2.997-2.997V5.994a3.011 3.011 0 012.997-2.997h5.933zM6.962 8.96H4.995v9.022a.998.998 0 00.698.952c.097.031.199.047.301.047h.968V8.96z" />
	</svg>
);

export default SvgActiveBoardOutline;
