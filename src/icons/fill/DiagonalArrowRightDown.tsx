import * as React from 'react';
import { SVGProps } from 'react';

const SvgDiagonalArrowRightDown = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M17 8a1 1 0 0 0-1 1v5.59l-8.29-8.3a1 1 0 0 0-1.42 1.42l8.3 8.29H9a1 1 0 0 0 0 2h8a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z"
				data-name="diagonal-arrow-right-down"
			/>
		</g>
	</svg>
);
export default SvgDiagonalArrowRightDown;
