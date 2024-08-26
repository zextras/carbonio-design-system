import * as React from 'react';
import type { SVGProps } from 'react';

const SvgArrowLeftOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M13.54 18a2.06 2.06 0 0 1-1.3-.46l-5.1-4.21a1.7 1.7 0 0 1 0-2.66l5.1-4.21a2.1 2.1 0 0 1 2.21-.26 1.76 1.76 0 0 1 1.05 1.59v8.42a1.76 1.76 0 0 1-1.05 1.59 2.2 2.2 0 0 1-.91.2m-4.86-6 4.82 4V8.09z"
				data-name="arrow-left"
			/>
		</g>
	</svg>
);
export default SvgArrowLeftOutline;
