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

const SvgFlash = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M11.11 23a1 1 0 01-.34-.06 1 1 0 01-.65-1.05l.77-7.09H5a1 1 0 01-.83-1.56l7.89-11.8a1 1 0 011.17-.38 1 1 0 01.65 1l-.77 7.14H19a1 1 0 01.83 1.56l-7.89 11.8a1 1 0 01-.83.44z"
				data-name="flash"
			/>
		</g>
	</svg>
);

export default SvgFlash;