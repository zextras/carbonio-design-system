/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgEditAsNew = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M19.983 11.819c-.548 0-.999.45-.999.999v5.564c0 .329-.27.6-.599.6H5.597c-.328 0-.599-.271-.599-.6V5.595c0-.33.27-.6.6-.6h5.392c.548 0 1-.45 1-.999 0-.548-.452-.999-1-.999H5.597A2.62 2.62 0 003 5.595v12.787a2.62 2.62 0 002.597 2.598h12.788a2.62 2.62 0 002.597-2.598v-5.564c0-.548-.45-1-.999-1z" />
		<path d="M12.501 5.912l5.49 5.49-5.195 5.194a1.98 1.98 0 01-1.209.57c-1.388.126-2.776.255-4.165.379-.03.002-.06 0-.09 0a1.001 1.001 0 01-.999-1.089l.43-4.166a2.016 2.016 0 01.569-1.209l5.17-5.17zm1.39-1.391l2.057-2.056a2.005 2.005 0 012.658.07l2.737 2.737c.76.724.792 1.945.07 2.707l-2.032 2.032-5.49-5.49z" />
	</svg>
);

export default SvgEditAsNew;
