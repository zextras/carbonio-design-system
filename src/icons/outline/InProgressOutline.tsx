import * as React from 'react';
import { SVGProps } from 'react';

const SvgInProgressOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M11.383 2.037c.331-.02 1-.03 1-.03 5.313.203 9.62 4.634 9.62 9.993 0 5.085-3.88 9.335-8.815 9.929 0 0-.855.047-1.287.043a.987.987 0 0 1 .017-1.973 7.947 7.947 0 0 0 1.743-.178c.024-.005.049-.01.074-.013 3.568-.8 6.268-4.014 6.268-7.808 0-4.24-3.372-7.755-7.559-7.988v-.008a7.918 7.918 0 0 0-.94.002.987.987 0 0 1-.12-1.97ZM8.523 19.21a7.935 7.935 0 0 1-1.486-.926.987.987 0 0 0-1.222 1.55 9.91 9.91 0 0 0 1.856 1.155.987.987 0 0 0 .852-1.78Zm-3.687-3.628a8.049 8.049 0 0 1-.611-1.644.987.987 0 0 0-1.913.481c.179.71.434 1.397.76 2.047a.987.987 0 0 0 1.764-.884Zm-.702-5.125a8.1 8.1 0 0 1 .524-1.674.987.987 0 0 0-1.808-.79 10.055 10.055 0 0 0-.652 2.083.987.987 0 0 0 1.936.381Zm2.582-4.482a8.05 8.05 0 0 1 1.44-1.003.987.987 0 0 0-.945-1.732c-.64.349-1.24.767-1.792 1.249a.987.987 0 0 0 1.297 1.486Z"
		/>
		<path d="m14.701 8.391-3.78 5-1.63-2.11a1.002 1.002 0 0 0-1.58 1.23l2.43 3.11a1 1 0 0 0 1.58-.01l4.57-6a1.006 1.006 0 0 0-1.6-1.22h.01Z" />
	</svg>
);

export default SvgInProgressOutline;