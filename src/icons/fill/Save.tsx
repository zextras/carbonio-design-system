import * as React from 'react';
import type { SVGProps } from 'react';

const SvgSave = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="save">
				<path d="M10 17h4v4h-4z" />
				<path d="m20.12 8.71-4.83-4.83A3 3 0 0 0 13.17 3H10v6h5a1 1 0 0 1 0 2H9a1 1 0 0 1-1-1V3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h2v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4h2a3 3 0 0 0 3-3v-7.17a3 3 0 0 0-.88-2.12" />
			</g>
		</g>
	</svg>
);
export default SvgSave;
