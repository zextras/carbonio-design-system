/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgAllTasksOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M19.027 7a3.018 3.018 0 012.016 2.832L21.04 18c0 1.646-1.354 3-3 3H9.866c-1.296 0-2.411-.84-2.827-2h11c.549 0 1-.451 1-1l-.012-11zM5.977 3h8.062c1.646 0 3 1.354 3 3v8.063c0 1.645-1.354 3-3 3H5.977c-1.646 0-3-1.355-3-3V6c0-1.646 1.354-3 3-3zm8.062 12.063c.549 0 1-.452 1-1V6c0-.549-.451-1-1-1H5.977c-.55 0-1 .451-1 1v8.063c0 .112.019.224.056.33.102.287.336.518.624.617.103.035.211.052.32.053h8.062z" />
		<path d="M12.694 7.779a1.005 1.005 0 00-1.41.09l-1.87 2.15-.63-.71a1.003 1.003 0 00-1.5 1.33l1.39 1.56a1 1 0 00.75.33 1 1 0 00.74-.34l2.61-3a1.005 1.005 0 00-.08-1.41z" />
	</svg>
);

export default SvgAllTasksOutline;
