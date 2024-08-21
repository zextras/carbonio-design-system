import * as React from 'react';
import type { SVGProps } from 'react';

const SvgMoon = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M12.3 22h-.1a10.3 10.3 0 0 1-7.34-3.15 10.46 10.46 0 0 1-.26-14 10.1 10.1 0 0 1 4-2.74 1 1 0 0 1 1.06.22 1 1 0 0 1 .24 1 8.4 8.4 0 0 0 1.94 8.81 8.47 8.47 0 0 0 8.83 1.94 1 1 0 0 1 1.27 1.29A10.2 10.2 0 0 1 19.6 19a10.28 10.28 0 0 1-7.3 3"
				data-name="moon"
			/>
		</g>
	</svg>
);
export default SvgMoon;
