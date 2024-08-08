import * as React from 'react';
import type { SVGProps } from 'react';

const SvgPercent = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="percent">
				<path d="M8 11a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 8 11m0-5a1.5 1.5 0 1 1-1.5 1.5A1.5 1.5 0 0 1 8 6M16 14a3.5 3.5 0 1 0 3.5 3.5A3.5 3.5 0 0 0 16 14m0 5a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 16 19M19.74 4.26a.89.89 0 0 0-1.26 0L4.26 18.48a.9.9 0 0 0-.26.63.89.89 0 0 0 1.52.63L19.74 5.52a.89.89 0 0 0 0-1.26" />
			</g>
		</g>
	</svg>
);
export default SvgPercent;
