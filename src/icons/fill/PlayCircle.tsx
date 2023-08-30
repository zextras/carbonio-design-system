import * as React from 'react';
import type { SVGProps } from 'react';

const SvgPlayCircle = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="play-circle">
				<path d="m11.5 14.6 2.81-2.6-2.81-2.6v5.2z" />
				<path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm4 11.18-3.64 3.37a1.74 1.74 0 0 1-1.16.45 1.68 1.68 0 0 1-.69-.15 1.6 1.6 0 0 1-1-1.48V8.63a1.6 1.6 0 0 1 1-1.48 1.7 1.7 0 0 1 1.85.3L16 10.82a1.6 1.6 0 0 1 0 2.36z" />
			</g>
		</g>
	</svg>
);
export default SvgPlayCircle;
