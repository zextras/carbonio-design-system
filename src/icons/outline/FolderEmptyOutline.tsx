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

const SvgFolderEmptyOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<path d="M0 0h24v24H0z" />
		<path d="M19.5 20.5h-15c-1.4 0-2.5-1.1-2.5-2.4V5.9c0-1.4 1.1-2.4 2.5-2.4h4.6c.3 0 .6.1.8.4l2.6 3.2h7c1.4 0 2.5 1 2.5 2.4v8.6c0 1.3-1.1 2.4-2.5 2.4zM4 13.8v4.3c0 .3.2.4.5.4h15c.3 0 .5-.2.5-.4V9.5c0-.3-.2-.5-.5-.5H12c-.3 0-.6-.1-.8-.4L8.6 5.5H4.5c-.3 0-.5.2-.5.4z" />
	</svg>
);

export default SvgFolderEmptyOutline;
