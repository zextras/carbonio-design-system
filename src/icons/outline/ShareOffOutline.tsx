import * as React from 'react';
import type { SVGProps } from 'react';

const SvgShareOffOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
		<g clipPath="url(#a)">
			<path d="M17.998 20.998a3 3 0 0 1-2.493-1.33 3 3 0 0 1-.497-1.446L15 18zM18.222 15.008a3 3 0 0 1 2.776 2.99L18 15z" />
			<path
				fillRule="evenodd"
				d="M3.837 9.234a3 3 0 0 1 2.46.064l2.166 2.165L8 11.67v.67l2.416 1.076 3.986 3.986L7.1 14.14a3.002 3.002 0 0 1-4.601-.479 3 3 0 0 1 1.338-4.427m.968 1.785a1.003 1.003 0 0 0-.73 1.364 1 1 0 1 0 .73-1.364M17.405 3.057A3 3 0 1 1 15.9 8.14l-3.29 1.47-1.525-1.526L15 6.34V6a3 3 0 0 1 2.405-2.943M18 5a1 1 0 0 0-1 1 1 1 0 1 0 1-1"
				clipRule="evenodd"
			/>
			<path d="M4.71 3.29a1.004 1.004 0 1 0-1.42 1.42l16 16a1 1 0 0 0 1.095.219 1 1 0 0 0 .325-.22 1 1 0 0 0 0-1.42z" />
		</g>
		<defs>
			<clipPath id="a">
				<path fill="#fff" d="M0 0h24v24H0z" />
			</clipPath>
		</defs>
	</svg>
);
export default SvgShareOffOutline;
