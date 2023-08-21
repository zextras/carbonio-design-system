import * as React from 'react';
import type { SVGProps } from 'react';

const SvgAppointmentSeriesOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M10.99 3.996v-.999c0-.548.45-.999.998-.999s1 .451 1 1v.998h.998a3.011 3.011 0 0 1 2.997 2.997v8.055a3.011 3.011 0 0 1-2.997 2.997H5.932a3.011 3.011 0 0 1-2.997-2.997V6.993a3.011 3.011 0 0 1 2.997-2.997h.999v-.999A1.004 1.004 0 0 1 7.98 2a.985.985 0 0 1 .645.285c.191.186.303.446.303.713v1h2.06Zm2.996 12.05c.548 0 1-.45 1-.998V6.993c0-.548-.452-.999-1-.999h-.999v1c0 .547-.45.998-.999.998-.548 0-.999-.45-.999-.999v-.999H8.93v1c0 .547-.451.998-1 .998-.547 0-.998-.45-.998-.999v-.999h-1c-.547 0-.998.451-.998 1v8.054c0 .112.019.224.056.33a1.006 1.006 0 0 0 .942.669h8.055Z" />
		<path d="M18.97 7.992a3.015 3.015 0 0 1 2.014 2.83l-.005 8.16a3.011 3.011 0 0 1-2.997 2.997H9.817a3.015 3.015 0 0 1-2.824-1.998h10.99c.547 0 .998-.451.998-1L18.97 7.992Z" />
	</svg>
);
export default SvgAppointmentSeriesOutline;
