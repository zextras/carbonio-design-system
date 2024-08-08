import * as React from 'react';
import type { SVGProps } from 'react';

const SvgBuildingOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
		<g clipPath="url(#a)">
			<path
				fillRule="evenodd"
				d="M9 4v5H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2m2 0h7v16H6v-9h5z"
				clipRule="evenodd"
			/>
			<rect width={2} height={2} x={12} y={5} rx={0.6} />
			<rect width={2} height={2} x={15} y={5} rx={0.6} />
			<rect width={2} height={2} x={12} y={8} rx={0.6} />
			<rect width={2} height={2} x={15} y={8} rx={0.6} />
			<rect width={2} height={2} x={12} y={11} rx={0.6} />
			<rect width={2} height={2} x={15} y={11} rx={0.6} />
			<rect width={2} height={2} x={12} y={14} rx={0.6} />
			<rect width={2} height={2} x={15} y={14} rx={0.6} />
			<rect width={2} height={2} x={7} y={12} rx={0.6} />
			<rect width={2} height={2} x={7} y={15} rx={0.6} />
		</g>
		<defs>
			<clipPath id="a">
				<path d="M0 0h24v24H0z" />
			</clipPath>
		</defs>
	</svg>
);
export default SvgBuildingOutline;
