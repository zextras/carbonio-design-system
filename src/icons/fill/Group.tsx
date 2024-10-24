import * as React from 'react';
import type { SVGProps } from 'react';

const SvgGroup = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M11.992 22c-5.486 0-10-4.513-10-9.999s4.514-10 10-10 10 4.514 10 10-4.514 10-10 10m4.842-5.687a.54.54 0 0 0 .538-.538 2.703 2.703 0 0 0-2.69-2.688c-.596 0-1.175.198-1.646.563a3.77 3.77 0 0 0-2.658-1.098 3.784 3.784 0 0 0-3.766 3.76.54.54 0 0 0 .538.539h6.456a.54.54 0 0 0 .538-.538zm-2.152-3.766c.886 0 1.614-.729 1.614-1.614s-.728-1.614-1.614-1.614c-.885 0-1.614.728-1.614 1.614 0 .885.729 1.614 1.614 1.614m-4.304-1.076c1.18 0 2.152-.972 2.152-2.152s-.971-2.152-2.152-2.152c-1.18 0-2.152.971-2.152 2.152 0 1.18.972 2.152 2.152 2.152" />
	</svg>
);
export default SvgGroup;
