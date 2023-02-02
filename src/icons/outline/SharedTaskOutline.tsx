import * as React from 'react';
import { SVGProps } from 'react';

const SvgSharedTaskOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M18 21H6c-1.646 0-3-1.354-3-3V6c0-1.646 1.354-3 3-3h12c1.646 0 3 1.354 3 3v12c0 1.646-1.354 3-3 3ZM6 5c-.549 0-1 .451-1 1v12c0 .549.451 1 1 1h12c.549 0 1-.451 1-1V6c0-.549-.451-1-1-1H6Zm5.931 4.119a1.97 1.97 0 1 1 3.901-.38 1.97 1.97 0 0 1-2.603 1.865l-1.16 1.014a1.974 1.974 0 0 1 0 .76l1.162 1.018a1.97 1.97 0 1 1 .633 3.833 1.97 1.97 0 0 1-1.933-2.35l-1.162-1.017a1.97 1.97 0 1 1 .001-3.729l1.161-1.014Z" />
	</svg>
);
export default SvgSharedTaskOutline;
