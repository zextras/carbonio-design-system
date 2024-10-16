import * as React from 'react';
import type { SVGProps } from 'react';

const SvgArrowCircleDown = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m3.69 11.86-3 2.86a.5.5 0 0 1-.15.1.5.5 0 0 1-.16.1.94.94 0 0 1-.76 0 1 1 0 0 1-.33-.21l-3-3a1 1 0 0 1 1.42-1.42l1.29 1.3V8a1 1 0 0 1 2 0v5.66l1.31-1.25a1 1 0 0 1 1.38 1.45"
				data-name="arrow-circle-down"
			/>
		</g>
	</svg>
);
export default SvgArrowCircleDown;
