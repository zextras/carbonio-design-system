import * as React from 'react';
import { SVGProps } from 'react';

const SvgEmailedContact = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M12.606 6.903A3.919 3.919 0 0 1 8.7 10.81a3.919 3.919 0 0 1-3.907-3.907A3.919 3.919 0 0 1 8.7 2.996a3.919 3.919 0 0 1 3.907 3.907Zm3.307 8.89-4.916-4.04a1.51 1.51 0 0 1 .282-.029h9.268c.095 0 .19.01.282.028l-4.916 4.04Zm-6.258-2.58 5.62 4.619a.985.985 0 0 0 .638.225.985.985 0 0 0 .638-.225l5.43-4.463v5.903c0 .956-.67 1.72-1.53 1.72h-9.267c-.86 0-1.529-.765-1.529-1.72v-6.06Zm-7.643 6.823c0-3.217 2.591-5.933 5.663-6.583v7.539H2.967c-.478 0-.955-.478-.955-.956Z"
		/>
	</svg>
);
export default SvgEmailedContact;
