import * as React from 'react';
import { SVGProps } from 'react';

const SvgCalendarMod = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M17.01 2.997h1.923c1.122 0 2.046.924 2.047 2.046v13.89a2.056 2.056 0 0 1-2.047 2.047H5.044a2.056 2.056 0 0 1-2.047-2.046V5.043c0-1.123.925-2.046 2.047-2.046h1.88V5.08a.984.984 0 0 0 1.967 0V2.997h6.151V5.08a.984.984 0 0 0 1.967 0V2.997Zm-2.914 8.991a1.827 1.827 0 1 1-3.655-.001 1.827 1.827 0 0 1 3.655.001Zm-4.636 0a1.546 1.546 0 1 1-3.093 0 1.546 1.546 0 0 1 3.093 0Zm8.148 0a1.265 1.265 0 1 1-2.53-.001 1.265 1.265 0 0 1 2.53.001Z"
		/>
	</svg>
);

export default SvgCalendarMod;
