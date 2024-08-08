import * as React from 'react';
import type { SVGProps } from 'react';

const SvgMailFolderOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M19.492 20.501h-15a2.48 2.48 0 0 1-2.5-2.43V5.931a2.48 2.48 0 0 1 2.5-2.43h4.6a1 1 0 0 1 .77.37l2.6 3.18h7.06c1.34 0 2.449 1.09 2.47 2.43v8.59a2.48 2.48 0 0 1-2.5 2.43m.5-10.212-7.407 5.548a.99.99 0 0 1-1.181.003l-7.412-5.526v7.757a.46.46 0 0 0 .5.43h15l.041.002c.242 0 .444-.19.46-.432zM18.36 9.051h-6.367a1 1 0 0 1-.77-.37l-2.6-3.18h-4.13l-.04-.002a.46.46 0 0 0-.46.432V7.85l7.997 5.968z" />
	</svg>
);
export default SvgMailFolderOutline;
