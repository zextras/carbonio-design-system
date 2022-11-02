import * as React from 'react';
import { SVGProps } from 'react';

const SvgBoardOpen = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M7.001 8.944V20.98H5.994a3.011 3.011 0 0 1-2.997-2.998V8.944h4.004ZM20.98 6.978H2.997v-.984a3.011 3.011 0 0 1 2.997-2.997h11.988a3.011 3.011 0 0 1 2.998 2.997v.984ZM16.733 15.65l-2.098 2.028a1 1 0 0 1-.7.32 1 1 0 0 1-.709-1.708l1.409-1.32-1.257-1.34a1 1 0 1 1 1.419-1.409l1.936 2.03a1.004 1.004 0 0 1 0 1.398ZM8.968 8.943V20.98h9.014a3.012 3.012 0 0 0 2.998-2.997V8.944H8.968Z" />
	</svg>
);

export default SvgBoardOpen;
