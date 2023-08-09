import * as React from 'react';
import type { SVGProps } from 'react';

const SvgGoLastOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M8.135 6.996a1 1 0 0 1 .72.31l3.86 4a1.005 1.005 0 0 1 0 1.4l-4 4a1.004 1.004 0 0 1-1.42-1.42l3.3-3.29-3.18-3.3a1.005 1.005 0 0 1 0-1.41 1 1 0 0 1 .72-.29Z" />
		<path
			fillRule="evenodd"
			d="M16 17a1 1 0 0 0 .999-1V7.996a1 1 0 0 0-2 0V16a1 1 0 0 0 1 1Z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgGoLastOutline;
