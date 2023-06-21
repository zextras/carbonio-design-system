import * as React from 'react';
import { SVGProps } from 'react';

const SvgMegaphone = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<g clipPath="url(#a)">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="m10.878 18.773-2.831 1.636a1.008 1.008 0 0 1-1.366-.366l-.35-.604h-.003a.985.985 0 0 1-1.347-.361.982.982 0 0 1-1.307-.352l-.75-1.219a.985.985 0 0 1 .323-1.354c.01-.005.02-.014.031-.02l-.032-.055a.985.985 0 0 1 .36-1.346l.007-.004-.362-.628a1.004 1.004 0 0 1 .366-1.365l4.33-2.498 3.351-7.017c.086-.192.231-.356.415-.464a1.005 1.005 0 0 1 1.377.389l8 13.856c.274.473.11 1.092-.366 1.364-.176.103-.377.15-.579.14l-7.475-.576 1.179 2.02a.988.988 0 0 1-.354 1.35.991.991 0 0 1-1.349-.356l-1.268-2.17Z"
			/>
		</g>
		<defs>
			<clipPath id="a">
				<path fill="#fff" d="M0 0h24v24H0z" />
			</clipPath>
		</defs>
	</svg>
);
export default SvgMegaphone;
