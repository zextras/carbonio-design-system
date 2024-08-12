import * as React from 'react';
import type { SVGProps } from 'react';

const SvgEmailReadOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path
			fillRule="evenodd"
			d="M18.982 21.947H4.995a2.98 2.98 0 0 1-2.153-.92 3 3 0 0 1-.685-1.12 3 3 0 0 1-.159-.957V8.96a2.97 2.97 0 0 1 .439-1.553A3.06 3.06 0 0 1 3.67 6.275l7.66-4.048c.214-.134.427-.213.657-.213.216 0 .39.07.6.187l7.718 4.074a3.01 3.01 0 0 1 1.672 2.685v9.99a3.01 3.01 0 0 1-2.997 2.997m0-1.998c.548 0 .999-.45.999-.999V9.21l-7.393 5.544a1 1 0 0 1-1.2 0L3.997 9.21v9.74c0 .548.451 1 1 1zm-.248-12.222-6.746 4.98-6.792-4.98 6.792-3.653z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgEmailReadOutline;
