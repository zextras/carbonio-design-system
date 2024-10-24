import * as React from 'react';
import type { SVGProps } from 'react';

const SvgTrendingDown = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M21 12a1 1 0 0 0-2 0v2.3l-4.24-5a1 1 0 0 0-1.27-.21L9.22 11.7 4.77 6.36a1 1 0 1 0-1.54 1.28l5 6a1 1 0 0 0 1.28.22l4.28-2.57 4 4.71H15a1 1 0 0 0 0 2h5a1.1 1.1 0 0 0 .36-.07l.14-.08a1 1 0 0 0 .15-.09.8.8 0 0 0 .14-.17 1 1 0 0 0 .09-.14.6.6 0 0 0 .05-.17A.8.8 0 0 0 21 17z"
				data-name="trending-down"
			/>
		</g>
	</svg>
);
export default SvgTrendingDown;
