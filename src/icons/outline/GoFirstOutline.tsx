import * as React from 'react';
import { SVGProps } from 'react';

const SvgGoFirstOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M15.865 17a1 1 0 0 1-.72-.31l-3.86-4a1.005 1.005 0 0 1 0-1.4l4-4a1.004 1.004 0 0 1 1.42 1.42l-3.3 3.29 3.18 3.3a1.005 1.005 0 0 1 0 1.41 1 1 0 0 1-.72.29Z" />
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M8.001 6.996a1 1 0 0 0-1 1v8.005a1 1 0 0 0 2 0V7.995a1 1 0 0 0-1-1Z"
		/>
	</svg>
);
export default SvgGoFirstOutline;
