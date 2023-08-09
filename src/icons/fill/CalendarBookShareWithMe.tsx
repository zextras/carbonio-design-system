import * as React from 'react';
import { SVGProps } from 'react';

const SvgCalendarBookShareWithMe = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M9 4V3c0-.549-.451-1-1-1-.548 0-1 .451-1 1v1H6C4.354 4 3 5.354 3 7v12c0 1.646 1.354 3 3 3h12c1.646 0 3-1.354 3-3V7c0-1.646-1.354-3-3-3h-1V3a1.006 1.006 0 0 0-.751-.968.994.994 0 0 0-.946.254A1.005 1.005 0 0 0 15 3v1H9Zm-.233 9.785c-.09-.092-.16-.2-.21-.32a1.002 1.002 0 0 1-.08-.39v-.1a.821.821 0 0 1 .17-.46c.027-.046.057-.089.09-.13l2.031-2.17a1 1 0 1 1 1.45 1.38l-.4.48h2.704c.549 0 1 .452 1 1 0 .549-.451 1-1 1h-2.635l.316.306a1.001 1.001 0 0 1 0 1.42 1 1 0 0 1-1.42 0l-2.016-2.016Z"
		/>
	</svg>
);
export default SvgCalendarBookShareWithMe;
