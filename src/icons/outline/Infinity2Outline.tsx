import * as React from 'react';
import type { SVGProps } from 'react';

const SvgInfinity2Outline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path
			fillRule="evenodd"
			d="m9.015 12.98-1.183.004a3.16 3.16 0 0 0-3.16 3.159 3.16 3.16 0 0 0 3.16 3.159 3.16 3.16 0 0 0 3.159-3.16l.02-8.308a5.132 5.132 0 0 1 5.13-5.13 5.132 5.132 0 0 1 5.13 5.13 5.132 5.132 0 0 1-5.13 5.13l-1.181.016v-1.986h1.18v-.001a3.16 3.16 0 0 0 3.16-3.159 3.16 3.16 0 0 0-3.16-3.159 3.16 3.16 0 0 0-3.158 3.159l-.02 8.309a5.132 5.132 0 0 1-5.13 5.13 5.132 5.132 0 0 1-5.13-5.13 5.132 5.132 0 0 1 5.13-5.13l1.183-.02v1.987Z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgInfinity2Outline;
