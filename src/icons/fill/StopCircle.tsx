import * as React from 'react';
import type { SVGProps } from 'react';

const SvgStopCircle = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="stop-circle">
				<path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m4 12.75A1.25 1.25 0 0 1 14.75 16h-5.5A1.25 1.25 0 0 1 8 14.75v-5.5A1.25 1.25 0 0 1 9.25 8h5.5A1.25 1.25 0 0 1 16 9.25z" />
				<path d="M10 10h4v4h-4z" />
			</g>
		</g>
	</svg>
);
export default SvgStopCircle;
