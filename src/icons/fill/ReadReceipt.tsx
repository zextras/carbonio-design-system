import * as React from 'react';
import type { SVGProps } from 'react';

const SvgReadReceipt = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path
			fillRule="evenodd"
			d="M19.326 3.996c.44 0 .855.107 1.22.297l-8.583 8.584-2.825-2.826a.998.998 0 1 0-1.413 1.413l3.532 3.532c.28.28.714.368 1.082.219.125-.05.235-.126.33-.22l9.177-9.176c.086.261.133.54.133.83v10.679a2.654 2.654 0 0 1-2.653 2.652H4.651a2.654 2.654 0 0 1-2.653-2.652V6.648a2.654 2.654 0 0 1 2.653-2.652h14.675Z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgReadReceipt;
