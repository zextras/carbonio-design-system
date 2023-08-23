import * as React from 'react';
import type { SVGProps } from 'react';

const SvgMinusOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path d="M19 13H5a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2z" data-name="minus" />
		</g>
	</svg>
);
export default SvgMinusOutline;
