import * as React from 'react';
import type { SVGProps } from 'react';

const SvgMinusSquare = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3m-3 10H9a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2"
				data-name="minus-square"
			/>
		</g>
	</svg>
);
export default SvgMinusSquare;
