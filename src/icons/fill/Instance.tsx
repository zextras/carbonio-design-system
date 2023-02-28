import * as React from 'react';
import { SVGProps } from 'react';

const SvgInstance = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M14.988 3.996v-.999c0-.548.451-.999 1-.999.547 0 .998.451.998 1v.998h1a3.011 3.011 0 0 1 2.996 2.997v11.989a3.011 3.011 0 0 1-2.997 2.997H5.997A3.011 3.011 0 0 1 3 18.982V6.992a3.011 3.011 0 0 1 2.997-2.997h1v-.999A1.004 1.004 0 0 1 8.046 2a.985.985 0 0 1 .645.285c.19.186.302.446.302.713v1h5.994Z" />
	</svg>
);
export default SvgInstance;
