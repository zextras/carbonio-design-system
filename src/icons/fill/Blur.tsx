import * as React from 'react';
import type { SVGProps } from 'react';

const SvgBlur = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
		<g clipPath="url(#a)">
			<path
				fillRule="evenodd"
				d="M20.641 9.726c-.636 0-1.137-.5-1.137-1.137s.5-1.137 1.137-1.137 1.137.5 1.137 1.137-.5 1.137-1.137 1.137m-5.23 8.414a2.737 2.737 0 0 1-2.728-2.73c0-1.5 1.228-2.728 2.728-2.728s2.729 1.228 2.729 2.729c0 1.5-1.228 2.729-2.729 2.729m0-6.822a2.737 2.737 0 0 1-2.728-2.729c0-1.5 1.228-2.729 2.728-2.729s2.729 1.228 2.729 2.73c0 1.5-1.228 2.728-2.729 2.728m0-6.822c-.636 0-1.137-.5-1.137-1.137s.5-1.137 1.137-1.137 1.137.5 1.137 1.137-.5 1.137-1.137 1.137M8.59 18.14a2.737 2.737 0 0 1-2.73-2.73c0-1.5 1.229-2.728 2.73-2.728s2.728 1.228 2.728 2.729c0 1.5-1.228 2.729-2.728 2.729m0-6.822a2.737 2.737 0 0 1-2.73-2.729c0-1.5 1.229-2.729 2.73-2.729s2.728 1.228 2.728 2.73c0 1.5-1.228 2.728-2.728 2.728m0-6.822c-.637 0-1.137-.5-1.137-1.137s.5-1.137 1.137-1.137c.636 0 1.137.5 1.137 1.137s-.5 1.137-1.137 1.137M3.36 16.548c-.637 0-1.137-.5-1.137-1.137s.5-1.137 1.137-1.137c.636 0 1.137.5 1.137 1.137 0 .636-.5 1.137-1.137 1.137m0-6.822c-.637 0-1.137-.5-1.137-1.137s.5-1.137 1.137-1.137c.636 0 1.137.5 1.137 1.137s-.5 1.137-1.137 1.137m5.23 9.778c.636 0 1.137.5 1.137 1.137s-.5 1.137-1.137 1.137-1.137-.5-1.137-1.137.5-1.137 1.137-1.137m6.821 0c.637 0 1.137.5 1.137 1.137s-.5 1.137-1.137 1.137c-.636 0-1.137-.5-1.137-1.137s.5-1.137 1.137-1.137m5.23-5.23c.637 0 1.137.5 1.137 1.137 0 .636-.5 1.137-1.137 1.137-.636 0-1.137-.5-1.137-1.137s.5-1.137 1.137-1.137"
				clipRule="evenodd"
			/>
		</g>
		<defs>
			<clipPath id="a">
				<path d="M0 0h24v24H0z" />
			</clipPath>
		</defs>
	</svg>
);
export default SvgBlur;
