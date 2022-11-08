/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgDeletePermanently = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M13.487 1.998a2.43 2.43 0 012.497 2.328v1.668h4.996c.548 0 .998.451.998 1 0 .547-.45.998-.998.998h-1v10.99a3.011 3.011 0 01-2.997 2.997h-9.99a3.011 3.011 0 01-2.997-2.997V7.992h-.999c-.548 0-.999-.45-.999-.999 0-.548.451-.999 1-.999h4.994V4.326a2.416 2.416 0 01.75-1.657c.275-.262.61-.46.973-.57.251-.076.513-.109.775-.1h2.997zm1.209 9.016a.999.999 0 00-1.419 0l-1.289 1.298-1.288-1.298a1.003 1.003 0 10-1.419 1.418l1.299 1.289L9.28 15.01a1 1 0 000 1.418 1 1 0 001.418 0l1.29-1.298 1.288 1.298a.999.999 0 001.419 0 .999.999 0 000-1.418l-1.3-1.289 1.3-1.289a.999.999 0 000-1.418zm-.71-5.02V4.326c0-.16-.21-.33-.5-.33H10.49c-.29 0-.5.17-.5.33v1.668h3.996z" />
	</svg>
);

export default SvgDeletePermanently;
