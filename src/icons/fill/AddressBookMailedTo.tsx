import * as React from 'react';
import type { SVGProps } from 'react';

const SvgAddressBookMailedTo = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
		<path
			fillRule="evenodd"
			d="M19 3c1.646 0 3 1.354 3 3v12c0 1.646-1.354 3-3 3H7c-1.646 0-3-1.354-3-3v-1H3c-.549 0-1-.451-1-1 0-.549.451-1 1-1h1V9H3c-.549 0-1-.451-1-1 0-.549.451-1 1-1h1V6c0-1.646 1.354-3 3-3h12ZM8 10a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-4Zm3.92 0h2.393l-1.276.798L11.921 10ZM10 14v-2.914l2.419 1.728a1 1 0 0 0 1.111.034L16 11.304V14h-6Z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgAddressBookMailedTo;
