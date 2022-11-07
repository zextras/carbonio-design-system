/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgFileVideo = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M19.72 7.323c.167.183.26.422.26.67V19.48a2.54 2.54 0 01-2.527 2.498H6.523a2.54 2.54 0 01-2.527-2.498V4.496a2.54 2.54 0 012.528-2.498h8.022a1 1 0 01.74.33l4.435 4.995zm-5.017 3.729h-5.43c-.652 0-1.188.536-1.188 1.188v5.43c0 .652.536 1.188 1.188 1.188h5.43c.652 0 1.189-.536 1.189-1.188v-5.43c0-.652-.537-1.188-1.189-1.188zm-5.75 6.618v-.547h.867v.868h-.547a.323.323 0 01-.32-.321zm6.071 0a.323.323 0 01-.32.32h-.547v-.867h.867v.547zm-6.072-2.281h.868v.867h-.868v-.867zm5.205 0h.867v.867h-.867v-.867zM9.82 14.52h-.868v-.867h.868v.867zm5.204 0h-.867v-.867h.867v.867zm0-2.281v.546h-.867v-.867h.546c.176 0 .321.145.321.32zm-5.75-.321h.546v.867h-.868v-.546c0-.176.145-.321.321-.321zm4.712-7.923l3.737 3.996h-2.997a.792.792 0 01-.74-.849V3.996z"
		/>
	</svg>
);

export default SvgFileVideo;
