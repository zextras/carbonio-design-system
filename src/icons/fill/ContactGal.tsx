import * as React from 'react';
import type { SVGProps } from 'react';

const SvgContactGal = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M9.016 11c2.194 0 4-1.806 4-4s-1.806-4-4-4c-2.195 0-4 1.806-4 4s1.805 4 4 4ZM19.963 14.888c1.9-1.097 2.562-3.563 1.464-5.464-1.097-1.9-3.563-2.561-5.464-1.464-1.9 1.097-2.56 3.564-1.464 5.464 1.097 1.9 3.564 2.562 5.464 1.464Zm-3-5.196a2.004 2.004 0 0 1 2.732.732 2.01 2.01 0 0 1-.732 2.732c-.95.549-.451-.782-1-1.732-.548-.95-1.95-1.183-1-1.732ZM9.016 12.999c-3.84 0-7 3.16-7 7 0 .549.451 1 1 1h12c.548 0 1-.451 1-1 0-3.84-3.16-7-7-7Z" />
	</svg>
);
export default SvgContactGal;
