import * as React from 'react';
import { SVGProps } from 'react';

const SvgWorkweekViewOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M15 4v-.999c0-.549.451-1 1-1 .549 0 1 .451 1 1v1h1c1.646 0 3 1.354 3 3v12c0 1.646-1.354 3-3 3H6c-1.646 0-3-1.354-3-3v-12c0-1.646 1.354-3 3-3h1V3a1.006 1.006 0 0 1 .751-.968.991.991 0 0 1 .946.254C8.888 2.474 9 2.733 9 3v1h6Zm3 16.001c.549 0 1-.452 1-1v-12c0-.549-.451-1-1-1h-1v1c0 .549-.451 1-1 1-.549 0-1-.451-1-1V6H9v1c0 .549-.451 1-1 1-.549 0-1-.451-1-1V6H6c-.549 0-1 .451-1 1v12a1.006 1.006 0 0 0 .68.947c.104.035.211.052.32.053h12Z" />
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M15.57 10.993a1 1 0 0 0-2 0V17a1 1 0 0 0 2 0v-6.006ZM10.438 10.993a1 1 0 0 0-2 0V17a1 1 0 0 0 2 0v-6.006Z"
		/>
	</svg>
);

export default SvgWorkweekViewOutline;
