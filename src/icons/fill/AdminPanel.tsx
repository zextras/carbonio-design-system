import * as React from 'react';
import type { SVGProps } from 'react';

const SvgAdminPanel = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
		<path d="M19.005 7.945a2.988 2.988 0 0 0 2.974-2.973 2.988 2.988 0 0 0-2.974-2.974 2.988 2.988 0 0 0-2.974 2.974 2.988 2.988 0 0 0 2.974 2.973ZM19.005 9.015a2.988 2.988 0 0 0-2.974 2.973 2.988 2.988 0 0 0 2.974 2.974 2.988 2.988 0 0 0 2.974-2.974 2.988 2.988 0 0 0-2.974-2.973ZM19.005 16.031a2.988 2.988 0 0 0-2.974 2.974 2.988 2.988 0 0 0 2.974 2.973 2.988 2.988 0 0 0 2.974-2.973 2.988 2.988 0 0 0-2.974-2.974ZM6.01 12.761V2.997c0-.548-.451-.999-1-.999-.547 0-.998.451-.998 1v9.763a3.003 3.003 0 0 0-1.975 2.818c0 1.258.792 2.388 1.975 2.817v2.584c0 .548.45.998.999.998.548 0 .999-.45.999-.998v-2.584a3.003 3.003 0 0 0 1.974-2.818 3.003 3.003 0 0 0-1.974-2.817ZM10.919 11.215v9.765c0 .548.45.998.999.998.548 0 .999-.45.999-.998v-9.765a3.003 3.003 0 0 0 1.975-2.817 3.003 3.003 0 0 0-1.975-2.817V2.997c0-.548-.451-.999-.999-.999s-.999.451-.999 1V5.58a3.003 3.003 0 0 0-1.975 2.817c0 1.258.792 2.388 1.975 2.817Z" />
	</svg>
);
export default SvgAdminPanel;
