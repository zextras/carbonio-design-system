import * as React from 'react';
import { SVGProps } from 'react';

const SvgUnflagOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M4.706 3.287a1.003 1.003 0 1 0-1.419 1.418L19.271 20.69a.999.999 0 0 0 1.419 0 1 1 0 0 0 0-1.419L4.706 3.287ZM3.996 6.88 5.994 8.88v4.688a9.492 9.492 0 0 1 2.498-.29c.758.03 1.508.144 2.238.337l3.185 3.186a10.13 10.13 0 0 1-2.296-.746 8.534 8.534 0 0 0-3.127-.779 6.275 6.275 0 0 0-2.498.41v4.295c0 .549-.45 1-.999 1-.548 0-.999-.451-.999-1V6.88Zm2.13-3.609c.606-.158 1.383-.274 2.366-.274 1.337.052 2.651.367 3.866.93.983.455 2.044.72 3.127.778a7.52 7.52 0 0 0 2.168-.28 1.77 1.77 0 0 1 2.328 1.678v8.633a1.741 1.741 0 0 1-.895 1.494l-1.104-1.092V6.404a9.4 9.4 0 0 1-2.497.3 10.333 10.333 0 0 1-3.866-.92 8.35 8.35 0 0 0-3.127-.789 6.139 6.139 0 0 0-.635.007L6.143 3.287l-.016-.016Z" />
	</svg>
);

export default SvgUnflagOutline;
