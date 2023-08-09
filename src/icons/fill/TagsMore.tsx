import * as React from 'react';
import type { SVGProps } from 'react';

const SvgTagsMore = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path
			fillRule="evenodd"
			d="m4.119 13.16-.08.08a1.733 1.733 0 0 0 0 2.448L8.61 20.26a1.733 1.733 0 0 0 2.45 0l9.504-9.505c.327-.326.496-.751.507-1.18.011-.068.017-.139.017-.211V4.465c0-.692-.562-1.255-1.254-1.255h-4.898c-.072 0-.143.007-.212.018-.428.011-.853.18-1.18.507l-.578.578-8.794 2.356a1.78 1.78 0 0 0-.53.244c-.428.292-.71.78-.749 1.296-.014.196.005.391.055.581l1.17 4.37Zm6.066-6.066-4.46 4.46-.817-3.046 5.277-1.414Zm6.605-.568a.984.984 0 1 0 0 1.967.984.984 0 0 0 0-1.967Z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgTagsMore;
