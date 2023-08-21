import * as React from 'react';
import type { SVGProps } from 'react';

const SvgDistributionListOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path
			fillRule="evenodd"
			d="M10.867 7.503a1 1 0 0 0 0 2h6.006a1 1 0 0 0 0-2h-6.006Zm0 6.996a1 1 0 0 0 0 2h6.006a1 1 0 0 0 0-2h-6.006Zm0-3.498a1 1 0 0 0 0 2h6.006a1 1 0 0 0 0-2h-6.006Z"
			clipRule="evenodd"
		/>
		<path d="M18.992 3c1.646 0 3 1.354 3 3v12c0 1.646-1.354 3-3 3h-12c-1.646 0-3-1.354-3-3v-1h-1c-.548 0-1-.451-1-1 0-.549.452-1 1-1h1V9h-1c-.548 0-1-.451-1-1 0-.549.452-1 1-1h1V6c0-1.646 1.354-3 3-3h12Zm0 2h-12c-.548 0-1 .451-1 1v1h1c.549 0 1 .451 1 1 0 .549-.451 1-1 1h-1v6h1c.549 0 1 .451 1 1 0 .549-.451 1-1 1h-1v1c0 .549.452 1 1 1h12c.549 0 1-.451 1-1V6c0-.549-.451-1-1-1Z" />
	</svg>
);
export default SvgDistributionListOutline;
