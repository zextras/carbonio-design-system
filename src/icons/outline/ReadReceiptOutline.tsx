import * as React from 'react';
import { SVGProps } from 'react';

const SvgReadReceiptOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M20.98 10.82c-.549 0-1 .45-1 .998v5.565c0 .329-.27.6-.599.6H4.596c-.33 0-.6-.271-.6-.6V6.593c0-.328.27-.599.6-.599h11.558c.548 0 1-.45 1-.999 0-.548-.452-.999-1-.999H4.596a2.62 2.62 0 0 0-2.598 2.598v10.789a2.62 2.62 0 0 0 2.598 2.598H19.38a2.62 2.62 0 0 0 2.598-2.598v-5.564c0-.549-.451-1-1-1Z" />
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M11.963 12.877 19.32 5.52a1 1 0 0 1 1.413 1.412l-8.063 8.064a1 1 0 0 1-1.413 0l-3.532-3.532a1 1 0 0 1 1.413-1.413l2.825 2.825Z"
		/>
	</svg>
);

export default SvgReadReceiptOutline;
