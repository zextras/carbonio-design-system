import * as React from 'react';
import type { SVGProps } from 'react';

const SvgEmailRead = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path
			fillRule="evenodd"
			d="m2.215 7.848 3.25 2.463 5.924 4.443a1 1 0 0 0 1.199 0l6.065-4.548 3.113-2.35c.137.342.213.715.213 1.104v9.99a3.01 3.01 0 0 1-2.997 2.997H4.995a2.98 2.98 0 0 1-2.153-.92 3 3 0 0 1-.685-1.12 3 3 0 0 1-.159-.957V8.96a3 3 0 0 1 .217-1.112m1.251-1.46q.1-.06.205-.113l7.66-4.048c.214-.134.427-.213.657-.213.216 0 .39.07.6.187l7.718 4.074q.098.049.191.105L17.251 8.82l-5.263 3.885-4.994-3.661z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgEmailRead;
