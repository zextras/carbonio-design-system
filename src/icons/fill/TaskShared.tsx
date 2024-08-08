import * as React from 'react';
import type { SVGProps } from 'react';

const SvgTaskShared = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path
			fillRule="evenodd"
			d="M18 21H6c-1.646 0-3-1.354-3-3V6c0-1.646 1.354-3 3-3h12c1.646 0 3 1.354 3 3v12c0 1.646-1.354 3-3 3M11.931 9.119a1.97 1.97 0 1 1 3.901-.38 1.97 1.97 0 0 1-2.603 1.865l-1.16 1.014a2 2 0 0 1 0 .76l1.162 1.018q.299-.104.632-.105a1.97 1.97 0 0 1 0 3.938 1.97 1.97 0 0 1-1.932-2.35l-1.162-1.017a1.97 1.97 0 1 1 .001-3.729z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgTaskShared;
