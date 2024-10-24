import * as React from 'react';
import type { SVGProps } from 'react';

const SvgFlagOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g data-name="Layer 2">
			<path
				d="M19.27 4.68a1.79 1.79 0 0 0-1.6-.25 7.5 7.5 0 0 1-2.17.28 8.5 8.5 0 0 1-3.13-.78A10.2 10.2 0 0 0 8.5 3c-2.89 0-4 1-4.2 1.14a1 1 0 0 0-.3.72V20a1 1 0 0 0 2 0v-4.3a6.3 6.3 0 0 1 2.5-.41 8.5 8.5 0 0 1 3.13.78 10.2 10.2 0 0 0 3.87.93 7.66 7.66 0 0 0 3.5-.7 1.74 1.74 0 0 0 1-1.55V6.11a1.77 1.77 0 0 0-.73-1.43M18 14.59a6.3 6.3 0 0 1-2.5.41 8.4 8.4 0 0 1-3.13-.79 10.3 10.3 0 0 0-3.87-.92 9.5 9.5 0 0 0-2.5.29V5.42A6.1 6.1 0 0 1 8.5 5a8.4 8.4 0 0 1 3.13.79 10.3 10.3 0 0 0 3.87.92 9.4 9.4 0 0 0 2.5-.3z"
				data-name="flag"
			/>
		</g>
	</svg>
);
export default SvgFlagOutline;
