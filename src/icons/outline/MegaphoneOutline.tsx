import * as React from 'react';
import type { SVGProps } from 'react';

const SvgMegaphoneOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
		<g clipPath="url(#a)">
			<path
				fillRule="evenodd"
				d="M10.878 18.774 8.047 20.41a1.01 1.01 0 0 1-1.366-.366l-.35-.605h-.003a.985.985 0 0 1-1.347-.36.98.98 0 0 1-1.307-.352l-.75-1.219a.985.985 0 0 1 .323-1.354q.015-.01.031-.02l-.032-.055a.985.985 0 0 1 .36-1.346l.007-.004-.362-.628a1.003 1.003 0 0 1 .366-1.365l4.33-2.498 3.351-7.017c.086-.192.231-.356.415-.464a1.005 1.005 0 0 1 1.377.389l8 13.856c.274.473.11 1.092-.366 1.364-.176.103-.377.15-.579.14l-7.475-.576 1.179 2.02a.99.99 0 0 1-.354 1.35.99.99 0 0 1-1.349-.356zm-.042-2.283.827-.478c.174-.103.376-.15.578-.14l6.167.482-6.1-10.565-2.667 5.582a1 1 0 0 1-.408.432l-3.75 2.165 2.43 4.21 2.706-1.566c.031-.023.065-.042.1-.066a.6.6 0 0 1 .117-.056"
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
export default SvgMegaphoneOutline;
