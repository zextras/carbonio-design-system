import * as React from 'react';
import type { SVGProps } from 'react';

const SvgPin2 = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<g clipPath="url(#a)">
			<path d="M11.89 3.072a7.33 7.33 0 0 0-5.23 2.26c-2.841 2.979-2.797 7.743.098 10.67l4.597 4.607a.93.93 0 0 0 .704.297 1 1 0 0 0 .704-.307l4.517-4.677c2.843-2.977 2.804-7.74-.089-10.67a7.27 7.27 0 0 0-5.3-2.18" />
		</g>
		<defs>
			<clipPath id="a">
				<path d="M0 0h24v24H0z" />
			</clipPath>
		</defs>
	</svg>
);
export default SvgPin2;
