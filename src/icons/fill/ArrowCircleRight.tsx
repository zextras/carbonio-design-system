import * as React from 'react';
import type { SVGProps } from 'react';

const SvgArrowCircleRight = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M2 12A10 10 0 1 0 12 2 10 10 0 0 0 2 12m11.86-3.69 2.86 3a.5.5 0 0 1 .1.15.5.5 0 0 1 .1.16.94.94 0 0 1 0 .76 1 1 0 0 1-.21.33l-3 3a1 1 0 0 1-1.42-1.42l1.3-1.29H8a1 1 0 0 1 0-2h5.66l-1.25-1.31a1 1 0 0 1 1.45-1.38"
				data-name="arrow-circle-right"
			/>
		</g>
	</svg>
);
export default SvgArrowCircleRight;
