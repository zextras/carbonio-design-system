import * as React from 'react';
import type { SVGProps } from 'react';

const SvgConsoleOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M17.982 2.997H5.994a3.01 3.01 0 0 0-2.997 2.997v11.988a3.01 3.01 0 0 0 2.997 2.998h11.988a3.01 3.01 0 0 0 2.998-2.998V5.994a3.01 3.01 0 0 0-2.998-2.997m1 14.985c0 .549-.451 1-1 1H5.994c-.548 0-.999-.451-.999-1V8.976h13.987zM4.995 6.978v-.984c0-.548.451-.999 1-.999h11.987c.549 0 1 .451 1 1v.983z" />
		<path d="M7.977 17.05a1 1 0 0 1-.71-1.709l1.409-1.32-1.257-1.34a1 1 0 1 1 1.419-1.409l1.936 2.03a1.003 1.003 0 0 1 0 1.399L8.676 16.73a1 1 0 0 1-.7.32" />
		<path
			fillRule="evenodd"
			d="M16.063 15.083a.984.984 0 0 1 0 1.967h-2.998a.984.984 0 0 1 0-1.967z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgConsoleOutline;
