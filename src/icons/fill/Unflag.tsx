import * as React from 'react';
import { SVGProps } from 'react';

const SvgUnflag = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M4.706 3.287a1.003 1.003 0 1 0-1.419 1.418L19.271 20.69a.999.999 0 0 0 1.419 0 1 1 0 0 0 0-1.419L4.706 3.287ZM3.996 6.786l10.036 10.036a10.13 10.13 0 0 1-2.413-.768 8.534 8.534 0 0 0-3.127-.779 6.275 6.275 0 0 0-2.498.41v4.295c0 .549-.45 1-.999 1-.548 0-.999-.451-.999-1V6.786Zm2.11-3.51c.608-.16 1.391-.279 2.386-.279 1.337.052 2.651.367 3.866.93.983.455 2.044.72 3.127.778a7.52 7.52 0 0 0 2.168-.28 1.77 1.77 0 0 1 2.328 1.678v8.633a1.74 1.74 0 0 1-.912 1.504L6.106 3.277Z" />
	</svg>
);

export default SvgUnflag;
