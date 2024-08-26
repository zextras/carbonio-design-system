import * as React from 'react';
import type { SVGProps } from 'react';

const SvgSendDelayedOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path
			fillRule="evenodd"
			d="M15.86 11.988c0-3.254-2.678-5.931-5.932-5.931s-5.932 2.677-5.932 5.931 2.678 5.932 5.932 5.932 5.932-2.678 5.932-5.932m-1.952 0c0 2.184-1.797 3.98-3.98 3.98-2.184 0-3.98-1.796-3.98-3.98 0-2.183 1.796-3.98 3.98-3.98 2.183 0 3.98 1.797 3.98 3.98"
			clipRule="evenodd"
		/>
		<path d="M11.528 11.042h-.61V9.984c0-.548-.45-.999-.998-.999s-1 .45-1 .999v2.057c0 .548.452 1 1 1h1.608c.548 0 .999-.452.999-1s-.451-.999-1-.999M5.444 20.87a1.009 1.009 0 0 1-1.333-.424 1 1 0 0 1-.093-.683 1 1 0 0 1 .147-.331l1.388-2.097a6.88 6.88 0 0 0 3.874 1.544zM9.427 5.1a6.88 6.88 0 0 0-3.874 1.544L4.165 4.546a.999.999 0 0 1 1.279-1.439zm12.001 6q.15.08.268.201a1.01 1.01 0 0 1 .205 1.058 1 1 0 0 1-.473.52l-5.69 2.845a6.87 6.87 0 0 0 1.097-3.734 6.87 6.87 0 0 0-1.096-3.734z" />
	</svg>
);
export default SvgSendDelayedOutline;
