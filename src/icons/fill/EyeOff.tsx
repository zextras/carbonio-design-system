import * as React from 'react';
import type { SVGProps } from 'react';

const SvgEyeOff = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="eye-off">
				<circle cx={12} cy={12} r={1.5} />
				<path d="M15.29 18.12 14 16.78l-.07-.07-1.27-1.27a4 4 0 0 1-.61.06A3.5 3.5 0 0 1 8.5 12a4 4 0 0 1 .06-.61l-2-2L5 7.87a15.9 15.9 0 0 0-2.87 3.63 1 1 0 0 0 0 1c.63 1.09 4 6.5 9.89 6.5h.25a9.5 9.5 0 0 0 3.23-.67zM8.59 5.76l2.8 2.8A4 4 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 4 4 0 0 1-.06.61l2.68 2.68.84.84a15.9 15.9 0 0 0 2.91-3.63 1 1 0 0 0 0-1c-.64-1.11-4.16-6.68-10.14-6.5a9.5 9.5 0 0 0-3.23.67zM20.71 19.29 19.41 18l-2-2-9.52-9.53L6.42 5 4.71 3.29a1 1 0 0 0-1.42 1.42L5.53 7l1.75 1.7 7.31 7.3.07.07L16 17.41l.59.59 2.7 2.71a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42" />
			</g>
		</g>
	</svg>
);
export default SvgEyeOff;
