import * as React from 'react';
import { SVGProps } from 'react';

const SvgReInviteOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M15.45 13.464a1 1 0 0 1-.21.32l-2.016 2.015a1 1 0 0 1-1.42 0 1 1 0 0 1 0-1.42l.315-.305H9.484c-.548 0-1-.452-1-1 0-.549.452-1 1-1h2.705l-.4-.48a1 1 0 1 1 1.45-1.38l2.03 2.17c.034.04.064.084.09.13a.817.817 0 0 1 .17.46v.1a1 1 0 0 1-.08.39Z" />
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M15 3.001v1H9V3a1.005 1.005 0 0 0-1.249-.968c-.31.08-.57.314-.686.614A1.006 1.006 0 0 0 7 3.001v1H6C4.354 4 3 5.355 3 7v12c0 1.646 1.354 3 3 3h12c1.646 0 3-1.354 3-3v-12c0-1.646-1.354-3-3-3h-1V3c0-.549-.451-1-1-1-.549 0-1 .451-1 1Zm4 16c0 .548-.451 1-1 1H6c-.109 0-.216-.018-.32-.053a1.006 1.006 0 0 1-.68-.947v-12c0-.549.451-1 1-1h1v1c0 .549.451 1 1 1 .549 0 1-.451 1-1V6h6v1c0 .549.451 1 1 1 .549 0 1-.451 1-1V6h1c.549 0 1 .451 1 1v12Z"
		/>
	</svg>
);
export default SvgReInviteOutline;
