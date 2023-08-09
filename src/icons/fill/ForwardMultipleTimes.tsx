import * as React from 'react';
import { SVGProps } from 'react';

const SvgForwardMultipleTimes = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<g clipPath="url(#a)">
			<path d="M1.781 21c.468.013.887-.302 1-.761a8.919 8.919 0 0 1 7.801-6.689v1.121c0 .714.431 1.363 1.089 1.64a2.005 2.005 0 0 0 2.149-.31l5.06-4.41a1.75 1.75 0 0 0 0-2.677l-5.06-4.419a2.002 2.002 0 0 0-2.182-.298 1.783 1.783 0 0 0-1.088 1.64v1.17C4.95 7.438.556 12.139.5 17.755c0 .839.104 1.677.31 2.492.112.455.532.774 1 .762H1.78V21Z" />
			<path d="M15.501 16.227c.057.028.113.057.17.08a2.005 2.005 0 0 0 2.149-.31l5.06-4.406a1.77 1.77 0 0 0 .62-1.339c0-.516-.226-1.008-.62-1.338l-5.06-4.419a2.002 2.002 0 0 0-2.182-.298c-.048.02-.096.044-.145.068.117.065.226.142.327.23l5.06 4.415c.39.334.62.826.62 1.338 0 .516-.225 1.008-.62 1.339l-5.06 4.41a1.93 1.93 0 0 1-.319.23Z" />
		</g>
		<defs>
			<clipPath id="a">
				<path fill="#fff" transform="matrix(-1 0 0 1 24 0)" d="M0 0h24v24H0z" />
			</clipPath>
		</defs>
	</svg>
);
export default SvgForwardMultipleTimes;
