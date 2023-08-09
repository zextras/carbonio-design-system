import * as React from 'react';
import { SVGProps } from 'react';

const SvgFileCheck = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="m19.748 8.331-5.44-6a1 1 0 0 0-.74-.33h-7.03a2.542 2.542 0 0 0-2.53 2.5v15a2.542 2.542 0 0 0 2.53 2.5h10.94a2.542 2.542 0 0 0 2.53-2.5v-10.5a1 1 0 0 0-.26-.67Zm-5.075 4.927a1.005 1.005 0 0 0-1.41.09l-1.87 2.15-.63-.71a1.003 1.003 0 0 0-1.5 1.33l1.39 1.56c.192.212.465.332.75.33a1 1 0 0 0 .74-.34l2.61-3a1.005 1.005 0 0 0-.08-1.41ZM17.658 9h-3.94a.794.794 0 0 1-.71-.85v-4.15h.11l4.54 5Z"
		/>
	</svg>
);
export default SvgFileCheck;
