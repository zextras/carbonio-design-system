import * as React from 'react';
import type { SVGProps } from 'react';

const SvgUnflag = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M4.706 3.287a1.003 1.003 0 1 0-1.419 1.418L19.271 20.69a1 1 0 0 0 1.419 0 1 1 0 0 0 0-1.419zM3.996 6.786l10.036 10.036a10.1 10.1 0 0 1-2.413-.768 8.5 8.5 0 0 0-3.127-.779 6.3 6.3 0 0 0-2.498.41v4.295c0 .549-.45 1-.999 1s-.999-.451-.999-1zm2.11-3.51c.608-.16 1.391-.279 2.386-.279 1.337.052 2.651.367 3.866.93.983.455 2.044.72 3.127.778a7.5 7.5 0 0 0 2.168-.28 1.77 1.77 0 0 1 2.328 1.678v8.633a1.74 1.74 0 0 1-.912 1.504z" />
	</svg>
);
export default SvgUnflag;
