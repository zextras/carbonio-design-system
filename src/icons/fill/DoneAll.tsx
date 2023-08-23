import * as React from 'react';
import type { SVGProps } from 'react';

const SvgDoneAll = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<g data-name="done-all">
				<path d="M16.62 6.21a1 1 0 0 0-1.41.17l-7 9-3.43-4.18a1 1 0 1 0-1.56 1.25l4.17 5.18a1 1 0 0 0 .78.37 1 1 0 0 0 .83-.38l7.83-10a1 1 0 0 0-.21-1.41zM21.62 6.21a1 1 0 0 0-1.41.17l-7 9-.61-.75-1.26 1.62 1.1 1.37a1 1 0 0 0 .78.37 1 1 0 0 0 .78-.38l7.83-10a1 1 0 0 0-.21-1.4z" />
				<path d="M8.71 13.06 10 11.44l-.2-.24a1 1 0 0 0-1.43-.2 1 1 0 0 0-.15 1.41z" />
			</g>
		</g>
	</svg>
);
export default SvgDoneAll;
