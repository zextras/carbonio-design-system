import * as React from 'react';
import type { SVGProps } from 'react';

const SvgViewOff = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M21 10v8c0 1.646-1.354 3-3 3H6c-1.646 0-3-1.354-3-3v-8zM3 8V6c0-1.646 1.354-3 3-3h12c1.646 0 3 1.354 3 3v2z" />
	</svg>
);
export default SvgViewOff;
