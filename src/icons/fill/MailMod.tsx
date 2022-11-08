import * as React from 'react';
import { SVGProps } from 'react';

const SvgMailMod = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M4.277 4A2.278 2.278 0 0 0 2 6.28v11.483c0 1.258 1.02 2.279 2.277 2.279h15.446A2.278 2.278 0 0 0 22 17.762V6.28C22 5.02 20.98 4 19.723 4H4.277Zm9.754 8.02a2.032 2.032 0 0 1-4.062 0 2.032 2.032 0 0 1 4.062 0Zm3.75-2.707a1.72 1.72 0 1 1-3.439-.002 1.72 1.72 0 0 1 3.44.002Zm-8.125.104a1.407 1.407 0 1 1-2.814-.002 1.407 1.407 0 0 1 2.814.002Z"
		/>
	</svg>
);

export default SvgMailMod;
