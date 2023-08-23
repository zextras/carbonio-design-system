import * as React from 'react';
import type { SVGProps } from 'react';

const SvgSpeaker = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="speaker">
				<circle cx={12} cy={15.5} r={1.5} />
				<circle cx={12} cy={8} r={1} />
				<path d="M17 2H7a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3zm-5 3a3 3 0 1 1-3 3 3 3 0 0 1 3-3zm0 14a3.5 3.5 0 1 1 3.5-3.5A3.5 3.5 0 0 1 12 19z" />
			</g>
		</g>
	</svg>
);
export default SvgSpeaker;
