import * as React from 'react';
import type { SVGProps } from 'react';

const SvgCalendarBookShareWithMe = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
		<path
			fillRule="evenodd"
			d="M9 4V3c0-.549-.451-1-1-1s-1 .451-1 1v1H6C4.354 4 3 5.354 3 7v12c0 1.646 1.354 3 3 3h12c1.646 0 3-1.354 3-3V7c0-1.646-1.354-3-3-3h-1V3a1.006 1.006 0 0 0-.751-.968 1 1 0 0 0-.946.254A1 1 0 0 0 15 3v1zm-.233 9.785q-.135-.139-.21-.32a1 1 0 0 1-.08-.39v-.1a.82.82 0 0 1 .17-.46q.04-.069.09-.13l2.031-2.17a1 1 0 1 1 1.45 1.38l-.4.48h2.704c.549 0 1 .452 1 1 0 .549-.451 1-1 1h-2.635l.316.306a1 1 0 0 1 0 1.42 1 1 0 0 1-1.42 0z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgCalendarBookShareWithMe;
