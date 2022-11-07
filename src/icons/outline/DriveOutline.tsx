/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgDriveOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M10.415 2.997c.322 0 .633.127.862.356l1.948 1.948a.457.457 0 00.322.135h5.604c1.008 0 1.829.817 1.829 1.828v11.887a1.828 1.828 0 01-1.829 1.829H4.825a1.828 1.828 0 01-1.828-1.829V4.825a1.83 1.83 0 011.828-1.828h5.59zm2.67 4.353c-.317 0-.622-.125-.847-.35l-1.912-1.912a.449.449 0 00-.316-.132H5.404a.45.45 0 00-.448.448v13.168a.45.45 0 00.448.449h13.168a.45.45 0 00.449-.449V7.8a.45.45 0 00-.449-.449h-5.487zm-2.262 4.092a1.265 1.265 0 11.897.408l-.804 1.768c.174.146.322.325.432.531l1.873-.42a1.547 1.547 0 013.03-.241 1.546 1.546 0 01-2.815 1.203l-1.872.42a1.827 1.827 0 11-1.544-1.901l.803-1.768z" />
	</svg>
);

export default SvgDriveOutline;
