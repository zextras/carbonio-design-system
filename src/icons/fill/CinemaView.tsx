import * as React from 'react';
import type { SVGProps } from 'react';

const SvgCinemaView = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
		<path d="M2.997 5.016v13.986C2.997 20.098 3.9 21 4.995 21h3.996a2.01 2.01 0 0 0 1.998-1.998V5.016a2.01 2.01 0 0 0-1.998-1.998H4.995a2.01 2.01 0 0 0-1.998 1.998M12.987 15.006v3.996c0 1.096.902 1.998 1.998 1.998h3.997a2.01 2.01 0 0 0 1.998-1.998v-3.996a2.01 2.01 0 0 0-1.998-1.998h-3.997a2.01 2.01 0 0 0-1.998 1.998M12.987 5.022v3.996c0 1.096.902 1.998 1.998 1.998h3.997a2.01 2.01 0 0 0 1.998-1.998V5.022a2.01 2.01 0 0 0-1.998-1.999h-3.997a2.01 2.01 0 0 0-1.998 1.999" />
	</svg>
);
export default SvgCinemaView;
