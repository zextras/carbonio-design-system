import * as React from 'react';
import type { SVGProps } from 'react';

const SvgMinusSquareOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="minus-square">
				<path d="M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zm1 15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1z" />
				<path d="M15 11H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2z" />
			</g>
		</g>
	</svg>
);
export default SvgMinusSquareOutline;
