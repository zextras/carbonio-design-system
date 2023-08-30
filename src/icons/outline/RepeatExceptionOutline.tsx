import * as React from 'react';
import type { SVGProps } from 'react';

const SvgRepeatExceptionOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
		<g clipPath="url(#a)">
			<path d="M6.09 19h12l-1.3 1.29a1.004 1.004 0 1 0 1.42 1.42l3-3a1.002 1.002 0 0 0 0-1.42l-3-3a1.002 1.002 0 0 0-1.639.325 1 1 0 0 0 .219 1.095l1.3 1.29h-12a1.559 1.559 0 0 1-1.59-1.53V13a1 1 0 1 0-2 0v2.47A3.56 3.56 0 0 0 6.09 19ZM5.79 9.71a1.004 1.004 0 0 0 1.42-1.42L5.91 7h12a1.56 1.56 0 0 1 1.59 1.53V11a1 1 0 1 0 2 0V8.53A3.56 3.56 0 0 0 17.91 5h-12l1.3-1.29a1 1 0 0 0 0-1.42 1 1 0 0 0-1.42 0l-3 3a1 1 0 0 0 0 1.42l3 3Z" />
			<path d="M12 16a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM12 8c-.265 0-.52.088-.707.244a.77.77 0 0 0-.293.59v3.333a.77.77 0 0 0 .293.589c.187.156.442.244.707.244.265 0 .52-.088.707-.244a.77.77 0 0 0 .293-.59V8.834a.77.77 0 0 0-.293-.589A1.11 1.11 0 0 0 12 8Z" />
		</g>
		<defs>
			<clipPath id="a">
				<path d="M0 0h24v24H0z" />
			</clipPath>
		</defs>
	</svg>
);
export default SvgRepeatExceptionOutline;
