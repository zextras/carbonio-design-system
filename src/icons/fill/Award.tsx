import * as React from 'react';
import type { SVGProps } from 'react';

const SvgAward = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="m19 20.75-2.31-9A5.94 5.94 0 0 0 18 8 6 6 0 0 0 6 8a5.94 5.94 0 0 0 1.34 3.77L5 20.75a1 1 0 0 0 1.48 1.11l5.33-3.13 5.68 3.14A.9.9 0 0 0 18 22a1 1 0 0 0 1-1.25M12 4a4 4 0 1 1-4 4 4 4 0 0 1 4-4"
				data-name="award"
			/>
		</g>
	</svg>
);
export default SvgAward;
