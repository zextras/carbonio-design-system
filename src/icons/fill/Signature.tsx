import * as React from 'react';
import type { SVGProps } from 'react';

const SvgSignature = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path
			fillRule="evenodd"
			d="m11.975 14.11-2.58 1.732a4.006 4.006 0 0 0-5.078 2.891h-.003l-.308 1.561a.984.984 0 0 1-1.93-.38l1.692-8.592.013-.054.032-.175c1.064-5.402 6.313-8.923 11.715-7.86a9.94 9.94 0 0 1 6.354 4.23l-5.006 3.359-.009-.014-1.402-2.09-.012-.018-.938-1.398a.984.984 0 0 0-1.634 1.096l1.402 2.09.013.018.938 1.398.01.014-1.67 1.119a1 1 0 0 0-.093-.176l-.869-1.173-.034-.055-1.964-2.652a.984.984 0 0 0-1.634 1.096l.869 1.172q.015.03.035.056l1.964 2.652q.056.085.127.153M21.963 20.09a.984.984 0 0 0-.983-.984H6.93a.984.984 0 0 0 0 1.967h14.05c.542 0 .983-.44.983-.983"
			clipRule="evenodd"
		/>
		<path
			fillRule="evenodd"
			d="M20.98 19.106a.984.984 0 0 1 0 1.967H6.93a.984.984 0 0 1 0-1.967z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgSignature;
