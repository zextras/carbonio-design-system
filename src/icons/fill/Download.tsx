import * as React from 'react';
import type { SVGProps } from 'react';

const SvgDownload = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="download">
				<rect width={16} height={2} x={4} y={18} rx={1} ry={1} />
				<rect width={4} height={2} x={3} y={17} rx={1} ry={1} transform="rotate(-90 5 18)" />
				<rect width={4} height={2} x={17} y={17} rx={1} ry={1} transform="rotate(-90 19 18)" />
				<path d="M12 15a1 1 0 0 1-.58-.18l-4-2.82a1 1 0 0 1-.24-1.39 1 1 0 0 1 1.4-.24L12 12.76l3.4-2.56a1 1 0 0 1 1.2 1.6l-4 3a1 1 0 0 1-.6.2" />
				<path d="M12 13a1 1 0 0 1-1-1V4a1 1 0 0 1 2 0v8a1 1 0 0 1-1 1" />
			</g>
		</g>
	</svg>
);
export default SvgDownload;
