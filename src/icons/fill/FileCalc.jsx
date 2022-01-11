/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as React from 'react';

function SvgFileCalc(props) {
	return (
		<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M19.72 7.323c.167.183.26.422.26.67V19.48a2.54 2.54 0 01-2.527 2.498H6.523a2.54 2.54 0 01-2.527-2.498V4.496a2.54 2.54 0 012.528-2.498h8.022a1 1 0 01.74.33l4.435 4.995zm-4.298 11.569H8.576a.492.492 0 01-.491-.492v-6.825c0-.272.22-.492.491-.492h6.846c.27 0 .49.22.49.49v6.829c0 .27-.22.49-.49.49zm-.494-2.276h-2.43v1.292h2.43v-1.292zm-3.413 0H9.069v1.292h2.447v-1.292zm3.413-2.275h-2.43v1.292h2.43V14.34zm-3.413 0H9.069v1.292h2.447V14.34zm3.413-2.275h-2.43v1.292h2.43v-1.292zm-3.413 0H9.069v1.292h2.447v-1.292zm2.471-8.07l3.737 3.996h-2.997a.792.792 0 01-.74-.849V3.996z"
			/>
		</svg>
	);
}

export default SvgFileCalc;
