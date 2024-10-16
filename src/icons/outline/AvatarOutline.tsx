import * as React from 'react';
import type { SVGProps } from 'react';

const SvgAvatarOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M11.992 22c-5.486 0-10-4.513-10-9.999s4.514-10 10-10 10 4.514 10 10-4.514 10-10 10m3.282-2.712a4.97 4.97 0 0 0-3.282-1.24c-1.251 0-2.401.47-3.282 1.24a7.9 7.9 0 0 0 3.282.713 7.9 7.9 0 0 0 3.282-.713m1.75-1.087c1.806-1.472 2.968-3.71 2.968-6.2 0-4.389-3.611-8-8-8s-8 3.611-8 8c0 2.49 1.162 4.728 2.968 6.2a6.98 6.98 0 0 1 5.032-2.153c1.967 0 3.755.829 5.032 2.153m-5.032-4.153c2.194 0 4-1.806 4-4s-1.806-4-4-4-4 1.806-4 4 1.806 4 4 4m0-6c1.097 0 2 .903 2 2s-.903 2-2 2-2-.903-2-2 .903-2 2-2" />
	</svg>
);
export default SvgAvatarOutline;
