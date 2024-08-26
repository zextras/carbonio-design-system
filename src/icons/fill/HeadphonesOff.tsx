import * as React from 'react';
import type { SVGProps } from 'react';

const SvgHeadphonesOff = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
		<g clipPath="url(#a)">
			<path
				fillRule="evenodd"
				d="M3.836 6.359A10.2 10.2 0 0 0 2 12.37V17a4 4 0 1 0 4-4 3.9 3.9 0 0 0-2 .56v-1.19A8.2 8.2 0 0 1 5.277 7.8zM7.8 5.277 6.36 3.836A10.2 10.2 0 0 1 12 2a10.2 10.2 0 0 1 10 10.37V17a4 4 0 0 1-.515 1.963l-5.448-5.448A4 4 0 0 1 18 13a3.9 3.9 0 0 1 2 .56v-1.19A8.2 8.2 0 0 0 12 4a8.2 8.2 0 0 0-4.2 1.277m6.226 11.272a4 4 0 0 0 4.426 4.426z"
				clipRule="evenodd"
			/>
			<path d="M4.712 3.294a1.003 1.003 0 0 0-1.418 1.418l15.984 15.985a1 1 0 0 0 1.419 0 1 1 0 0 0 0-1.419z" />
		</g>
		<defs>
			<clipPath id="a">
				<path fill="#fff" d="M0 0h24v24H0z" />
			</clipPath>
		</defs>
	</svg>
);
export default SvgHeadphonesOff;
