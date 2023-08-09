import * as React from 'react';
import { SVGProps } from 'react';

const SvgFileMessage = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M19.72 7.323c.167.183.26.422.26.67V19.48a2.54 2.54 0 0 1-2.527 2.498H6.523a2.54 2.54 0 0 1-2.527-2.498V4.496a2.54 2.54 0 0 1 2.528-2.498h8.022a1 1 0 0 1 .74.33l4.435 4.995ZM15.22 11.41H8.777c-.801 0-1.46.659-1.46 1.46v4.495c0 .8.659 1.46 1.46 1.46h6.442c.801 0 1.46-.66 1.46-1.46V12.87c0-.801-.659-1.46-1.46-1.46Zm0 6.441H8.777a.49.49 0 0 1-.487-.486v-4.373l3.416 2.702a.488.488 0 0 0 .584 0l3.416-2.702v4.373a.49.49 0 0 1-.487.486Zm-.326-5.468-2.895 2.313-2.895-2.313h5.79Zm-.907-8.388 3.737 3.996h-2.997a.792.792 0 0 1-.74-.849V3.996Z"
		/>
	</svg>
);
export default SvgFileMessage;
