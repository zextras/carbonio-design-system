import * as React from 'react';
import type { SVGProps } from 'react';

const SvgCinemaViewOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
		<path d="M3 5.016v13.986C3 20.098 3.902 21 4.998 21h3.996a2.008 2.008 0 0 0 1.998-1.998V5.016a2.008 2.008 0 0 0-1.998-1.998H4.998A2.008 2.008 0 0 0 3 5.016Zm5.994 13.986H4.998V5.016h3.996v13.986ZM12.99 15.006v3.996c0 1.096.902 1.998 1.998 1.998h3.996a2.008 2.008 0 0 0 1.998-1.998v-3.996a2.008 2.008 0 0 0-1.998-1.998h-3.996a2.008 2.008 0 0 0-1.998 1.998Zm5.994 3.996h-3.996v-3.996h3.996v3.996ZM12.99 5.022v3.996c0 1.096.902 1.998 1.998 1.998h3.996a2.008 2.008 0 0 0 1.998-1.998V5.022a2.008 2.008 0 0 0-1.998-1.999h-3.996a2.008 2.008 0 0 0-1.998 1.999Zm5.994 3.996h-3.996V5.022h3.996v3.996Z" />
	</svg>
);
export default SvgCinemaViewOutline;
