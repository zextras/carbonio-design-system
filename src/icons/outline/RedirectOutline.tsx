import * as React from 'react';
import type { SVGProps } from 'react';

const SvgRedirectOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M5.595 20.98h12.787a2.71 2.71 0 0 0 2.598-2.778v-1.219c0-.548-.451-.999-1-.999-.547 0-.998.451-.998 1v1.218a.72.72 0 0 1-.6.78H5.595a.72.72 0 0 1-.6-.78V5.774a.72.72 0 0 1 .6-.779h1.398c.549 0 1-.45 1-.999s-.451-.999-1-.999H5.595a2.71 2.71 0 0 0-2.598 2.777v12.428a2.71 2.71 0 0 0 2.598 2.778" />
		<path d="M20.766 8.306 16.77 3.31a.999.999 0 0 0-1.558 1.24l2.697 3.376h-5.96a3.01 3.01 0 0 0-2.998 2.997v5.182c0 .549.451 1 1 1 .547 0 .998-.451.998-1v-5.182c0-.548.451-1 1-1h5.96l-2.697 3.378a1 1 0 0 0 .78 1.618 1 1 0 0 0 .778-.38l3.996-4.995a1 1 0 0 0 0-1.238" />
	</svg>
);
export default SvgRedirectOutline;
