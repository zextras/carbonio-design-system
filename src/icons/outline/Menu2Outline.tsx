import * as React from 'react';
import type { SVGProps } from 'react';

const SvgMenu2Outline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="menu-2">
				<circle cx={4} cy={12} r={1} />
				<rect width={14} height={2} x={7} y={11} rx={0.94} ry={0.94} />
				<rect width={18} height={2} x={3} y={16} rx={0.94} ry={0.94} />
				<rect width={18} height={2} x={3} y={6} rx={0.94} ry={0.94} />
			</g>
		</g>
	</svg>
);
export default SvgMenu2Outline;
