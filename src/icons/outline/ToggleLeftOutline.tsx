import * as React from 'react';
import type { SVGProps } from 'react';

const SvgToggleLeftOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="toggle-left">
				<path d="M15 5H9a7 7 0 0 0 0 14h6a7 7 0 0 0 0-14m0 12H9A5 5 0 0 1 9 7h6a5 5 0 0 1 0 10" />
				<path d="M9 9a3 3 0 1 0 3 3 3 3 0 0 0-3-3m0 4a1 1 0 1 1 1-1 1 1 0 0 1-1 1" />
			</g>
		</g>
	</svg>
);
export default SvgToggleLeftOutline;
