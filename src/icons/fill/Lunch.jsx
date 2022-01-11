/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';

function SvgLunch(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M6.154 20.08C2.048 17.126.767 11.475 3.35 7.002 6.103 2.234 12.208.598 16.976 3.35c4.767 2.752 6.403 8.858 3.65 13.625-2.59 4.488-8.152 6.201-12.773 4.09l2.748-4.704a3.93 3.93 0 004.447-1.821L17.44 10.4a.986.986 0 00-1.707-.986l-2.05 3.55s-.234.406-.678.15c-.395-.229-.161-.634-.161-.634l2.05-3.55a.986.986 0 00-1.707-.986l-2.05 3.55s-.234.406-.638.173c-.436-.252-.202-.657-.202-.657l2.05-3.55a.986.986 0 00-1.707-.986l-2.39 4.141a3.93 3.93 0 00.646 4.762L6.64 19.28l-.487.799z"
			/>
		</svg>
	);
}

export default SvgLunch;
