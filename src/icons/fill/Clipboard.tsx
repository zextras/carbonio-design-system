import * as React from 'react';
import type { SVGProps } from 'react';

const SvgClipboard = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="clipboard">
				<path d="M18 4v3a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3" />
				<rect width={10} height={6} x={7} y={2} rx={1} ry={1} />
			</g>
		</g>
	</svg>
);
export default SvgClipboard;
