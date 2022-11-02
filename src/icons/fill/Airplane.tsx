import * as React from 'react';
import { SVGProps } from 'react';

const SvgAirplane = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M14.11 15.5c1.553-1.553 2.248-4.771.695-6.324-1.553-1.554-4.771-.859-6.325.695-1.553 1.553-.858 3.38.696 4.934 1.553 1.553 3.38 2.249 4.934.695Z"
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M10.452 10.445a.98.98 0 0 0 0-1.384L5.247 3.857a.98.98 0 0 0-1.384 0l-.006.006a.98.98 0 0 0 0 1.384l5.204 5.205a.98.98 0 0 0 1.384 0l.007-.007ZM20.119 20.113a.979.979 0 0 0 0-1.384l-5.017-5.017a.979.979 0 0 0-1.384 0l-.007.006a.98.98 0 0 0 0 1.385l5.017 5.017a.98.98 0 0 0 1.384 0l.007-.007Z"
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M6.415 7.764a1.514 1.514 0 0 1-2.14 2.14 1.514 1.514 0 0 1 2.14-2.14ZM16.216 17.565a1.514 1.514 0 0 1-2.14 2.14 1.514 1.514 0 0 1 2.14-2.14ZM16.954 7.02a.98.98 0 0 0-1.385 0L13.41 9.179a.98.98 0 0 0 0 1.384l.007.006a.98.98 0 0 0 1.384 0l2.16-2.158a.98.98 0 0 0 0-1.385l-.007-.006Z"
		/>
	</svg>
);

export default SvgAirplane;
