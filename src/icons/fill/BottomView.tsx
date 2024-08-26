import * as React from 'react';
import type { SVGProps } from 'react';

const SvgBottomView = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M21 15.504V18c0 1.646-1.354 3-3 3H6c-1.646 0-3-1.354-3-3v-2.496zm0-2H3V10h18zM3 8V6c0-1.646 1.354-3 3-3h12c1.646 0 3 1.354 3 3v2z" />
	</svg>
);
export default SvgBottomView;
