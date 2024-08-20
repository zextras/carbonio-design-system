import * as React from 'react';
import type { SVGProps } from 'react';

const SvgFilm = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M18.26 3H5.74A2.74 2.74 0 0 0 3 5.74v12.52A2.74 2.74 0 0 0 5.74 21h12.52A2.74 2.74 0 0 0 21 18.26V5.74A2.74 2.74 0 0 0 18.26 3M7 11H5V9h2zm-2 2h2v2H5zm14-2h-2V9h2zm-2 2h2v2h-2zm2-7.26V7h-2V5h1.26a.74.74 0 0 1 .74.74M5.74 5H7v2H5V5.74A.74.74 0 0 1 5.74 5M5 18.26V17h2v2H5.74a.74.74 0 0 1-.74-.74m14 0a.74.74 0 0 1-.74.74H17v-2h2z"
				data-name="film"
			/>
		</g>
	</svg>
);
export default SvgFilm;