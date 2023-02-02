import * as React from 'react';
import { SVGProps } from 'react';

const SvgDrive = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M10.415 2.997c.322 0 .633.127.862.356l1.948 1.948a.457.457 0 0 0 .322.135h5.604c1.008 0 1.829.817 1.829 1.828v11.887a1.828 1.828 0 0 1-1.829 1.829H4.825a1.828 1.828 0 0 1-1.828-1.829V4.825a1.83 1.83 0 0 1 1.828-1.828h5.59Zm.408 8.445a1.265 1.265 0 1 1 .897.408l-.804 1.768c.174.146.322.325.432.531l1.873-.42a1.547 1.547 0 0 1 3.03-.241 1.546 1.546 0 0 1-2.815 1.203l-1.872.42a1.827 1.827 0 1 1-1.544-1.901l.803-1.768Z"
		/>
	</svg>
);
export default SvgDrive;
