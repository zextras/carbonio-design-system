/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { SVGProps } from 'react';

const SvgAddressBookShareWithMeFill = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			d="M19 21H7c-1.6 0-3-1.4-3-3v-1H3c-.5 0-1-.5-1-1 0-.6.5-1 1-1h1V9H3c-.5 0-1-.5-1-1 0-.6.5-1 1-1h1V6c0-1.6 1.4-3 3-3h12c1.6 0 3 1.4 3 3v12c0 1.6-1.4 3-3 3zm-2.7-9.7h-4l.9-1c.1-.2.2-.4.2-.6 0-.2-.1-.4-.2-.5-.1-.1-.3-.2-.5-.2s-.4.1-.5.2l-2 2.3-.1.1v.1c-.1.1-.1.2-.1.2v.1c0 .1 0 .2.1.3 0 .1 0 .2.1.2l2.1 2.3c.1 0 .1.1.2.1.1.1.2.1.3.1.1 0 .2 0 .3-.1.1 0 .1-.1.2-.1.1-.1.1-.2.2-.3v-.3-.2c-.1-.1-.1-.2-.2-.3l-.9-.9h3.9c.2 0 .4-.1.5-.3.1-.1.2-.3.2-.5s-.1-.4-.2-.5c-.1-.2-.3-.2-.5-.2z"
		/>
	</svg>
);

export default SvgAddressBookShareWithMeFill;
