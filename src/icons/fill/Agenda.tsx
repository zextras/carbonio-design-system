import * as React from 'react';
import type { SVGProps } from 'react';

const SvgAgenda = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M18.982 20.98H6.993a3.01 3.01 0 0 1-2.997-2.998v-.999h-.999c-.548 0-.999-.45-.999-.999s.451-.999 1-.999h.998V8.991h-.999c-.548 0-.999-.45-.999-.999s.451-.999 1-.999h.998v-.999a3.01 3.01 0 0 1 2.997-2.997h11.989a3.01 3.01 0 0 1 2.997 2.997v11.988a3.01 3.01 0 0 1-2.997 2.998M15.903 8.382l-3.776 4.995-1.629-2.108a1 1 0 0 0-.789-.386c-.548 0-1 .452-1 1 0 .223.074.44.211.615l2.428 3.107a1 1 0 0 0 1.578-.01L17.492 9.6a1.005 1.005 0 1 0-1.599-1.22z" />
	</svg>
);
export default SvgAgenda;
