import * as React from 'react';
import type { SVGProps } from 'react';

const SvgSharedAccount = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M9.007 10.99c2.192 0 3.996-1.805 3.996-3.997s-1.804-3.996-3.996-3.996S5.01 4.801 5.01 6.993s1.804 3.996 3.996 3.996M9.007 12.987c-3.836 0-6.993 3.157-6.993 6.993 0 .549.45 1 .999 1H15c.548 0 .999-.451.999-1 0-3.836-3.157-6.993-6.993-6.993" />
		<path
			fillRule="evenodd"
			d="M18.044 5.81a1.97 1.97 0 0 1 1.93-2.345 1.968 1.968 0 1 1-.633 3.83l-1.16 1.013a2 2 0 0 1 0 .759l1.16 1.016q.3-.102.633-.104a1.968 1.968 0 0 1 0 3.934 1.968 1.968 0 0 1-1.93-2.347l-1.161-1.016q-.298.102-.632.104a1.968 1.968 0 1 1 .633-3.83z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgSharedAccount;
