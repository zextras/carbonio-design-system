import * as React from 'react';
import { SVGProps } from 'react';

const SvgTagsMoreOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M16.467 8.492a.983.983 0 1 0 0-1.966.983.983 0 0 0 0 1.966Z" />
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M14.614 3.21a1.26 1.26 0 0 0-.212.018c-.428.011-.853.18-1.18.507l-.578.578L3.85 6.669a1.78 1.78 0 0 0-.53.244c-.428.292-.71.78-.749 1.296-.014.196.005.391.054.581l1.171 4.37-.079.08a1.733 1.733 0 0 0 0 2.448l4.571 4.571a1.733 1.733 0 0 0 2.45 0l9.504-9.505c.327-.326.496-.751.506-1.18.012-.068.018-.139.018-.211V4.465c0-.692-.562-1.255-1.254-1.255h-4.898Zm.043 1.967H18.8V9.32l-.009.064-.003.043-9.275 9.275-4.239-4.238 9.276-9.276.043-.002.064-.009Z"
		/>
	</svg>
);
export default SvgTagsMoreOutline;
