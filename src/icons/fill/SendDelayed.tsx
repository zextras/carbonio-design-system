import * as React from 'react';
import type { SVGProps } from 'react';

const SvgSendDelayed = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path
			fillRule="evenodd"
			d="M9.928 6.057c-3.254 0-5.932 2.677-5.932 5.931s2.678 5.932 5.932 5.932 5.932-2.678 5.932-5.932-2.678-5.931-5.932-5.931m2.076 4.932h-1.077V9.007c0-.548-.451-1-1-1-.547 0-.998.452-.998 1v2.981c0 .548.45 1 .999 1h2.076c.548 0 .999-.452.999-1s-.451-.999-1-.999"
			clipRule="evenodd"
		/>
		<path d="M5.444 20.87a1.009 1.009 0 0 1-1.333-.424 1 1 0 0 1-.093-.683 1 1 0 0 1 .147-.332l1.388-2.097a6.88 6.88 0 0 0 3.874 1.545zM9.427 5.1a6.88 6.88 0 0 0-3.874 1.544L4.165 4.546a.998.998 0 0 1 1.279-1.439zm12.001 6q.15.079.268.201a1.01 1.01 0 0 1 .205 1.058 1 1 0 0 1-.473.52l-5.69 2.845a6.87 6.87 0 0 0 1.097-3.734 6.87 6.87 0 0 0-1.096-3.734z" />
	</svg>
);
export default SvgSendDelayed;
