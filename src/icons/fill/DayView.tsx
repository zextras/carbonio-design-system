import * as React from 'react';
import { SVGProps } from 'react';

const SvgDayView = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M14.561 21.979H5.994a3.011 3.011 0 0 1-2.997-2.997V6.992a3.011 3.011 0 0 1 2.997-2.997h1v-.999A1.004 1.004 0 0 1 8.043 2a.985.985 0 0 1 .645.285c.19.186.302.446.302.713v1h5.994v-1c0-.548.451-.999 1-.999.547 0 .998.451.998 1v.998h1a3.011 3.011 0 0 1 2.997 2.997l.015 7.992a.998.998 0 0 1-.26.67l-5.434 5.994a1 1 0 0 1-.74.33Zm.44-2.997 2.737-2.998H15.74a.792.792 0 0 0-.739.85v2.148Z" />
	</svg>
);
export default SvgDayView;
