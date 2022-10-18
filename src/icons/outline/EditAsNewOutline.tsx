/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgEditAsNewOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M19.98 11.819c-.548 0-.998.45-.998.999v5.564c0 .329-.271.6-.6.6H5.595c-.33 0-.6-.271-.6-.6V5.595c0-.33.27-.6.6-.6h5.392c.548 0 1-.45 1-.999 0-.548-.452-.999-1-.999H5.595a2.62 2.62 0 00-2.598 2.598v12.787a2.62 2.62 0 002.598 2.598h12.787a2.62 2.62 0 002.598-2.598v-5.564c0-.548-.451-1-1-1z" />
		<path d="M21.349 5.272L18.61 2.535a2.005 2.005 0 00-2.657-.07l-8.617 8.617a1.998 1.998 0 00-.57 1.208l-.429 4.166a.999.999 0 001 1.09h.09l4.165-.38a1.998 1.998 0 001.209-.57l8.616-8.616a1.927 1.927 0 00-.07-2.708zm-9.936 9.896l-2.997.28.27-2.998 5.27-5.2 2.697 2.698-5.24 5.22zm6.539-6.559l-2.678-2.677 1.949-1.998L19.95 6.66l-1.998 1.948z" />
	</svg>
);

export default SvgEditAsNewOutline;
