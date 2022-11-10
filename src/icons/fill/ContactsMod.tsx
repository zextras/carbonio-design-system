import * as React from 'react';
import { SVGProps } from 'react';

const SvgContactsMod = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M11.988 2.014c5.506 0 9.975 4.47 9.975 9.974 0 5.506-4.47 9.975-9.975 9.975s-9.974-4.47-9.974-9.975 4.47-9.974 9.974-9.974Zm-.535 9.837a3.195 3.195 0 0 1 3.228 1.328c.493.717.69 1.606.552 2.473a.546.546 0 0 1-.573.455H9.48l-.04-.001a.544.544 0 0 1-.566-.454 3.443 3.443 0 0 1 .55-2.472l.043-.061a3.189 3.189 0 0 1 1.985-1.268Zm6.195-1.36a1.546 1.546 0 1 1-2.986.804 1.546 1.546 0 0 1 2.986-.804Zm-8.233.073a1.265 1.265 0 1 1-2.442.658 1.265 1.265 0 0 1 2.442-.658Zm4.337-2.134a1.827 1.827 0 1 1-3.529.95 1.827 1.827 0 0 1 3.529-.95Z"
		/>
	</svg>
);

export default SvgContactsMod;
