import * as React from 'react';
import type { SVGProps } from 'react';

const SvgWeekView = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M14.985 3.996v-.999c0-.548.451-.999 1-.999.547 0 .998.451.998 1v.998h1a3.011 3.011 0 0 1 2.997 2.997v11.989a3.011 3.011 0 0 1-2.998 2.997H5.994a3.011 3.011 0 0 1-2.997-2.997V6.992a3.011 3.011 0 0 1 2.997-2.997h1v-.999A1.004 1.004 0 0 1 8.043 2a.985.985 0 0 1 .645.285c.19.186.302.446.302.713v1h5.994Zm1.497 6.987a1 1 0 0 0-1.998 0v6a1 1 0 0 0 1.998 0v-6Zm-6.99 0a1 1 0 0 0-1.997 0v6a1 1 0 0 0 1.998 0v-6Zm3.495 0a1 1 0 0 0-1.998 0v6a1 1 0 0 0 1.998 0v-6Z" />
	</svg>
);
export default SvgWeekView;
