/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';

function SvgWeekViewOutline(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path d="M14.985 3.996v-.999c0-.548.451-.999 1-.999.547 0 .998.451.998 1v.998h1a3.011 3.011 0 012.997 2.997v11.989a3.011 3.011 0 01-2.998 2.997H5.994a3.011 3.011 0 01-2.997-2.997V6.992a3.011 3.011 0 012.997-2.997h1v-.999A1.004 1.004 0 018.043 2a.985.985 0 01.645.285c.19.186.302.446.302.713v1h5.994zm2.997 15.984c.549 0 1-.45 1-.998V6.992c0-.548-.451-.999-1-.999h-.999v1c0 .547-.45.998-.999.998-.548 0-.999-.45-.999-.999v-.999H8.991v1c0 .547-.45.998-.999.998-.548 0-.999-.45-.999-.999v-.999h-.999c-.548 0-.999.451-.999 1v11.988c0 .112.02.224.057.33.102.286.336.517.623.616.103.035.21.052.32.052h11.987z" />
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M16.482 10.983a1 1 0 00-1.998 0v6a1 1 0 001.998 0v-6zM9.493 10.983a1 1 0 00-1.998 0v6a1 1 0 001.998 0v-6zM12.987 10.983a1 1 0 00-1.998 0v6a1 1 0 001.998 0v-6z"
			/>
		</svg>
	);
}

export default SvgWeekViewOutline;