import * as React from 'react';
import type { SVGProps } from 'react';

const SvgStartMeeting = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
		<g clipPath="url(#a)">
			<path
				fillRule="evenodd"
				d="M20.03 7.022a1.7 1.7 0 0 1 .97.128 1.6 1.6 0 0 1 1.01 1.48v6.74a1.6 1.6 0 0 1-1 1.48c-.217.098-.452.15-.69.15a1.74 1.74 0 0 1-1.16-.45l-2.16-2V16a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v1.45l2.15-2a1.7 1.7 0 0 1 .88-.428m-7.145 1.72a.56.56 0 0 1 .165.398v4.47a.562.562 0 1 1-1.124 0v-3.137l-4.661 4.66a.562.562 0 0 1-.922-.182.56.56 0 0 1 .123-.616l4.65-4.66H7.99a.562.562 0 0 1 0-1.125l4.498.028c.149 0 .292.06.397.165"
				clipRule="evenodd"
			/>
		</g>
		<defs>
			<clipPath id="a">
				<path fill="#fff" d="M0 0h24v24H0z" />
			</clipPath>
		</defs>
	</svg>
);
export default SvgStartMeeting;
