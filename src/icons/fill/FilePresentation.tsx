/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgFilePresentation = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M19.72 7.323c.167.183.26.422.26.67V19.48a2.54 2.54 0 01-2.527 2.498H6.523a2.54 2.54 0 01-2.527-2.498V4.496a2.54 2.54 0 012.528-2.498h8.022a1 1 0 01.74.33l4.435 4.995zm-5.28 3.76c.823 0 1.5.676 1.5 1.498v2.998c0 .822-.677 1.498-1.5 1.498h-.88l.582 1.007a.492.492 0 01-.852.491l-.865-1.498h-.84l-.866 1.498a.492.492 0 01-.851-.491l.58-1.007h-.88a1.506 1.506 0 01-1.498-1.499v-2.997c0-.822.677-1.498 1.499-1.498h4.872zm.5 4.495c0 .275-.225.5-.5.5H9.57a.502.502 0 01-.5-.5v-2.997c0-.274.225-.5.5-.5h4.872c.274 0 .5.226.5.5v2.998zm-.954-11.582l3.737 3.996h-2.997a.792.792 0 01-.74-.849V3.996z"
		/>
	</svg>
);

export default SvgFilePresentation;
