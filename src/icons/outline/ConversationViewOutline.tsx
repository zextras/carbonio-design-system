import * as React from 'react';
import type { SVGProps } from 'react';

const SvgConversationViewOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path
			fillRule="evenodd"
			d="M16.016 11.969a.984.984 0 0 1 0 1.967H7.96a.984.984 0 0 1 0-1.967zM16.016 8.067a.984.984 0 0 1 0 1.967H7.96a.984.984 0 0 1 0-1.967z"
			clipRule="evenodd"
		/>
		<path d="M18.982 2.997a3.01 3.01 0 0 1 2.997 2.997V20.98a1.002 1.002 0 0 1-1.509.859l-4.812-2.857H8.542a1 1 0 0 0-.55.14l-4.485 2.717a.998.998 0 0 1-1.509-.86V5.995a3.01 3.01 0 0 1 2.997-2.997zm0 13.986c.548 0 .999-.45.999-.999v-9.99c0-.548-.451-.999-1-.999H4.996c-.548 0-.999.451-.999 1V19.21l2.997-1.798a3 3 0 0 1 1.549-.43z" />
	</svg>
);
export default SvgConversationViewOutline;
