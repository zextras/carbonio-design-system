import * as React from 'react';
import type { SVGProps } from 'react';

const SvgCreditCard = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M19 5H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3m-8 10H7a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2m6 0h-2a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2m3-6H4V8a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1z"
				data-name="credit-card"
			/>
		</g>
	</svg>
);
export default SvgCreditCard;
