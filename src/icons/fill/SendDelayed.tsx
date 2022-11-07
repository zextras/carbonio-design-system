/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

const SvgSendDelayed = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M9.928 6.057c-3.254 0-5.932 2.677-5.932 5.931s2.678 5.932 5.932 5.932c3.254 0 5.931-2.678 5.931-5.932 0-3.254-2.677-5.931-5.931-5.931zm2.076 4.932h-1.077V9.007c0-.548-.451-1-1-1-.547 0-.998.452-.998 1v2.981c0 .548.45 1 .999 1h2.076c.548 0 .999-.452.999-1s-.451-.999-1-.999z"
		/>
		<path d="M5.444 20.87a1.009 1.009 0 01-1.333-.424 1 1 0 01-.093-.683.952.952 0 01.147-.332l1.388-2.097a6.878 6.878 0 003.874 1.545L5.444 20.87zM9.427 5.1a6.876 6.876 0 00-3.874 1.544L4.165 4.546a.998.998 0 011.279-1.439L9.426 5.1zm12.001 6a1.007 1.007 0 01.473 1.259.999.999 0 01-.473.52l-5.69 2.845a6.873 6.873 0 001.097-3.734 6.872 6.872 0 00-1.096-3.734l5.69 2.845z" />
	</svg>
);

export default SvgSendDelayed;
