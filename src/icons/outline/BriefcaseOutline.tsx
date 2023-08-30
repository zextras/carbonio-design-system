import * as React from 'react';
import type { SVGProps } from 'react';

const SvgBriefcaseOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M19 7h-3V5.5A2.5 2.5 0 0 0 13.5 3h-3A2.5 2.5 0 0 0 8 5.5V7H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-8a3 3 0 0 0-3-3zm-4 2v10H9V9zm-5-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V7h-4zM4 18v-8a1 1 0 0 1 1-1h2v10H5a1 1 0 0 1-1-1zm16 0a1 1 0 0 1-1 1h-2V9h2a1 1 0 0 1 1 1z"
				data-name="briefcase"
			/>
		</g>
	</svg>
);
export default SvgBriefcaseOutline;
