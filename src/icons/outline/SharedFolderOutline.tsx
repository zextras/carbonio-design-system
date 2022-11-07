/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgSharedFolderOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		clipRule="evenodd"
		fillRule="evenodd"
		strokeLinejoin="round"
		strokeMiterlimit={2}
		{...props}
	>
		<path fill="none" d="M0 0h24v24H0z" />
		<path fill="none" d="M0 0h24v24H0z" />
		<path d="M19.5 7.05A2.482 2.482 0 0122 9.48v8.59a2.482 2.482 0 01-2.5 2.43h-15A2.482 2.482 0 012 18.07V5.93A2.482 2.482 0 014.5 3.5h4.6a1 1 0 01.77.37l2.044 2.471a3.015 3.015 0 00-1.067 1.87L8.63 5.5H4.5a.462.462 0 00-.5.43v12.12a.462.462 0 00.5.43h15a.462.462 0 00.5-.43V9.48a.462.462 0 00-.5-.43h-2.68a3 3 0 00-.45-2zm-7.569 2.069a1.97 1.97 0 011.932-2.348 1.97 1.97 0 11-.634 3.833l-1.16 1.014a1.973 1.973 0 010 .76l1.162 1.018a1.97 1.97 0 11.633 3.833 1.97 1.97 0 01-1.933-2.35l-1.162-1.017a1.97 1.97 0 11.001-3.73z" />
	</svg>
);

export default SvgSharedFolderOutline;
