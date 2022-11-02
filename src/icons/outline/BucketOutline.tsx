import * as React from 'react';
import { SVGProps } from 'react';

const SvgBucketOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M3 2h18c.549 0 1 .451 1 1 0 .549-.451 1-1 1h-1l-.563 9.002 1.257 1.256a1 1 0 0 1-1.415 1.415l-.008-.008L19.062 19c0 1.646-1.354 3-3 3H7.938c-1.645 0-3-1.354-3-3L4 4H3c-.549 0-1-.451-1-1 0-.549.451-1 1-1Zm14.555 9.12-4.848-4.848a1 1 0 0 0-1.414 1.415l6.096 6.096L17.063 19c0 .549-.452 1-1 1H7.937c-.548 0-1-.451-1-1L6 4h12l-.445 7.12Z"
		/>
	</svg>
);

export default SvgBucketOutline;
