import * as React from 'react';
import { SVGProps } from 'react';

const SvgAzListOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M16.289 17.71a1 1 0 0 0 .32.21 1 1 0 0 0 .39.08h.1a.817.817 0 0 0 .46-.17 1 1 0 0 0 .13-.09l3-2.86a1.001 1.001 0 0 0-1.38-1.45l-1.31 1.23V7c0-.549-.451-1-1-1-.549 0-1 .451-1 1v7.59l-1.29-1.3a1 1 0 0 0-1.42 0 1 1 0 0 0 0 1.42l3 3Z" />
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M10.977 12a1 1 0 0 0-1-1h-5.98a1 1 0 0 0 0 2h5.98a1 1 0 0 0 1-1ZM10.977 17a1 1 0 0 0-1-1h-5.98a1 1 0 0 0 0 2h5.98a1 1 0 0 0 1-1ZM10.977 7a1 1 0 0 0-1-1h-5.98a1 1 0 0 0 0 2h5.98a1 1 0 0 0 1-1Z"
		/>
	</svg>
);
export default SvgAzListOutline;
