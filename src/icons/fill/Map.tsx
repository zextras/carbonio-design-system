import * as React from 'react';
import type { SVGProps } from 'react';

const SvgMap = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="m20.41 5.89-4-1.8h-.82L12 5.7 8.41 4.09h-.05L8.24 4h-.6l-4 1.8a1 1 0 0 0-.64 1V19a1 1 0 0 0 .46.84A1 1 0 0 0 4 20a1 1 0 0 0 .41-.09L8 18.3l3.59 1.61h.05a.85.85 0 0 0 .72 0h.05L16 18.3l3.59 1.61A1 1 0 0 0 20 20a1 1 0 0 0 .54-.16A1 1 0 0 0 21 19V6.8a1 1 0 0 0-.59-.91M9 6.55l2 .89v10l-2-.89zm10 10.9-2-.89v-10l2 .89z"
				data-name="map"
			/>
		</g>
	</svg>
);
export default SvgMap;
