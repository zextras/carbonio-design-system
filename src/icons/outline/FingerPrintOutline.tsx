import * as React from 'react';
import { SVGProps } from 'react';

const SvgFingerPrintOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M11.186 20.051v-.001a6.504 6.504 0 0 0 4.052-6.04v-.02a2.981 2.981 0 0 0-2.98-2.96 2.981 2.981 0 0 0-2.98 2.98.987.987 0 0 1-1.973 0 4.955 4.955 0 0 1 4.953-4.953 4.955 4.955 0 0 1 4.952 4.937v.016a8.537 8.537 0 0 1-5.276 7.886v-.001a.995.995 0 1 1-.748-1.844Zm9.904-6.041c0 1.904-.43 3.709-1.2 5.322a.987.987 0 0 1-1.78-.848 10.377 10.377 0 0 0 1.007-4.474c0-3.62-2.575-6.557-7.248-6.557A6.56 6.56 0 0 0 5.31 14.01a2.981 2.981 0 0 0 2.98 2.98 2.981 2.981 0 0 0 2.98-2.98.987.987 0 0 1 1.973 0 4.955 4.955 0 0 1-4.953 4.952A4.955 4.955 0 0 1 3.34 14.01c0-4.708 3.822-8.53 8.53-8.53 5.65 0 9.22 3.822 9.22 8.53ZM19.187 6.83c-1.8-1.955-4.453-2.828-7.318-2.828a9.825 9.825 0 0 0-7.247 3.182.987.987 0 0 1-1.451-1.337 11.792 11.792 0 0 1 8.698-3.817c3.438 0 6.608 1.117 8.77 3.464a.987.987 0 0 1-1.452 1.336Z"
		/>
	</svg>
);

export default SvgFingerPrintOutline;
