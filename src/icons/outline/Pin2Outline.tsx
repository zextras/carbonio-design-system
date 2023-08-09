import * as React from 'react';
import { SVGProps } from 'react';

const SvgPin2Outline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M11.89 3.072a7.334 7.334 0 0 0-5.23 2.26c-2.841 2.979-2.797 7.743.098 10.67l4.597 4.607a.934.934 0 0 0 .704.297.991.991 0 0 0 .704-.307l4.517-4.677c2.843-2.977 2.804-7.74-.089-10.67a7.265 7.265 0 0 0-5.3-2.18Zm.13 15.427-3.855-3.884c-2.15-2.175-2.181-5.715-.07-7.926a5.383 5.383 0 0 1 3.795-1.635 5.373 5.373 0 0 1 3.864 1.595c2.158 2.173 2.185 5.721.06 7.926l-3.795 3.924Z" />
	</svg>
);
export default SvgPin2Outline;
