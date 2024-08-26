import * as React from 'react';
import type { SVGProps } from 'react';

const SvgLunchOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path
			fillRule="evenodd"
			d="m11.135 11.494 2.05-3.55a.986.986 0 0 1 1.707.985l-2.05 3.55s-.234.406.162.634c.444.257.678-.149.678-.149l2.05-3.55a.986.986 0 0 1 1.706.985l-2.39 4.141a3.93 3.93 0 0 1-4.447 1.822l-2.255 3.904a.986.986 0 0 1-1.706-.985l2.254-3.905a3.93 3.93 0 0 1-.646-4.762l2.39-4.14a.986.986 0 0 1 1.707.985l-2.05 3.55s-.233.406.202.657c.404.233.638-.172.638-.172"
			clipRule="evenodd"
		/>
		<path
			fillRule="evenodd"
			d="M16.976 3.35c4.767 2.753 6.403 8.858 3.65 13.626s-8.857 6.403-13.625 3.65S.598 11.77 3.351 7.002s8.857-6.404 13.625-3.65m-.984 1.703a8.01 8.01 0 0 1 2.932 10.94 8.01 8.01 0 0 1-10.94 2.93 8.01 8.01 0 0 1-2.93-10.939 8.01 8.01 0 0 1 10.938-2.93"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgLunchOutline;
