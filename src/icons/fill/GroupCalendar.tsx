import * as React from 'react';
import type { SVGProps } from 'react';

const SvgGroupCalendar = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
		<path d="M19.828 21A2.996 2.996 0 0 1 17 23H5a3 3 0 0 1-2.121-.879A3 3 0 0 1 2 20V9a3 3 0 0 1 2-2.828V20a.997.997 0 0 0 1 1z" />
		<path d="M22.982 9.976H5v7.029a3.01 3.01 0 0 0 2.997 2.997h11.988a3.01 3.01 0 0 0 2.997-2.997zm-12.987 6.01c-.548 0-.999-.452-.999-1s.451-.999 1-.999c.547 0 .998.451.998 1 0 .547-.45.998-.999.998m7.992 0h-3.996c-.548 0-.999-.452-.999-1s.451-.999 1-.999h3.995c.548 0 1 .451 1 1 0 .547-.452.998-1 .998M16.988 2.998V2c0-.548.451-.999 1-.999.547 0 .998.45.998.999v1h1a3.01 3.01 0 0 1 2.996 2.996v1.983H5V5.995a3.01 3.01 0 0 1 2.997-2.997h1V2a1 1 0 0 1 .503-.866 1 1 0 0 1 .54-.132 1 1 0 0 1 .652.284 1 1 0 0 1 .302.714v1z" />
	</svg>
);
export default SvgGroupCalendar;
