import * as React from 'react';
import type { SVGProps } from 'react';

const SvgBugOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path
			fillRule="evenodd"
			d="m17.574 4.244 1.942-1.942a.98.98 0 0 1 1.383 0l.007.007a.98.98 0 0 1 0 1.388l-2.04 2.04c1.033 1.473 1.71 3.29 1.88 5.28h1.033c.539 0 .977.437.977.977v.01c0 .541-.44.981-.982.981h-1.029c-.174 2.041-.883 3.903-1.963 5.396l1.927 1.927c.381.381.381 1 0 1.382l-.007.007a.98.98 0 0 1-1.388 0l-1.845-1.845c-1.475 1.336-3.335 2.132-5.355 2.132-2.086 0-4-.849-5.498-2.264l-1.978 1.978a.98.98 0 0 1-1.382 0l-.007-.007a.98.98 0 0 1 0-1.388l2.082-2.082c-1.016-1.466-1.681-3.268-1.849-5.238H2.447a.98.98 0 0 1-.977-.977v-.01c0-.541.44-.981.981-.981h1.031c.168-1.97.834-3.772 1.85-5.238L3.249 3.692a.98.98 0 0 1 0-1.382l.007-.007a.98.98 0 0 1 1.388 0l1.975 1.975c1.496-1.413 3.41-2.262 5.496-2.262 2.068 0 3.968.835 5.46 2.228M6.339 7.93A9.2 9.2 0 0 0 5.413 12c0 4.352 2.92 8.012 6.7 8.012s6.701-3.66 6.701-8.012c0-1.475-.335-2.87-.926-4.07h-4.904v9.126a.985.985 0 0 1-1.969 0V7.929zM16.526 5.96H7.702c1.167-1.223 2.701-1.972 4.412-1.972s3.244.75 4.412 1.972"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgBugOutline;
