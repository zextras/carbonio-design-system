import * as React from 'react';
import type { SVGProps } from 'react';

const SvgMaximize = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="m20.71 19.29-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM13 12h-1v1a1 1 0 0 1-2 0v-1H9a1 1 0 0 1 0-2h1V9a1 1 0 0 1 2 0v1h1a1 1 0 0 1 0 2z"
				data-name="maximize"
			/>
		</g>
	</svg>
);
export default SvgMaximize;
