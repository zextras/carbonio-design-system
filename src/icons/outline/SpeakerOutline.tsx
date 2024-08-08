import * as React from 'react';
import type { SVGProps } from 'react';

const SvgSpeakerOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="speaker">
				<path d="M12 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3m0-4a1 1 0 1 1-1 1 1 1 0 0 1 1-1M12 12a3.5 3.5 0 1 0 3.5 3.5A3.5 3.5 0 0 0 12 12m0 5a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 12 17" />
				<path d="M17 2H7a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3m1 17a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1z" />
			</g>
		</g>
	</svg>
);
export default SvgSpeakerOutline;
