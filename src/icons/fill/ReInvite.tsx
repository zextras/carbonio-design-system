/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgReInvite = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M15 4v-.999c0-.549.451-1 1-1 .549 0 1 .451 1 1v1h1c1.646 0 3 1.354 3 3v12c0 1.646-1.354 3-3 3H6c-1.646 0-3-1.354-3-3v-12c0-1.646 1.354-3 3-3h1V3a1.006 1.006 0 01.751-.968.991.991 0 01.946.254C8.888 2.474 9 2.733 9 3v1h6zm.232 9.786c.09-.092.162-.2.21-.32a1 1 0 00.08-.39v-.1a.816.816 0 00-.17-.46 1.02 1.02 0 00-.09-.13l-2.03-2.17a1 1 0 00-1.45 1.38l.4.48H9.478c-.549 0-1 .451-1 1 0 .549.451 1 1 1h2.635l-.316.306a1 1 0 000 1.42 1 1 0 001.42 0l2.015-2.016z" />
	</svg>
);

export default SvgReInvite;
