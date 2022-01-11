/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';

function SvgContactsMod(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M11.988 2.014c5.506 0 9.975 4.47 9.975 9.974 0 5.506-4.47 9.975-9.975 9.975s-9.974-4.47-9.974-9.975 4.47-9.974 9.974-9.974zm-.535 9.837a3.195 3.195 0 013.228 1.328c.493.717.69 1.606.552 2.473a.546.546 0 01-.573.455H9.48l-.04-.001a.544.544 0 01-.566-.454 3.443 3.443 0 01.55-2.472l.043-.061a3.189 3.189 0 011.985-1.268zm6.195-1.36a1.546 1.546 0 11-2.986.804 1.546 1.546 0 012.986-.804zm-8.233.073a1.265 1.265 0 11-2.442.658 1.265 1.265 0 012.442-.658zm4.337-2.134a1.827 1.827 0 11-3.529.95 1.827 1.827 0 013.529-.95z"
			/>
		</svg>
	);
}

export default SvgContactsMod;
