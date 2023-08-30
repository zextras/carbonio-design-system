import * as React from 'react';
import type { SVGProps } from 'react';

const SvgList = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="list">
				<circle cx={4} cy={7} r={1} />
				<circle cx={4} cy={12} r={1} />
				<circle cx={4} cy={17} r={1} />
				<rect width={14} height={2} x={7} y={11} rx={0.94} ry={0.94} />
				<rect width={14} height={2} x={7} y={16} rx={0.94} ry={0.94} />
				<rect width={14} height={2} x={7} y={6} rx={0.94} ry={0.94} />
			</g>
		</g>
	</svg>
);
export default SvgList;
