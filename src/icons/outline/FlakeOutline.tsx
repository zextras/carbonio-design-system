import * as React from 'react';
import { SVGProps } from 'react';

const SvgFlakeOutline = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M9.638 3.215c.449-.657 1.348-1.154 2.35-1.154 1.003 0 1.902.497 2.351 1.154.718-.345 1.745-.326 2.613.176.868.5 1.398 1.38 1.459 2.175.794.06 1.674.59 2.175 1.458.501.868.52 1.896.176 2.614.657.449 1.154 1.348 1.154 2.35 0 1.003-.497 1.902-1.154 2.351.344.718.325 1.745-.176 2.613-.501.868-1.38 1.398-2.175 1.459-.06.794-.59 1.674-1.459 2.175-.868.501-1.895.52-2.613.176-.45.657-1.348 1.154-2.35 1.154-1.003 0-1.902-.497-2.351-1.154-.718.344-1.746.325-2.614-.176-.867-.501-1.398-1.38-1.458-2.175-.794-.06-1.674-.59-2.175-1.459-.502-.868-.52-1.895-.176-2.613-.657-.45-1.154-1.348-1.154-2.35 0-1.003.497-1.902 1.154-2.351-.345-.718-.326-1.746.176-2.614.5-.867 1.38-1.398 2.175-1.458.06-.794.59-1.674 1.458-2.175.868-.502 1.896-.52 2.614-.176Zm-.852 1.773c.876.42 1.927.138 2.475-.663.135-.197.427-.298.727-.298.301 0 .593.1.728.298a1.967 1.967 0 0 0 2.474.663c.216-.103.518-.044.779.106.26.15.463.383.481.621a1.966 1.966 0 0 0 1.812 1.812c.238.018.47.22.62.48.151.261.21.564.107.78a1.967 1.967 0 0 0 .663 2.474c.197.135.297.427.297.727 0 .301-.1.593-.297.728a1.967 1.967 0 0 0-.663 2.474c.103.216.044.518-.106.779-.15.26-.383.463-.621.481a1.966 1.966 0 0 0-1.812 1.812c-.018.238-.22.47-.481.62-.26.151-.563.21-.779.107a1.967 1.967 0 0 0-2.474.663c-.135.197-.427.297-.728.297-.3 0-.592-.1-.727-.297a1.967 1.967 0 0 0-2.475-.663c-.215.103-.518.044-.778-.106s-.463-.383-.481-.621a1.966 1.966 0 0 0-1.812-1.812c-.238-.018-.47-.22-.621-.481-.15-.26-.21-.563-.106-.779a1.967 1.967 0 0 0-.663-2.474c-.197-.135-.298-.427-.298-.728 0-.3.1-.592.298-.727a1.967 1.967 0 0 0 .663-2.475c-.103-.215-.044-.518.106-.778s.383-.463.621-.481a1.966 1.966 0 0 0 1.812-1.812c.018-.238.22-.47.48-.621.261-.15.564-.21.78-.106Z"
		/>
	</svg>
);

export default SvgFlakeOutline;
