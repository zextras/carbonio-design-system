import * as React from 'react';
import type { SVGProps } from 'react';

const SvgRugby = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path
			fillRule="evenodd"
			d="m3.179 14.052 6.746 6.746q-1.074.181-2.198.182c-1.426 0-3.548 0-4.087-.644-.643-.768-.643-2.66-.643-4.086q.001-1.126.182-2.198m8.65-10.298 8.394 8.394a13.3 13.3 0 0 1-8.087 8.08L3.749 11.84a13.3 13.3 0 0 1 8.08-8.087m1.552 5.448.67-.669a.986.986 0 0 1 1.393 1.393l-.67.67.512.511a.986.986 0 0 1-1.393 1.394l-.512-.512-1.364 1.364.512.512a.986.986 0 0 1-1.394 1.394l-.512-.512-.697.697a.986.986 0 0 1-1.393-1.394l.697-.697-.512-.512a.986.986 0 0 1 1.393-1.393l.512.512 1.365-1.364-.512-.512a.986.986 0 0 1 1.393-1.394zm.656-6.02q1.082-.184 2.213-.185c1.425 0 3.504.098 4.086.643.65.608.644 2.661.644 4.087q-.002 1.13-.185 2.212z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgRugby;