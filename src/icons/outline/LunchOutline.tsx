import * as React from 'react';
import { SVGProps } from 'react';

const SvgLunchOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="m11.135 11.494 2.05-3.55a.986.986 0 0 1 1.707.985l-2.05 3.55s-.234.406.162.634c.444.257.678-.149.678-.149l2.05-3.55a.986.986 0 0 1 1.706.985l-2.39 4.141a3.93 3.93 0 0 1-4.447 1.822l-2.255 3.904a.986.986 0 0 1-1.706-.985l2.254-3.905a3.93 3.93 0 0 1-.646-4.762l2.39-4.14a.986.986 0 0 1 1.707.985l-2.05 3.55s-.233.406.202.657c.404.233.638-.172.638-.172Z"
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M16.976 3.35c4.767 2.753 6.403 8.858 3.65 13.626-2.752 4.767-8.857 6.403-13.625 3.65C2.233 17.875.598 11.77 3.351 7.002c2.752-4.768 8.857-6.404 13.625-3.65Zm-.984 1.703a8.012 8.012 0 0 1 2.931 10.94 8.012 8.012 0 0 1-10.938 2.93A8.012 8.012 0 0 1 5.053 7.984a8.012 8.012 0 0 1 10.94-2.93Z"
		/>
	</svg>
);
export default SvgLunchOutline;
