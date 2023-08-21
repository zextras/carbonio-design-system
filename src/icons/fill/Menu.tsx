import * as React from 'react';
import type { SVGProps } from 'react';

const SvgMenu = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="menu">
				<rect width={18} height={2} x={3} y={11} rx={0.95} ry={0.95} />
				<rect width={18} height={2} x={3} y={16} rx={0.95} ry={0.95} />
				<rect width={18} height={2} x={3} y={6} rx={0.95} ry={0.95} />
			</g>
		</g>
	</svg>
);
export default SvgMenu;
