import * as React from 'react';
import { SVGProps } from 'react';

const SvgAddressBookShareWithMe = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M18.992 3c1.646 0 3 1.354 3 3v12c0 1.646-1.354 3-3 3h-12c-1.646 0-3-1.354-3-3v-1h-1c-.548 0-1-.451-1-1 0-.549.452-1 1-1h1V9h-1c-.548 0-1-.451-1-1 0-.549.452-1 1-1h1V6c0-1.646 1.354-3 3-3h12Zm-9.457 8.631a1 1 0 0 1 .21-.32l2.016-2.015a1 1 0 0 1 1.42 0 1 1 0 0 1 0 1.42l-.316.305H15.5c.549 0 1 .452 1 1 0 .549-.451 1-1 1h-2.705l.4.481a1.001 1.001 0 0 1-1.45 1.38l-2.03-2.17a1.006 1.006 0 0 1-.09-.13.818.818 0 0 1-.17-.46v-.1a1 1 0 0 1 .08-.39Z"
		/>
	</svg>
);
export default SvgAddressBookShareWithMe;
