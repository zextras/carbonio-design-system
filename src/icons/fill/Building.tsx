import * as React from 'react';
import type { SVGProps } from 'react';

const SvgBuilding = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
		<g clipPath="url(#a)">
			<path
				fillRule="evenodd"
				d="M9 9V4a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2zm3-3.4a.6.6 0 0 1 .6-.6h.8a.6.6 0 0 1 .6.6v.8a.6.6 0 0 1-.6.6h-.8a.6.6 0 0 1-.6-.6zm3.6-.6a.6.6 0 0 0-.6.6v.8a.6.6 0 0 0 .6.6h.8a.6.6 0 0 0 .6-.6v-.8a.6.6 0 0 0-.6-.6zM12 8.6a.6.6 0 0 1 .6-.6h.8a.6.6 0 0 1 .6.6v.8a.6.6 0 0 1-.6.6h-.8a.6.6 0 0 1-.6-.6zm3.6-.6a.6.6 0 0 0-.6.6v.8a.6.6 0 0 0 .6.6h.8a.6.6 0 0 0 .6-.6v-.8a.6.6 0 0 0-.6-.6zM12 11.6a.6.6 0 0 1 .6-.6h.8a.6.6 0 0 1 .6.6v.8a.6.6 0 0 1-.6.6h-.8a.6.6 0 0 1-.6-.6zm3.6-.6a.6.6 0 0 0-.6.6v.8a.6.6 0 0 0 .6.6h.8a.6.6 0 0 0 .6-.6v-.8a.6.6 0 0 0-.6-.6zM12 14.6a.6.6 0 0 1 .6-.6h.8a.6.6 0 0 1 .6.6v.8a.6.6 0 0 1-.6.6h-.8a.6.6 0 0 1-.6-.6zm3.6-.6a.6.6 0 0 0-.6.6v.8a.6.6 0 0 0 .6.6h.8a.6.6 0 0 0 .6-.6v-.8a.6.6 0 0 0-.6-.6zM7 12.6a.6.6 0 0 1 .6-.6h.8a.6.6 0 0 1 .6.6v.8a.6.6 0 0 1-.6.6h-.8a.6.6 0 0 1-.6-.6zm.6 2.4a.6.6 0 0 0-.6.6v.8a.6.6 0 0 0 .6.6h.8a.6.6 0 0 0 .6-.6v-.8a.6.6 0 0 0-.6-.6z"
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
export default SvgBuilding;
