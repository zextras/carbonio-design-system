import * as React from 'react';
import type { SVGProps } from 'react';

const SvgBug = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path
			fillRule="evenodd"
			d="M4.193 7.93h6.822v9.126a.985.985 0 0 0 1.969 0V7.929h7.05c.373.96.619 1.998.711 3.088h1.034c.539 0 .977.437.977.977v.01c0 .541-.44.981-.982.981h-1.029c-.174 2.041-.883 3.903-1.963 5.396l1.927 1.927c.381.381.381 1 0 1.382l-.007.007a.98.98 0 0 1-1.388 0l-1.845-1.845c-1.475 1.336-3.335 2.132-5.355 2.132-2.086 0-4-.849-5.498-2.264l-1.978 1.978a.98.98 0 0 1-1.382 0l-.007-.007a.98.98 0 0 1 0-1.388l2.082-2.082c-1.016-1.466-1.681-3.268-1.849-5.238H2.447a.98.98 0 0 1-.977-.977v-.01c0-.541.44-.981.981-.981h1.031a11.1 11.1 0 0 1 .71-3.086m1.016-1.97q.06-.091.124-.183L3.248 3.692a.98.98 0 0 1 0-1.382l.007-.007a.98.98 0 0 1 1.388 0l1.975 1.975c1.496-1.413 3.41-2.262 5.496-2.262s4.004.85 5.5 2.267l1.982-1.981a.98.98 0 0 1 1.382 0l.007.007a.98.98 0 0 1 0 1.388L18.9 5.783l.12.177z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgBug;
