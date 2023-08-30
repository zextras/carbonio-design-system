import * as React from 'react';
import type { SVGProps } from 'react';

const SvgCompass = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="compass">
				<path d="m10.8 13.21 1.69-.68.71-1.74-1.69.68-.71 1.74z" />
				<path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm3.93 7.42-1.75 4.26a1 1 0 0 1-.55.55l-4.21 1.7A1 1 0 0 1 9 16a1 1 0 0 1-.71-.31h-.05a1 1 0 0 1-.18-1l1.75-4.26a1 1 0 0 1 .55-.55l4.21-1.7a1 1 0 0 1 1.1.25 1 1 0 0 1 .26.99z" />
			</g>
		</g>
	</svg>
);
export default SvgCompass;
