import * as React from 'react';
import { SVGProps } from 'react';

const SvgEmailedContactOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M9.016 11c2.194 0 4-1.806 4-4s-1.806-4-4-4c-2.195 0-4 1.806-4 4s1.805 4 4 4Zm0-6c1.097 0 2 .903 2 2s-.903 2-2 2c-1.098 0-2-.903-2-2s.902-2 2-2ZM9.588 13.024A6.945 6.945 0 0 0 9.016 13c-3.84 0-7 3.16-7 7 0 .549.451 1 1 1 .548 0 1-.451 1-1 0-2.743 2.257-5 5-5 .138 0 .276.006.412.017V18.9a2.11 2.11 0 0 0 2.092 2.092h8.368A2.11 2.11 0 0 0 21.98 18.9v-5.084c0-1.236-.856-2.092-1.997-2.092H11.52c-.862 0-1.615.543-1.932 1.3Zm1.932 1.363 3.803 3.043c.286.19.761.19 1.046 0l3.614-2.92v4.102c0 .19-.19.38-.38.38h-7.798a.41.41 0 0 1-.38-.38V14.32l.095.066Zm2.366-.656h3.89l-1.94 1.582-1.95-1.582Z" />
	</svg>
);
export default SvgEmailedContactOutline;
