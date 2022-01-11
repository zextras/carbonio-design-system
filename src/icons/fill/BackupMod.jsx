/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';

function SvgBackupMod(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12 2.016c5.51 0 9.984 4.473 9.984 9.984 0 5.51-4.474 9.984-9.984 9.984S2.016 17.51 2.016 12 6.489 2.016 12 2.016zm.565 14.099a1.266 1.266 0 11-2.445.658 1.266 1.266 0 012.445-.658zm.712-.839a3.517 3.517 0 10-2.568-6.547 2.796 2.796 0 00-1.652-1.357A5.487 5.487 0 0117.484 12a5.49 5.49 0 01-4.047 5.294c.107-.262.165-.55.165-.85 0-.427-.119-.827-.325-1.168zM9.649 13.97a1.548 1.548 0 11-2.988.804 1.548 1.548 0 012.988-.804zm.365-4.407a1.829 1.829 0 11-3.532.951 1.829 1.829 0 013.532-.95z"
			/>
		</svg>
	);
}

export default SvgBackupMod;
