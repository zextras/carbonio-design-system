import * as React from 'react';
import type { SVGProps } from 'react';

const SvgUntagOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M16.467 8.492a.983.983 0 1 0 0-1.966.983.983 0 0 0 0 1.966M4.706 3.287a1.003 1.003 0 1 0-1.419 1.418L19.271 20.69a1 1 0 0 0 1.419 0 1 1 0 0 0 0-1.419z" />
		<path
			fillRule="evenodd"
			d="m7.067 9.889 1.391 1.39-3.184 3.185 4.238 4.238 3.184-3.184 1.391 1.391-3.35 3.35a1.733 1.733 0 0 1-2.45 0l-4.57-4.57a1.733 1.733 0 0 1 0-2.45zm2.83-2.83 3.325-3.324a1.73 1.73 0 0 1 1.18-.507 1.3 1.3 0 0 1 .211-.018h4.898c.692 0 1.255.563 1.255 1.255v4.898q0 .108-.018.212c-.011.428-.18.853-.506 1.18l-3.324 3.323-1.391-1.39 3.26-3.261.004-.043.008-.064V5.177h-4.143l-.064.009-.043.002-3.26 3.261z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgUntagOutline;
