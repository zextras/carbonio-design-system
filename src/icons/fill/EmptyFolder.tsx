import * as React from 'react';
import { SVGProps } from 'react';

const SvgEmptyFolder = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M19.481 7.043a2.48 2.48 0 0 1 2.497 2.428v8.581a2.48 2.48 0 0 1-2.497 2.428H4.496a2.48 2.48 0 0 1-2.498-2.428V5.924a2.48 2.48 0 0 1 2.498-2.427H9.09a1 1 0 0 1 .77.37l2.627 3.176h6.993Zm-6.786 4.824-.707.706-.706-.706a1.004 1.004 0 0 0-1.413 0 1.004 1.004 0 0 0 0 1.413l.706.706-.706.707a1.004 1.004 0 0 0 0 1.412 1.004 1.004 0 0 0 1.413 0l.706-.706.707.707a1.004 1.004 0 0 0 1.412 0 1.004 1.004 0 0 0 0-1.413l-.706-.707.707-.706a1.004 1.004 0 0 0 0-1.413 1.004 1.004 0 0 0-1.413 0Z" />
	</svg>
);
export default SvgEmptyFolder;
