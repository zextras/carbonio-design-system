import * as React from 'react';
import type { SVGProps } from 'react';

const SvgScreenSharingOn = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M18.982 2.997a3.01 3.01 0 0 1 2.997 2.997v7.992a3.01 3.01 0 0 1-2.997 2.997h-5.995v1.999h3.996c.549 0 1 .45 1 .999s-.451.999-1 .999h-9.99c-.548 0-.999-.451-.999-1s.451-.998 1-.998h3.995v-1.999H4.995a3.01 3.01 0 0 1-2.997-2.997V5.994a3.01 3.01 0 0 1 2.997-2.997zm-7.83 9.973a1 1 0 0 0 .73-.33l3.558-3.902A1 1 0 1 0 13.962 7.4l-2.83 3.104-1.166-1.249a1 1 0 0 0-1.458 1.369l1.906 2.027a1 1 0 0 0 .729.32z" />
	</svg>
);
export default SvgScreenSharingOn;
