import * as React from 'react';
import type { SVGProps } from 'react';

const SvgDistributionList = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M18.992 3c1.646 0 3 1.354 3 3v12c0 1.646-1.354 3-3 3h-12c-1.646 0-3-1.354-3-3v-1h-1c-.548 0-1-.451-1-1s.452-1 1-1h1V9h-1c-.548 0-1-.451-1-1s.452-1 1-1h1V6c0-1.646 1.354-3 3-3zm-8.128 11.498a1 1 0 0 0 0 2h6.006a1 1 0 0 0 0-2zm0-3.498a1 1 0 0 0 0 2h6.006a1 1 0 0 0 0-2zm0-3.498a1 1 0 0 0 0 2h6.006a1 1 0 0 0 0-2z" />
	</svg>
);
export default SvgDistributionList;
