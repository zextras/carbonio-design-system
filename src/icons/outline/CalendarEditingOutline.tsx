import * as React from 'react';
import type { SVGProps } from 'react';

const SvgCalendarEditingOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M16 2a1 1 0 0 1 1 1v1h1a3 3 0 0 1 3 3v4.552l-.162-.011a2.88 2.88 0 0 0-1.93.678l-.094.085-.696.696H5v6a1 1 0 0 0 1 1h5.837a3 3 0 0 0-.033.23L11.62 22H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 2 0v1h6V3a1 1 0 0 1 1-1M8 15a1 1 0 1 1 0 2 1 1 0 0 1 0-2m8 0a1 1 0 0 1 .111.006L14.118 17H12a1 1 0 0 1 0-2zM6 6a1 1 0 0 0-1 1v4h14V7a1 1 0 0 0-1-1h-1v1a1 1 0 0 1-2 0V6H9v1a1 1 0 0 1-2 0V6z" />
		<path d="m23.588 15.296-1.884-1.883a1.375 1.375 0 0 0-1.829-.049l-6.187 6.188c-.223.224-.361.518-.392.832L13 23.25a.69.69 0 0 0 .688.749h.061l2.867-.261c.314-.032.608-.17.832-.392l6.188-6.188a1.32 1.32 0 0 0-.049-1.863m-2.338 2.297-1.843-1.843 1.341-1.375 1.877 1.877z" />
	</svg>
);
export default SvgCalendarEditingOutline;
