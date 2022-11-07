/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgStatusMaybe = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M15 4v-.999c0-.549.451-1 1-1 .549 0 1 .451 1 1v1h1c1.646 0 3 1.354 3 3v12c0 1.646-1.354 3-3 3H6c-1.646 0-3-1.354-3-3v-12c0-1.646 1.354-3 3-3h1V3a1.006 1.006 0 01.751-.968.991.991 0 01.946.254C8.888 2.474 9 2.733 9 3v1h6zm-3 13.001a1 1 0 11-.001 2.001 1 1 0 01.001-2zm0-9.062c-1.92 0-3.5 1.58-3.5 3.5 0 .548.451 1 1 1 .549 0 1-.452 1-1 0-.823.677-1.5 1.5-1.5s1.5.677 1.5 1.5c0 .822-.677 1.5-1.5 1.5-.549 0-1 .451-1 1V15c0 .549.451 1 1 1 .549 0 1-.451 1-1v-.223a3.498 3.498 0 002.512-3.35 3.507 3.507 0 00-3.49-3.49H12z"
		/>
	</svg>
);

export default SvgStatusMaybe;
