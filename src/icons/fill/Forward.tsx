import * as React from 'react';
import type { SVGProps } from 'react';

const SvgForward = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M3.8 21c-.5 0-.9-.3-1-.8-.2-.8-.3-1.7-.3-2.5 0-5.6 4.4-10.3 10-10.7V5.8c0-.7.4-1.4 1.1-1.6.7-.3 1.6-.2 2.2.3l5.1 4.4c0 .1.1.1.2.2.6.7.5 1.9-.2 2.5L15.8 16c-.6.5-1.4.6-2.1.3-.7-.3-1.1-.9-1.1-1.6v-1.1c-3.8.4-6.9 3-7.8 6.7-.1.4-.6.7-1 .7Z" />
	</svg>
);
export default SvgForward;
