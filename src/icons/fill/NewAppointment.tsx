import * as React from 'react';
import type { SVGProps } from 'react';

const SvgNewAppointment = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M17.982 21.979H5.994a3.011 3.011 0 0 1-2.997-2.997V6.992a3.011 3.011 0 0 1 2.997-2.997h1v-.999A1.004 1.004 0 0 1 8.043 2a.985.985 0 0 1 .645.285c.19.186.302.446.302.713v1h5.994v-1c0-.548.451-.999 1-.999.547 0 .998.451.998 1v.998h1a3.011 3.011 0 0 1 2.997 2.997v11.989a3.011 3.011 0 0 1-2.998 2.997Zm-2.997-9.99h-1.998V9.99c0-.548-.45-.999-.999-.999-.548 0-.999.451-.999 1v1.997H8.991c-.548 0-.999.451-.999 1 0 .547.451.998 1 .998h1.997v1.998c0 .548.451 1 1 1 .547 0 .998-.452.998-1v-1.998h1.998c.549 0 1-.45 1-.999 0-.548-.451-.999-1-.999Z" />
	</svg>
);
export default SvgNewAppointment;
