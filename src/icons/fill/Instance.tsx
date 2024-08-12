import * as React from 'react';
import type { SVGProps } from 'react';

const SvgInstance = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M14.988 3.996v-.999c0-.548.451-.999 1-.999.547 0 .998.451.998 1v.998h1a3.01 3.01 0 0 1 2.996 2.997v11.989a3.01 3.01 0 0 1-2.997 2.997H5.997A3.01 3.01 0 0 1 3 18.982V6.993a3.01 3.01 0 0 1 2.997-2.997h1v-.999A1.004 1.004 0 0 1 8.046 2a.99.99 0 0 1 .645.285c.19.186.302.446.302.713v1z" />
	</svg>
);
export default SvgInstance;
