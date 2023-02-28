import * as React from 'react';
import { SVGProps } from 'react';

const SvgSquare2 = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M18 21H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3Z" />
	</svg>
);
export default SvgSquare2;
