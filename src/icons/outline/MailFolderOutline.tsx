import * as React from 'react';
import { SVGProps } from 'react';

const SvgMailFolderOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M19.492 20.501h-15a2.482 2.482 0 0 1-2.5-2.43V5.931a2.482 2.482 0 0 1 2.5-2.43h4.6a1 1 0 0 1 .77.37l2.6 3.18h7.06c1.34 0 2.449 1.09 2.47 2.43v8.59a2.482 2.482 0 0 1-2.5 2.43Zm.5-10.212-7.407 5.548a.987.987 0 0 1-1.181.003l-7.412-5.526v7.757a.462.462 0 0 0 .5.43h15a.462.462 0 0 0 .5-.43V10.29ZM18.36 9.051h-6.367a1 1 0 0 1-.77-.37l-2.6-3.18h-4.13a.462.462 0 0 0-.5.43V7.85l7.997 5.968 6.37-4.766Z" />
	</svg>
);
export default SvgMailFolderOutline;
