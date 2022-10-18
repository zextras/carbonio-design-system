/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgDeletePermanentlyOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M20.98 5.994h-4.996V4.326a2.43 2.43 0 00-2.497-2.328H10.49a2.43 2.43 0 00-2.498 2.328v1.668H2.997c-.548 0-.999.451-.999 1 0 .547.451.998 1 .998h.998v10.99a3.011 3.011 0 002.997 2.997h9.99a3.011 3.011 0 002.997-2.997V7.992h1c.548 0 .998-.45.998-.999 0-.548-.45-.999-.998-.999zM9.99 4.326c0-.16.21-.33.5-.33h2.997c.29 0 .5.17.5.33v1.668H9.99V4.326zm7.992 14.655c0 .549-.45 1-.999 1h-9.99c-.548 0-.999-.451-.999-1V7.992h11.988v10.99z" />
		<path d="M14.696 11.014a1 1 0 00-1.419 0l-1.289 1.298-1.288-1.298a1.003 1.003 0 00-1.419 1.418l1.299 1.289L9.28 15.01a1 1 0 000 1.418 1 1 0 001.418 0l1.29-1.299 1.288 1.3a1 1 0 001.419 0 1 1 0 000-1.42l-1.3-1.288 1.3-1.289a1 1 0 000-1.418z" />
	</svg>
);

export default SvgDeletePermanentlyOutline;
