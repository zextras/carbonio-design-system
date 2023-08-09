import * as React from 'react';
import type { SVGProps } from 'react';

const SvgTagAdd = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path
			fillRule="evenodd"
			d="M20.206 17.209h-1v-1c0-.549-.452-1-1-1-.549 0-1 .451-1 1v1h-1c-.549 0-1 .451-1 1 0 .548.451 1 1 1h1v1c0 .548.451 1 1 1 .548 0 1-.452 1-1v-1h1c.548 0 1-.452 1-1 0-.549-.452-1-1-1ZM14.203 2.792c-.072 0-.143.006-.211.018-.43.01-.855.18-1.182.507L3.296 12.83a1.734 1.734 0 0 0 0 2.451l4.576 4.576a1.734 1.734 0 0 0 2.451 0l9.514-9.514c.327-.327.496-.753.507-1.182.012-.069.018-.14.018-.211V4.048c0-.693-.563-1.256-1.256-1.256h-4.903ZM16.06 6.11a.985.985 0 1 0 .001 1.97.985.985 0 0 0 0-1.97Z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgTagAdd;
