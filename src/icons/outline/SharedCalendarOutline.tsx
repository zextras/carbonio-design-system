import * as React from 'react';
import type { SVGProps } from 'react';

const SvgSharedCalendarOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M21 19c0 1.646-1.354 3-3 3H6c-1.646 0-3-1.354-3-3V7c0-1.646 1.354-3 3-3h1V3c0-.549.451-1 1-1s1 .451 1 1v1h6V3c0-.549.451-1 1-1s1 .451 1 1v1h1c1.646 0 3 1.354 3 3zm-2 0V7c0-.549-.451-1-1-1h-1v1c0 .549-.451 1-1 1s-1-.451-1-1V6H9v1c0 .549-.451 1-1 1s-1-.451-1-1V6H6c-.549 0-1 .451-1 1v12c0 .549.451 1 1 1h12c.549 0 1-.451 1-1" />
		<path
			fillRule="evenodd"
			d="M11.931 10.853a1.97 1.97 0 1 1 1.298 1.485l-1.16 1.015a2 2 0 0 1 0 .76l1.162 1.017q.299-.103.632-.104a1.97 1.97 0 0 1 0 3.937 1.97 1.97 0 0 1-1.932-2.349l-1.162-1.017a1.97 1.97 0 1 1 .001-3.73z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgSharedCalendarOutline;
