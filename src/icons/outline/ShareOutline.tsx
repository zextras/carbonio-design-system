import * as React from 'react';
import type { SVGProps } from 'react';

const SvgShareOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M18 15a3 3 0 0 0-2.1.86L8 12.34v-.67l7.9-3.53A3 3 0 1 0 15 6v.34L7.1 9.86a3 3 0 1 0 0 4.28l7.9 3.53V18a3 3 0 1 0 3-3m0-10a1 1 0 1 1-1 1 1 1 0 0 1 1-1M5 13a1 1 0 1 1 1-1 1 1 0 0 1-1 1m13 6a1 1 0 1 1 1-1 1 1 0 0 1-1 1"
				data-name="share"
			/>
		</g>
	</svg>
);
export default SvgShareOutline;
