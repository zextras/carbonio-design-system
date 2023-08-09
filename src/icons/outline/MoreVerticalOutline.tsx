import * as React from 'react';
import type { SVGProps } from 'react';

const SvgMoreVerticalOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="more-vertical">
				<circle cx={12} cy={12} r={2} />
				<circle cx={12} cy={5} r={2} />
				<circle cx={12} cy={19} r={2} />
			</g>
		</g>
	</svg>
);
export default SvgMoreVerticalOutline;
