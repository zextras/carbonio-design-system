/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';

function SvgCos(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M19.987 12A7.99 7.99 0 0112 19.989 7.99 7.99 0 014.013 12 7.99 7.99 0 0112 4.014a.987.987 0 000-1.973c-5.497 0-9.96 4.463-9.96 9.96 0 5.497 4.463 9.96 9.96 9.96 5.497 0 9.96-4.463 9.96-9.96a.987.987 0 00-1.973 0zM17.647 4.96a.984.984 0 111.392 1.394.984.984 0 01-1.392-1.393z"
			/>
			<path d="M12 7c-2.743 0-5 2.257-5 5s2.257 5 5 5 5-2.257 5-5-2.257-5-5-5z" />
		</svg>
	);
}

export default SvgCos;
