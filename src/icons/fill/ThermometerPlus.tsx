import * as React from 'react';
import type { SVGProps } from 'react';

const SvgThermometerPlus = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="thermometer-plus">
				<rect width={6} height={2} x={2} y={5} rx={1} ry={1} />
				<rect width={6} height={2} x={2} y={5} rx={1} ry={1} transform="rotate(-90 5 6)" />
				<path d="M14 22a5 5 0 0 1-3-9V5a3 3 0 0 1 3-3 3 3 0 0 1 3 3v8a5 5 0 0 1-3 9zm1-12.46V5a.93.93 0 0 0-.29-.69A1 1 0 0 0 14 4a1 1 0 0 0-1 1v4.54z" />
			</g>
		</g>
	</svg>
);
export default SvgThermometerPlus;
