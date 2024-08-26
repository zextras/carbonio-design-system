import * as React from 'react';
import type { SVGProps } from 'react';

const SvgHeadphonesOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M12 2A10.2 10.2 0 0 0 2 12.37V17a4 4 0 1 0 4-4 3.9 3.9 0 0 0-2 .56v-1.19A8.2 8.2 0 0 1 12 4a8.2 8.2 0 0 1 8 8.37v1.19a3.9 3.9 0 0 0-2-.56 4 4 0 1 0 4 4v-4.63A10.2 10.2 0 0 0 12 2M6 15a2 2 0 1 1-2 2 2 2 0 0 1 2-2m12 4a2 2 0 1 1 2-2 2 2 0 0 1-2 2"
				data-name="headphones"
			/>
		</g>
	</svg>
);
export default SvgHeadphonesOutline;
