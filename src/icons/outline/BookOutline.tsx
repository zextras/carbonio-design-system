import * as React from 'react';
import type { SVGProps } from 'react';

const SvgBookOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M19 3H7a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1M7 5h11v10H7a3 3 0 0 0-1 .18V6a1 1 0 0 1 1-1m0 14a1 1 0 0 1 0-2h11v2z"
				data-name="book"
			/>
		</g>
	</svg>
);
export default SvgBookOutline;
