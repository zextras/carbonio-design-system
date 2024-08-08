import * as React from 'react';
import type { SVGProps } from 'react';

const SvgDismissOutline = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M20.5 15.195 18.7 13.387V8.931c.05-3.405-2.447-6.357-5.814-6.873a7 7 0 0 0-.88-.058C8.32 2 5.282 5.032 5.276 8.722v4.665l-1.799 1.808c-.301.307-.47.72-.47 1.15 0 .895.734 1.633 1.63 1.638h3.356v.34a3.854 3.854 0 0 0 3.996 3.656 3.854 3.854 0 0 0 3.996-3.657v-.34h3.357a1.646 1.646 0 0 0 1.629-1.638c0-.43-.169-.842-.47-1.149m-6.514 3.127a1.886 1.886 0 0 1-1.998 1.659 1.886 1.886 0 0 1-1.998-1.659v-.34h3.996zm-8.482-2.337 1.18-1.18c.377-.375.589-.886.589-1.418V8.722A4.73 4.73 0 0 1 8.89 5.165a4.67 4.67 0 0 1 3.736-1.169 4.87 4.87 0 0 1 4.076 4.895v4.496a2 2 0 0 0 .58 1.419l1.189 1.179zm9.191-7.728a1 1 0 0 0-1.418 0l-1.29 1.298L10.7 8.257a1.003 1.003 0 1 0-1.418 1.418l1.298 1.289-1.298 1.289a1 1 0 0 0 0 1.418 1 1 0 0 0 1.418 0l1.289-1.298 1.289 1.298a1 1 0 0 0 1.418 0 1 1 0 0 0 0-1.418l-1.299-1.289 1.3-1.289a1 1 0 0 0 0-1.418" />
	</svg>
);
export default SvgDismissOutline;
