/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';

function SvgSmileOutline(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M11.988 1.998c-5.48 0-9.99 4.51-9.99 9.99s4.51 9.99 9.99 9.99 9.99-4.51 9.99-9.99-4.51-9.99-9.99-9.99zm0 17.983c-4.384 0-7.992-3.608-7.992-7.993 0-4.384 3.608-7.992 7.992-7.992 4.385 0 7.992 3.608 7.992 7.992 0 4.385-3.607 7.992-7.992 7.992z" />
			<path d="M9.928 10.958a.983.983 0 100-1.967.983.983 0 000 1.967zM13.972 10.958a.983.983 0 100-1.967.983.983 0 000 1.967z" />
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M13.941 13.942a2.764 2.764 0 01-3.907 0 .984.984 0 00-1.39 1.39 4.732 4.732 0 006.688 0 .984.984 0 00-1.39-1.39z"
			/>
		</svg>
	);
}

export default SvgSmileOutline;
