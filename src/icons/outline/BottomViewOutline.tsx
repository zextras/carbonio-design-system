import * as React from 'react';
import type { SVGProps } from 'react';

const SvgBottomViewOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M18 3H6C4.354 3 3 4.354 3 6v12c0 1.646 1.354 3 3 3h12c1.646 0 3-1.354 3-3V6c0-1.646-1.354-3-3-3Zm1 12.5V18c0 .549-.451 1-1 1H6c-.549 0-1-.451-1-1v-2.5h14Zm0-2H5V10h14v3.5ZM6 5h12c.549 0 1 .451 1 1v2H5V6c0-.549.451-1 1-1Z" />
	</svg>
);
export default SvgBottomViewOutline;
