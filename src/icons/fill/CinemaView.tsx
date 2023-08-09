import * as React from 'react';
import { SVGProps } from 'react';

const SvgCinemaView = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M18.984 2.997H4.998A2.008 2.008 0 0 0 3 4.995v3.996c0 1.096.902 1.998 1.998 1.998h13.986a2.008 2.008 0 0 0 1.998-1.998V4.995a2.008 2.008 0 0 0-1.998-1.998ZM8.994 12.987H4.998A2.008 2.008 0 0 0 3 14.985v3.997c0 1.096.902 1.998 1.998 1.998h3.996a2.008 2.008 0 0 0 1.998-1.998v-3.997a2.008 2.008 0 0 0-1.998-1.998ZM18.979 12.987h-3.997a2.008 2.008 0 0 0-1.998 1.998v3.997c0 1.096.902 1.998 1.998 1.998h3.997a2.008 2.008 0 0 0 1.998-1.998v-3.997a2.008 2.008 0 0 0-1.998-1.998Z" />
	</svg>
);
export default SvgCinemaView;
