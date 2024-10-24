import * as React from 'react';
import type { SVGProps } from 'react';

const SvgUploadOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="upload">
				<rect width={16} height={2} x={4} y={4} rx={1} ry={1} transform="rotate(180 12 5)" />
				<rect width={4} height={2} x={17} y={5} rx={1} ry={1} transform="rotate(90 19 6)" />
				<rect width={4} height={2} x={3} y={5} rx={1} ry={1} transform="rotate(90 5 6)" />
				<path d="M8 14a1 1 0 0 1-.8-.4 1 1 0 0 1 .2-1.4l4-3a1 1 0 0 1 1.18 0l4 2.82a1 1 0 0 1 .24 1.39 1 1 0 0 1-1.4.24L12 11.24 8.6 13.8a1 1 0 0 1-.6.2" />
				<path d="M12 21a1 1 0 0 1-1-1v-8a1 1 0 0 1 2 0v8a1 1 0 0 1-1 1" />
			</g>
		</g>
	</svg>
);
export default SvgUploadOutline;
