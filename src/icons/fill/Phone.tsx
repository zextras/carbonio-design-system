import * as React from 'react';
import type { SVGProps } from 'react';

const SvgPhone = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M17.4 22A15.42 15.42 0 0 1 2 6.6 4.6 4.6 0 0 1 6.6 2a4 4 0 0 1 .77.07 4 4 0 0 1 .72.18 1 1 0 0 1 .65.75l1.37 6a1 1 0 0 1-.26.92c-.13.14-.14.15-1.37.79a9.9 9.9 0 0 0 4.87 4.89c.65-1.24.66-1.25.8-1.38a1 1 0 0 1 .92-.26l6 1.37a1 1 0 0 1 .72.65 4.3 4.3 0 0 1 .19.73 5 5 0 0 1 .06.76A4.6 4.6 0 0 1 17.4 22"
				data-name="phone"
			/>
		</g>
	</svg>
);
export default SvgPhone;
