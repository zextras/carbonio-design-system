import * as React from 'react';
import type { SVGProps } from 'react';

const SvgContactGalOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M9.016 11c2.194 0 4-1.806 4-4s-1.806-4-4-4-4 1.806-4 4 1.805 4 4 4m0-6c1.097 0 2 .903 2 2s-.903 2-2 2c-1.098 0-2-.903-2-2s.902-2 2-2M19.963 14.888c1.9-1.097 2.562-3.563 1.464-5.464-1.097-1.9-3.563-2.561-5.464-1.464-1.9 1.097-2.56 3.564-1.464 5.464s3.564 2.562 5.464 1.464m-3-5.196a2.004 2.004 0 0 1 2.732.732 2.01 2.01 0 0 1-.732 2.732c-.95.549-.451-.782-1-1.732s-1.95-1.183-1-1.732M9.016 12.999c-3.84 0-7 3.16-7 7 0 .549.451 1 1 1s1-.451 1-1c0-2.743 2.257-5 5-5s5 2.257 5 5c0 .549.451 1 1 1s1-.451 1-1c0-3.84-3.16-7-7-7" />
	</svg>
);
export default SvgContactGalOutline;
