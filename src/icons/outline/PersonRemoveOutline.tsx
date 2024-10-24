import * as React from 'react';
import type { SVGProps } from 'react';

const SvgPersonRemoveOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="person-remove">
				<path d="M21 6h-4a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2M10 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4m0-6a2 2 0 1 1-2 2 2 2 0 0 1 2-2M10 13a7 7 0 0 0-7 7 1 1 0 0 0 2 0 5 5 0 0 1 10 0 1 1 0 0 0 2 0 7 7 0 0 0-7-7" />
			</g>
		</g>
	</svg>
);
export default SvgPersonRemoveOutline;
