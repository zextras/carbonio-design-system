import * as React from 'react';
import type { SVGProps } from 'react';

const SvgCarOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M21.6 11.22 17 7.52V5a1.91 1.91 0 0 0-1.81-2H3.79A1.91 1.91 0 0 0 2 5v10a2 2 0 0 0 1.2 1.88 3 3 0 1 0 5.6.12h6.36a3 3 0 1 0 5.64 0h.2a1 1 0 0 0 1-1v-4a1 1 0 0 0-.4-.78M20 12.48V15h-3v-4.92zM7 18a1 1 0 1 1-1-1 1 1 0 0 1 1 1m5-3H4V5h11v10zm7 3a1 1 0 1 1-1-1 1 1 0 0 1 1 1"
				data-name="car"
			/>
		</g>
	</svg>
);
export default SvgCarOutline;
