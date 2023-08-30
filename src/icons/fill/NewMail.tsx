import * as React from 'react';
import type { SVGProps } from 'react';

const SvgNewMail = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path
			fillRule="evenodd"
			d="M18.992 3.999h-14c-1.646 0-3 1.354-3 3v10c0 1.646 1.354 3 3 3h14c1.646 0 3-1.354 3-3V7c0-1.646-1.354-3-3-3Zm-.703 9.297h-1v-1c0-.549-.451-1-1-1-.549 0-1 .451-1 1v1h-1c-.548 0-1 .451-1 1 0 .549.452 1 1 1h1v1c0 .549.452 1 1 1 .549 0 1-.451 1-1v-1h1c.549 0 1-.451 1-1 0-.549-.451-1-1-1Zm.703-7.297-6.5 4.47c-.309.178-.69.178-1 0l-6.5-4.47h14Z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgNewMail;
