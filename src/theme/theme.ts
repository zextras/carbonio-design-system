/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { SVGProps } from 'react';

import IconData from '../icons';

export interface ThemeSizeObj<T = string> {
	small: T;
	medium: T;
	large: T;
}

export interface ThemeSizeObjExtended<T = string> extends ThemeSizeObj<T> {
	extrasmall: T;
	extralarge: T;
}

export interface ThemeColorObj {
	regular: string;
	hover: string;
	active: string;
	focus: string;
	disabled: string;
}

export type IconComponent = (props: SVGProps<SVGSVGElement>) => React.JSX.Element;

// augment this interface to extend theme type
export interface ThemeObj {
	windowObj: Window;
	breakpoints: {
		width: number;
		aspectRatio: number;
	};
	borderRadius: string;
	fonts: {
		default: string;
		weight: { light: number; regular: number; medium: number; bold: number };
	};
	sizes: {
		font: ThemeSizeObjExtended;
		icon: ThemeSizeObj;
		avatar: Omit<ThemeSizeObjExtended<{ diameter: string; font: string }>, 'extrasmall'>;
		padding: ThemeSizeObjExtended;
	};
	icons: Record<string, IconComponent>;
	loginBackground: string;
	logo?: {
		svg: IconComponent;
		size: ThemeSizeObj;
	};
	palette: Record<
		| 'currentColor'
		| 'transparent'
		| 'primary'
		| 'secondary'
		| 'header'
		| 'highlight'
		| 'gray0'
		| 'gray1'
		| 'gray2'
		| 'gray3'
		| 'gray4'
		| 'gray5'
		| 'gray6'
		| 'warning'
		| 'error'
		| 'success'
		| 'info'
		| 'text'
		/** @deprecated Use theme.shadows instead */
		| 'shadow'
		| 'successBanner'
		| 'warningBanner'
		| 'infoBanner'
		| 'errorBanner'
		| 'black'
		| 'white',
		ThemeColorObj
	>;
	avatarColors: Record<`avatar_${number}`, string>;
	shadows: Record<string, string>;
}

export const Theme: ThemeObj = {
	windowObj: window,
	breakpoints: {
		width: 960,
		aspectRatio: 2 / 3
	},
	borderRadius: '0.125rem',
	fonts: {
		default: "'Roboto', sans-serif",
		weight: { light: 300, regular: 400, medium: 500, bold: 700 }
	},
	sizes: {
		font: {
			extrasmall: '0.75rem',
			small: '0.875rem',
			medium: '1rem',
			large: '1.125rem',
			extralarge: '1.25rem'
		},
		icon: { small: '0.75rem', medium: '1rem', large: '1.5rem' },
		avatar: {
			small: { diameter: '1rem', font: '0.3125rem' },
			medium: { diameter: '2rem', font: '0.75rem' },
			large: { diameter: '3rem', font: '1.125rem' },
			extralarge: { diameter: '4rem', font: '1.75rem' }
		},
		padding: {
			extrasmall: '0.25rem',
			small: '0.5rem',
			medium: '0.75rem',
			large: '1rem',
			extralarge: '1.5rem'
		}
	},
	icons: {
		...IconData
	},
	loginBackground: 'assets/login-bg.jpg',
	palette: {
		currentColor: {
			regular: 'currentColor',
			hover: 'currentColor',
			active: 'currentColor',
			focus: 'currentColor',
			disabled: 'currentColor'
		},
		transparent: {
			regular: 'rgba(0, 0, 0, 0)',
			hover: 'rgba(0, 0, 0, 0.05)',
			active: 'rgba(0, 0, 0, 0.1)',
			focus: 'rgba(0, 0, 0, 0.05)',
			disabled: 'rgba(0, 0, 0, 0)'
		},
		primary: {
			regular: '#2b73d2',
			hover: '#225ca8',
			active: '#1e5092',
			focus: '#225ca8',
			disabled: '#aac8ee'
		},
		secondary: {
			regular: '#828282',
			hover: '#696969',
			active: '#5c5c5c',
			focus: '#696969',
			disabled: '#cccccc'
		},
		header: {
			regular: '#cfd5dc',
			hover: '#b1bbc6',
			active: '#a3aebc',
			focus: '#b1bbc6',
			disabled: '#cfd5dc'
		},
		highlight: {
			regular: '', // will be calculated programmatically
			hover: '', // will be calculated programmatically
			active: '', // will be calculated programmatically
			focus: '', // will be calculated programmatically
			disabled: '' // will be calculated programmatically
		},
		gray0: {
			regular: '#414141',
			hover: '#282828',
			active: '#1b1b1b',
			focus: '#282828',
			disabled: '#cccccc'
		},
		gray1: {
			regular: '#828282',
			hover: '#696969',
			active: '#5c5c5c',
			focus: '#696969',
			disabled: '#cccccc'
		},
		gray2: {
			regular: '#cfd5dc',
			hover: '#b1bbc6',
			active: '#a3aebc',
			focus: '#b1bbc6',
			disabled: '#cfd5dc'
		},
		gray3: {
			regular: '#e6e9ed',
			hover: '#c8cfd8',
			active: '#bac2cd',
			focus: '#c8cfd8',
			disabled: '#e6e9ed'
		},
		gray4: {
			regular: '#eeeff3',
			hover: '#d0d3de',
			active: '#c1c5d3',
			focus: '#d0d3de',
			disabled: '#eeeff3'
		},
		gray5: {
			regular: '#f5f6f8',
			hover: '#d7dbe3',
			active: '#c8ced9',
			focus: '#d7dbe3',
			disabled: '#f5f6f8'
		},
		gray6: {
			regular: '#ffffff',
			hover: '#e6e6e6',
			active: '#d9d9d9',
			focus: '#e6e6e6',
			disabled: '#ffffff'
		},
		warning: {
			regular: '#ffc107',
			hover: '#d39e00',
			active: '#ba8b00',
			focus: '#d39e00',
			disabled: '#ffe699'
		},
		error: {
			regular: '#d74942',
			hover: '#be3028',
			active: '#a92a24',
			focus: '#be3028',
			disabled: '#edaeab'
		},
		success: {
			regular: '#8bc34a',
			hover: '#71a436',
			active: '#639030',
			focus: '#71a436',
			disabled: '#cee6b2'
		},
		info: {
			regular: '#2196d3',
			hover: '#1a75a7',
			active: '#176691',
			focus: '#1a75a7',
			disabled: '#a7d7f1'
		},
		text: {
			regular: '#333333',
			hover: '#1a1a1a',
			active: '#0d0d0d',
			focus: '#1a1a1a',
			disabled: '#cccccc'
		},
		/** @deprecated use theme.shadows instead */
		shadow: {
			regular: 'rgba(166, 166, 166, 0.5)',
			hover: 'rgba(166, 166, 166, 0.5)',
			active: 'rgba(166, 166, 166, 0.5)',
			focus: 'rgba(166, 166, 166, 0.5)',
			disabled: 'rgba(166, 166, 166, 0.5)'
		},
		black: {
			regular: '#000000',
			hover: '#000000',
			active: '#000000',
			focus: '#000000',
			disabled: '#000000'
		},
		white: {
			regular: '#FFFFFF',
			hover: '#FFFFFF',
			active: '#FFFFFF',
			focus: '#FFFFFF',
			disabled: '#FFFFFF'
		},
		successBanner: {
			regular: '#E6F2D8',
			hover: '#E6F2D8',
			active: '#E6F2D8',
			focus: '#E6F2D8',
			disabled: '#E6F2D8'
		},
		warningBanner: {
			regular: '#FFF7DE',
			hover: '#FFF7DE',
			active: '#FFF7DE',
			focus: '#FFF7DE',
			disabled: '#FFF7DE'
		},
		infoBanner: {
			regular: '#D3EBF8',
			hover: '#D3EBF8',
			active: '#D3EBF8',
			focus: '#D3EBF8',
			disabled: '#D3EBF8'
		},
		errorBanner: {
			regular: '#F6D6D5',
			hover: '#F6D6D5',
			active: '#F6D6D5',
			focus: '#F6D6D5',
			disabled: '#F6D6D5'
		}
	},
	avatarColors: {
		avatar_1: '#EF9A9A',
		avatar_2: '#F48FB1',
		avatar_3: '#CE93D8',
		avatar_4: '#B39DDB',
		avatar_5: '#9FA8DA',
		avatar_6: '#90CAF9',
		avatar_7: '#81D4FA',
		avatar_8: '#80DEEA',
		avatar_9: '#80CBC4',
		avatar_10: '#A5D6A7',
		avatar_11: '#C5E1A5',
		avatar_12: '#E6EE9C',
		avatar_13: '#FFE082',
		avatar_14: '#FFCC80',
		avatar_15: '#FFAB91',
		avatar_16: '#BCAAA4',
		avatar_17: '#E57373',
		avatar_18: '#F06292',
		avatar_19: '#BA68C8',
		avatar_20: '#9575CD',
		avatar_21: '#7986CB',
		avatar_22: '#64B5F6',
		avatar_23: '#4FC3F7',
		avatar_24: '#4DD0E1',
		avatar_25: '#4DB6AC',
		avatar_26: '#81C784',
		avatar_27: '#AED581',
		avatar_28: '#DCE775',
		avatar_29: '#FFD54F',
		avatar_30: '#FFB74D',
		avatar_31: '#FF8A65',
		avatar_32: '#A1887F',
		avatar_33: '#0097A7',
		avatar_34: '#EF5350',
		avatar_35: '#EC407A',
		avatar_36: '#AB47BC',
		avatar_37: '#7E57C2',
		avatar_38: '#5C6BC0',
		avatar_39: '#42A5F5',
		avatar_40: '#29B6F6',
		avatar_41: '#26C6DA',
		avatar_42: '#26A69A',
		avatar_43: '#66BB6A',
		avatar_44: '#9CCC65',
		avatar_45: '#D4E157',
		avatar_46: '#FFCA28',
		avatar_47: '#FFA726',
		avatar_48: '#FF7043',
		avatar_49: '#8D6E63',
		avatar_50: '#0288D1'
	},
	shadows: {
		regular: '0 0 0.25rem 0 rgba(166, 166, 166, 0.5)'
	}
};
