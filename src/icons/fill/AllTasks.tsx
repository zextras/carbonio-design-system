import * as React from 'react';
import type { SVGProps } from 'react';

const SvgAllTasks = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M19.027 7a3.018 3.018 0 0 1 2.016 2.832L21.04 18c0 1.646-1.354 3-3 3H9.866c-1.296 0-2.411-.84-2.827-2h11c.549 0 1-.451 1-1l-.012-11ZM5.977 3h8.062c1.646 0 3 1.354 3 3v8.063c0 1.645-1.354 3-3 3H5.977c-1.646 0-3-1.355-3-3V6c0-1.646 1.354-3 3-3ZM12.7 7.78a1.005 1.005 0 0 0-1.41.09l-1.87 2.15-.63-.71a1.003 1.003 0 0 0-1.5 1.33l1.39 1.56a1 1 0 0 0 .75.33 1 1 0 0 0 .74-.34l2.61-3a1.005 1.005 0 0 0-.08-1.41Z" />
	</svg>
);
export default SvgAllTasks;
