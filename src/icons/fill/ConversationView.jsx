/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';

function SvgConversationView(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M21.979 18.05l-11.986-.005a.999.999 0 00-.55.14l-5.936 3.654a.998.998 0 01-1.509-.86V5.995a3.011 3.011 0 012.997-2.997h13.986a3.011 3.011 0 012.997 2.997V18.05zm0 2.93a1.015 1.015 0 01-.243.65 1.012 1.012 0 01-.888.34 1.018 1.018 0 01-.378-.131l-2.873-1.822h4.381v.963zm-5.963-9.011H7.96a.984.984 0 000 1.967h8.055a.984.984 0 000-1.967zm0-3.902H7.96a.984.984 0 000 1.967h8.055a.984.984 0 000-1.967z" />
		</svg>
	);
}

export default SvgConversationView;
