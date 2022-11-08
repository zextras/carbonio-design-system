import * as React from 'react';
import { SVGProps } from 'react';

const SvgPin2 = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<g clipPath="url(#a)">
			<path d="M11.89 3.072a7.334 7.334 0 0 0-5.23 2.26c-2.841 2.979-2.797 7.743.098 10.67l4.597 4.607a.934.934 0 0 0 .704.297.991.991 0 0 0 .704-.307l4.517-4.677c2.843-2.977 2.804-7.74-.089-10.67a7.265 7.265 0 0 0-5.3-2.18Z" />
		</g>
		<defs>
			<clipPath id="a">
				<path d="M0 0h24v24H0z" />
			</clipPath>
		</defs>
	</svg>
);

export default SvgPin2;
