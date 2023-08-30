import * as React from 'react';
import type { SVGProps } from 'react';

const SvgNewMailOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M18.992 3.999h-14c-1.646 0-3 1.354-3 3v10c0 1.646 1.354 3 3 3h14c1.646 0 3-1.354 3-3V7c0-1.646-1.354-3-3-3Zm-.67 2-6.33 4.75-6.33-4.75h12.66Zm.67 12h-14c-.548 0-1-.451-1-1V7.25l7.4 5.55a1 1 0 0 0 1.2 0l7.4-5.55V17c0 .549-.451 1-1 1Z" />
		<path
			fillRule="evenodd"
			d="M18.289 13.297h-1v-1c0-.549-.451-1-1-1-.549 0-1 .451-1 1v1h-1c-.548 0-1 .451-1 1 0 .548.452 1 1 1h1v1c0 .549.452 1 1 1 .549 0 1-.451 1-1v-1h1c.549 0 1-.452 1-1 0-.549-.451-1-1-1Z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgNewMailOutline;
