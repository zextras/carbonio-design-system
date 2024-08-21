import * as React from 'react';
import type { SVGProps } from 'react';

const SvgCalendarWarning = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
		<path
			fillRule="evenodd"
			d="M21 19c0 1.647-1.354 3-3 3H6c-1.646 0-3-1.353-3-3V7c0-1.645 1.354-3 3-3h1v-.999c0-.549.451-1 1-1s1 .451 1 1v1h6V3c0-.549.451-1 1-1s1 .451 1 1v1h1c1.646 0 3 1.354 3 3zm-9-3a1 1 0 1 1 0 2.002A1 1 0 0 1 12 16m0-7c-.549 0-1 .452-1 1v4c0 .55.451 1 1 1s1-.45 1-1v-4c0-.548-.451-1-1-1"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgCalendarWarning;
