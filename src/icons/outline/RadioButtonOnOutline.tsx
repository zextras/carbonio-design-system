import * as React from 'react';
import type { SVGProps } from 'react';

const SvgRadioButtonOnOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="radio-button-on">
				<path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8" />
				<path d="M12 7a5 5 0 1 0 5 5 5 5 0 0 0-5-5m0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3" />
			</g>
		</g>
	</svg>
);
export default SvgRadioButtonOnOutline;
