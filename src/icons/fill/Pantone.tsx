/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
/*
 * SPDX-FileCopyrightText: 2021 2018 Akveo
 *
 * SPDX-License-Identifier: MIT
 */

import React, { SVGProps } from 'react';

const SvgPantone = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="pantone">
				<path d="M20 13.18h-2.7l-1.86 2L11.88 19l-1.41 1.52L10 21h10a1 1 0 001-1v-5.82a1 1 0 00-1-1zM18.19 9.3l-4.14-3.86a.89.89 0 00-.71-.26 1 1 0 00-.7.31l-.82.89v10.71a5.23 5.23 0 01-.06.57l6.48-6.95a1 1 0 00-.05-1.41zM10.82 4a1 1 0 00-1-1H4a1 1 0 00-1 1v13.09a3.91 3.91 0 007.82 0zm-2 13.09a1.91 1.91 0 01-3.82 0V15h3.82zm0-4.09H5v-3h3.82zm0-5H5V5h3.82z" />
			</g>
		</g>
	</svg>
);

export default SvgPantone;
