import * as React from 'react';
import type { SVGProps } from 'react';

const SvgUntag = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path
			fillRule="evenodd"
			d="m7.067 9.889 7.02 7.02-3.35 3.35a1.733 1.733 0 0 1-2.45 0l-4.57-4.57a1.733 1.733 0 0 1 0-2.45zm2.83-2.83 3.325-3.324a1.73 1.73 0 0 1 1.18-.507 1.3 1.3 0 0 1 .211-.018h4.898c.692 0 1.255.563 1.255 1.255v4.898q0 .108-.018.212c-.011.428-.18.853-.506 1.18l-3.324 3.323zm6.57-.533a.984.984 0 1 0 .001 1.968.984.984 0 0 0 0-1.968"
			clipRule="evenodd"
		/>
		<path d="M4.706 3.287a1.003 1.003 0 1 0-1.419 1.418L19.271 20.69a1 1 0 0 0 1.419 0 1 1 0 0 0 0-1.419z" />
	</svg>
);
export default SvgUntag;
