import * as React from 'react';
import type { SVGProps } from 'react';

const SvgScreenSharingOff = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M4.706 3.287a1.003 1.003 0 1 0-1.419 1.418L19.271 20.69a.999.999 0 0 0 1.419 0 1 1 0 0 0 0-1.419L4.706 3.287ZM2.163 5.02l11.964 11.963h-1.14v1.998h3.138l1.63 1.63a1 1 0 0 1-.772.369h-9.99c-.548 0-.999-.451-.999-1 0-.548.451-.998 1-.998h3.995v-1.999H4.995a3.011 3.011 0 0 1-2.997-2.997V5.994c0-.34.058-.668.165-.975Zm3.666-2.023h13.152a3.011 3.011 0 0 1 2.997 2.997v7.992c0 1.383-.957 2.56-2.24 2.9L5.83 2.996Z" />
	</svg>
);
export default SvgScreenSharingOff;
