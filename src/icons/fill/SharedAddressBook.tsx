import * as React from 'react';
import type { SVGProps } from 'react';

const SvgSharedAddressBook = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path
			fillRule="evenodd"
			d="M19 3c1.646 0 3 1.354 3 3v12c0 1.646-1.354 3-3 3H7c-1.646 0-3-1.354-3-3v-1H3c-.549 0-1-.451-1-1s.451-1 1-1h1V9H3c-.549 0-1-.451-1-1s.451-1 1-1h1V6c0-1.646 1.354-3 3-3zm-6.05 6.119a1.972 1.972 0 0 1 1.933-2.348 1.97 1.97 0 1 1-.634 3.833l-1.16 1.014a2 2 0 0 1 0 .76l1.161 1.018q.3-.104.633-.105a1.97 1.97 0 0 1 0 3.938 1.97 1.97 0 0 1-1.932-2.35l-1.162-1.017a1.97 1.97 0 1 1 .002-3.73z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgSharedAddressBook;
