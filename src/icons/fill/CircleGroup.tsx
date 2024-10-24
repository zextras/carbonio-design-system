import * as React from 'react';
import type { SVGProps } from 'react';

const SvgCircleGroup = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
		<path
			fillRule="evenodd"
			d="M11.316 2.994a7.36 7.36 0 0 0-3.642.959c-.55.307-1.068.69-1.54 1.147a7.6 7.6 0 0 0-1.56 2.247l-.007.016a7.4 7.4 0 0 0-.647 3.027c0 1.145.26 2.23.726 3.198l-.609 3.044a.705.705 0 0 0 .262.786c.175.175.35.262.612.262h.175l3.052-.61a7.4 7.4 0 0 0 10.575-6.68 7.4 7.4 0 0 0-7.397-7.396m.966 7.348a.994.994 0 1 0-1.988 0 .994.994 0 0 0 1.988 0m-2.974 0a.994.994 0 1 0-1.988 0 .994.994 0 0 0 1.988 0m5.965 0a.994.994 0 1 0-1.988 0 .994.994 0 0 0 1.988 0m4.228 6.901c.467-1.122.61-2.294.427-3.408-1.37 3.414-4.71 5.828-8.612 5.828q-.681 0-1.338-.096a6.4 6.4 0 0 0 1.66.996c.7.262 1.485.437 2.272.437s1.66-.175 2.446-.524c.029 0 .058-.01.087-.02.058-.019.117-.038.175.02l2.534.524h.087a.8.8 0 0 0 .611-.262c.175-.175.262-.437.175-.699l-.524-2.534z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgCircleGroup;
