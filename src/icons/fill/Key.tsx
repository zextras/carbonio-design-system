import * as React from 'react';
import type { SVGProps } from 'react';

const SvgKey = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path
			fillRule="evenodd"
			d="m9.907 12.162 8.83-8.83a.986.986 0 0 1 1.394 1.394l-1.44 1.44 1.44 1.44a.986.986 0 0 1-1.394 1.393l-1.44-1.44-1.39 1.392 2.617 2.617a.986.986 0 0 1-1.394 1.394l-2.617-2.618-3.233 3.233a4.498 4.498 0 0 1-3.834 6.843 4.5 4.5 0 0 1-4.496-4.496 4.498 4.498 0 0 1 6.957-3.762m-3.524 3.886a.984.984 0 1 1 0 1.968.984.984 0 0 1 0-1.968"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgKey;