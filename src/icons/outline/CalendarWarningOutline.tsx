import * as React from 'react';
import type { SVGProps } from 'react';

const SvgCalendarWarningOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
		<path d="M21 19c0 1.646-1.354 3-3 3H6c-1.646 0-3-1.354-3-3V7c0-1.646 1.354-3 3-3h1V3c0-.549.451-1 1-1 .549 0 1 .451 1 1v1h6V3c0-.549.451-1 1-1 .549 0 1 .451 1 1v1h1c1.646 0 3 1.354 3 3v12Zm-2 0V7c0-.549-.451-1-1-1h-1v1c0 .549-.451 1-1 1-.549 0-1-.451-1-1V6H9v1c0 .549-.451 1-1 1-.549 0-1-.451-1-1V6H6c-.549 0-1 .451-1 1v12c0 .549.451 1 1 1h12c.549 0 1-.451 1-1Zm-7-3a1 1 0 1 1-.001 2A1 1 0 0 1 12 16Zm0-7c-.549 0-1 .451-1 1v4c0 .548.451 1 1 1 .549 0 1-.452 1-1v-4c0-.549-.451-1-1-1Z" />
	</svg>
);
export default SvgCalendarWarningOutline;
