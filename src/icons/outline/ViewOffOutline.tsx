import * as React from 'react';
import { SVGProps } from 'react';

const SvgViewOffOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M18 3H6C4.354 3 3 4.354 3 6v12c0 1.646 1.354 3 3 3h12c1.646 0 3-1.354 3-3V6c0-1.646-1.354-3-3-3ZM6 19c-.549 0-1-.451-1-1v-8h14v8c0 .549-.451 1-1 1H6ZM6 5h12c.549 0 1 .451 1 1v2H5V6c0-.549.451-1 1-1Z" />
	</svg>
);

export default SvgViewOffOutline;