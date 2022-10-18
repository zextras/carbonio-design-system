/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgAddressBook = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M18.982 20.98H6.992a3.011 3.011 0 01-2.997-2.998v-.999h-.999c-.548 0-.999-.45-.999-.999 0-.548.451-.999 1-.999h.998V8.991h-.999c-.548 0-.999-.45-.999-.999 0-.548.451-.999 1-.999h.998v-.999a3.011 3.011 0 012.997-2.997h11.989a3.011 3.011 0 012.997 2.997v11.988a3.011 3.011 0 01-2.997 2.998zm-7.632-4.91a1.922 1.922 0 011.913-1.901c1.046 0 1.907.857 1.913 1.901a.986.986 0 001.97-.012 3.902 3.902 0 00-3.883-3.86c-2.123 0-3.87 1.74-3.883 3.86a.986.986 0 001.97.012zm1.913-5.185a1.987 1.987 0 001.977-1.977 1.987 1.987 0 00-1.977-1.977 1.986 1.986 0 00-1.977 1.977c0 1.085.892 1.977 1.977 1.977z" />
	</svg>
);

export default SvgAddressBook;
