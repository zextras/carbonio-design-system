import * as React from 'react';
import { SVGProps } from 'react';

const SvgSpellCheck = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M18.347 11.934c.041.004.052.004.093.011.431.08.74.57.605 1.001a.783.783 0 0 1-.13.25c-.026.033-.034.04-.063.07l-4.803 4.803c-.106.1-.13.108-.19.14a.798.798 0 0 1-.844-.078c-.033-.026-.04-.033-.07-.062l-2.46-2.458c-.273-.291-.295-.773-.032-1.07a.809.809 0 0 1 1.067-.098c.033.026.04.034.07.063l1.907 1.906 4.25-4.25.034-.033a.833.833 0 0 1 .566-.195ZM7.34 10.726l-1.634 3.306-.025.046c-.271.433-.951.512-1.285.097a.795.795 0 0 1-.13-.739c.014-.044.02-.054.039-.096l4.293-8.685a.821.821 0 0 1 .752-.433.828.828 0 0 1 .649.433l4.327 8.752c.019.042.025.052.04.096a.807.807 0 0 1-.371.938c-.367.197-.864.041-1.07-.342l-1.667-3.372a.746.746 0 0 1-.114.011H7.459a.705.705 0 0 1-.118-.012Zm.766-1.55h2.385L9.3 6.764 8.107 9.176Z"
		/>
	</svg>
);
export default SvgSpellCheck;
