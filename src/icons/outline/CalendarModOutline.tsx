import * as React from 'react';
import { SVGProps } from 'react';

const SvgCalendarModOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M15.042 2.997v-.256a.984.984 0 0 1 1.967 0v.256h1.924c1.122 0 2.046.924 2.047 2.046v13.89a2.056 2.056 0 0 1-2.047 2.046H5.044a2.056 2.056 0 0 1-2.047-2.045V5.043c0-1.123.925-2.046 2.047-2.046h1.88v-.256a.984.984 0 0 1 1.967 0v.256h6.151Zm1.967 1.967v.116a.984.984 0 0 1-1.967 0v-.116H8.891v.116a.984.984 0 0 1-1.967 0v-.116H5.385a.421.421 0 0 0-.421.421v13.207c0 .232.189.42.421.42h13.192a.421.421 0 0 0 .421-.42V5.384a.421.421 0 0 0-.421-.42h-1.568Zm-3.194 7.024a1.827 1.827 0 1 1-3.655-.001 1.827 1.827 0 0 1 3.655.001Zm-4.636 0a1.546 1.546 0 1 1-3.093 0 1.546 1.546 0 0 1 3.093 0Zm8.148 0a1.265 1.265 0 1 1-2.53-.001 1.265 1.265 0 0 1 2.53.001Z"
		/>
	</svg>
);

export default SvgCalendarModOutline;
