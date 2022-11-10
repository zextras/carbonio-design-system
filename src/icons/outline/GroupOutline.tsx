import * as React from 'react';
import { SVGProps } from 'react';

const SvgGroupOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M11.992 22c-5.486 0-10-4.513-10-9.999 0-5.486 4.514-10 10-10s10 4.514 10 10-4.514 10-10 10Zm0-18c-4.389 0-8 3.612-8 8.001 0 4.389 3.612 8 8 8 4.389 0 8-3.611 8-8 0-4.389-3.611-8-8-8Z" />
		<path d="M16.832 16.312a.54.54 0 0 0 .538-.538 2.703 2.703 0 0 0-2.69-2.688 2.69 2.69 0 0 0-1.647.563 3.768 3.768 0 0 0-2.657-1.098 3.784 3.784 0 0 0-3.767 3.76.54.54 0 0 0 .538.539h6.457a.54.54 0 0 0 .538-.538h2.69ZM14.669 12.547c.885 0 1.614-.728 1.614-1.614 0-.885-.729-1.614-1.614-1.614-.886 0-1.614.729-1.614 1.614 0 .886.728 1.614 1.614 1.614ZM10.379 11.47c1.18 0 2.152-.971 2.152-2.152 0-1.18-.972-2.152-2.152-2.152-1.18 0-2.152.971-2.152 2.152 0 1.18.971 2.152 2.152 2.152Z" />
	</svg>
);

export default SvgGroupOutline;
