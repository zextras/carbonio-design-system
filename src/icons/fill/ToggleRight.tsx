import * as React from 'react';
import type { SVGProps } from 'react';

const SvgToggleRight = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="toggle-right">
				<circle cx={15} cy={12} r={1} />
				<path d="M15 5H9a7 7 0 0 0 0 14h6a7 7 0 0 0 0-14zm0 10a3 3 0 1 1 3-3 3 3 0 0 1-3 3z" />
			</g>
		</g>
	</svg>
);
export default SvgToggleRight;
