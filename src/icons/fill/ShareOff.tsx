import * as React from 'react';
import type { SVGProps } from 'react';

const SvgShareOff = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
		<g clipPath="url(#a)">
			<path d="M17.998 20.998a2.997 2.997 0 0 1-2.99-2.776L15 18zm.224-5.99a3 3 0 0 1 2.776 2.99L18 15zM3.837 9.233a3 3 0 0 1 2.46.065l2.166 2.165L8 11.67v.67l2.416 1.076 3.986 3.986L7.1 14.14a3.002 3.002 0 0 1-4.601-.479 3 3 0 0 1 1.338-4.428m13.568-6.176A3 3 0 1 1 15.9 8.14l-3.29 1.47-1.525-1.526L15 6.34V6a3 3 0 0 1 2.405-2.943M4.71 3.29a1.004 1.004 0 1 0-1.42 1.42l16 16a1 1 0 0 0 1.095.219 1 1 0 0 0 .325-.22 1 1 0 0 0 0-1.42z" />
		</g>
		<defs>
			<clipPath id="a">
				<path fill="#fff" d="M0 0h24v24H0z" />
			</clipPath>
		</defs>
	</svg>
);
export default SvgShareOff;
