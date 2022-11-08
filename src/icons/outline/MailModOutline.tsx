import * as React from 'react';
import { SVGProps } from 'react';

const SvgMailModOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M9.89 9.656a1.268 1.268 0 1 1-2.535-.002 1.268 1.268 0 0 1 2.535.002ZM17.203 9.562a1.548 1.548 0 0 1-3.093 0 1.548 1.548 0 0 1 3.093 0ZM13.828 11.999a1.829 1.829 0 1 1-3.658 0 1.829 1.829 0 0 1 3.658 0Z"
		/>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M4.276 4.003A2.277 2.277 0 0 0 2 6.283v11.484a2.277 2.277 0 0 0 2.276 2.28h15.448A2.277 2.277 0 0 0 22 17.766V6.28A2.277 2.277 0 0 0 19.724 4l-15.448.003Zm.267 2.185a.353.353 0 0 0-.352.352V17.5c0 .194.158.352.352.352h14.92a.353.353 0 0 0 .352-.352V6.543a.353.353 0 0 0-.352-.352l-14.92-.003Z"
		/>
	</svg>
);

export default SvgMailModOutline;
