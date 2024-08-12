import * as React from 'react';
import type { SVGProps } from 'react';

const SvgInfinityOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path
			fillRule="evenodd"
			d="m9.184 10.59-.839-.835a3.16 3.16 0 0 0-4.468 0 3.16 3.16 0 0 0 0 4.467 3.16 3.16 0 0 0 4.468 0l5.89-5.861a5.13 5.13 0 0 1 7.254 0 5.13 5.13 0 0 1 0 7.255 5.13 5.13 0 0 1-7.255 0l-.847-.824 1.405-1.405.835.835a3.16 3.16 0 0 0 4.468 0 3.16 3.16 0 0 0 0-4.467 3.16 3.16 0 0 0-4.467 0l-5.89 5.86a5.13 5.13 0 0 1-7.254 0 5.13 5.13 0 0 1 0-7.254 5.13 5.13 0 0 1 7.255 0l.85.823z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgInfinityOutline;
