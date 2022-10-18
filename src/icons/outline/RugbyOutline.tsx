/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgRugbyOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M3.64 20.336c-.643-.768-.643-2.661-.643-4.087 0-7.314 5.938-13.253 13.253-13.253 1.425 0 3.504.098 4.086.643.65.609.644 2.662.644 4.087 0 7.314-5.939 13.253-13.253 13.253-1.426 0-3.548 0-4.087-.643zm15.2-15.192a4.442 4.442 0 00-.317-.058c-.726-.1-1.585-.123-2.273-.123-6.23 0-11.286 5.057-11.286 11.286 0 .647-.004 1.4.069 2.08.016.152.056.348.093.51.584.056 1.901.173 2.6.173 6.23 0 11.287-5.057 11.287-11.286 0-.7-.117-2.002-.173-2.582z"
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M13.38 9.202l.67-.669a.986.986 0 011.393 1.393l-.67.67.513.511a.986.986 0 01-1.394 1.394l-.512-.512-1.364 1.364.512.512a.986.986 0 01-1.393 1.394l-.512-.512-.697.697a.986.986 0 01-1.393-1.394l.696-.697-.512-.512a.986.986 0 011.394-1.393l.512.512 1.364-1.364-.512-.512a.986.986 0 011.394-1.394l.511.512zM5.037 13.129l-1.39 1.39 5.717 5.717 1.39-1.39-5.717-5.717z"
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M5.037 13.129l-1.39 1.39 5.717 5.717 1.39-1.39-5.717-5.717zM14.51 3.655l-1.39 1.39 5.717 5.718 1.391-1.391-5.717-5.717z"
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M14.51 3.655l-1.39 1.39 5.717 5.718 1.391-1.391-5.717-5.717z"
		/>
	</svg>
);

export default SvgRugbyOutline;
