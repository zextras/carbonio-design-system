// noinspection CssMissingComma

/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, {
	useCallback,
	useState,
	useEffect,
	useMemo,
	InputHTMLAttributes,
	useRef
} from 'react';

import { noop } from 'lodash';
import { rgba } from 'polished';
import DatePicker, {
	getDefaultLocale,
	ReactDatePicker,
	ReactDatePickerProps,
	registerLocale,
	setDefaultLocale
} from 'react-datepicker';
import styled, { DefaultTheme } from 'styled-components';

import { ChipInput, ChipInputProps, ChipItem } from './ChipInput';
import { IconButton, IconButtonProps } from './IconButton';
import { Input, InputProps } from './Input';
import { SingleItemArray } from '../../typeUtils';
import { INPUT_BACKGROUND_COLOR } from '../constants';
import { ChipProps } from '../display/Chip';
import { Container, ContainerProps } from '../layout/Container';

const COLORS = {
	NAVIGATION_ICON_BORDER: '#CCCCCC',
	MONTH_YEAR_OPTION: '#B3B3B3',
	TODAY_BACKGROUND: '#F0F0F0',
	MAIN_BORDER: '#AEAEAE',
	MAIN_BORDER_HOVER: '#A6A6A6',
	HIGHLIGHTED: '#3DCC4A',
	HIGHLIGHTED_HOVER: '#32BE3F',
	HIGHLIGHTED_CUSTOM: '#FF00FF',
	HIGHLIGHTED_CUSTOM_2: '#008000'
};

const Styler = styled(Container)`
	/* @charset "utf-8"; */
	.react-datepicker__year-read-view--down-arrow,
	.react-datepicker__month-read-view--down-arrow,
	.react-datepicker__month-year-read-view--down-arrow,
	.react-datepicker__navigation-icon::before {
		border-color: ${COLORS.NAVIGATION_ICON_BORDER};
		border-style: solid;
		border-width: 0.1875rem 0.1875rem 0 0;
		content: '';
		display: block;
		height: 0.5625rem;
		position: absolute;
		top: 0.375rem;
		width: 0.5625rem;
	}
	.react-datepicker-popper[data-placement^='top'] .react-datepicker__triangle,
	.react-datepicker-popper[data-placement^='bottom'] .react-datepicker__triangle {
		margin-left: -0.25rem;
		position: absolute;
		width: 0;
	}
	.react-datepicker-popper[data-placement^='top'] .react-datepicker__triangle::before,
	.react-datepicker-popper[data-placement^='bottom'] .react-datepicker__triangle::before,
	.react-datepicker-popper[data-placement^='top'] .react-datepicker__triangle::after,
	.react-datepicker-popper[data-placement^='bottom'] .react-datepicker__triangle::after {
		box-sizing: content-box;
		position: absolute;
		border: 0.5rem solid transparent;
		height: 0;
		width: 0.0625rem;
		content: '';
		z-index: -1;
		left: -0.5rem;
	}
	.react-datepicker-popper[data-placement^='top'] .react-datepicker__triangle::before,
	.react-datepicker-popper[data-placement^='bottom'] .react-datepicker__triangle::before {
		border-bottom-color: ${COLORS.MAIN_BORDER};
	}

	.react-datepicker-popper[data-placement^='bottom'] .react-datepicker__triangle {
		top: 0;
		margin-top: -0.5rem;
	}
	.react-datepicker-popper[data-placement^='bottom'] .react-datepicker__triangle::before,
	.react-datepicker-popper[data-placement^='bottom'] .react-datepicker__triangle::after {
		border-top: none;
		border-bottom-color: ${COLORS.TODAY_BACKGROUND};
	}
	.react-datepicker-popper[data-placement^='bottom'] .react-datepicker__triangle::after {
		top: 0;
	}
	.react-datepicker-popper[data-placement^='bottom'] .react-datepicker__triangle::before {
		top: -0.0625rem;
		border-bottom-color: ${COLORS.MAIN_BORDER};
	}

	.react-datepicker-popper[data-placement^='top'] .react-datepicker__triangle {
		bottom: 0;
		margin-bottom: -0.5rem;
	}
	.react-datepicker-popper[data-placement^='top'] .react-datepicker__triangle::before,
	.react-datepicker-popper[data-placement^='top'] .react-datepicker__triangle::after {
		border-bottom: none;
		border-top-color: ${({ theme }): string => theme.palette.white.regular};
	}
	.react-datepicker-popper[data-placement^='top'] .react-datepicker__triangle::after {
		bottom: 0;
	}
	.react-datepicker-popper[data-placement^='top'] .react-datepicker__triangle::before {
		bottom: -0.0625rem;
		border-top-color: ${COLORS.MAIN_BORDER};
	}

	.react-datepicker-wrapper {
		display: inline-block;
		padding: 0;
		border: 0;
		width: 100%;
	}

	.react-datepicker {
		font-family: 'Helvetica Neue', helvetica, arial, sans-serif;
		font-size: 0.8rem;
		background-color: ${({ theme }): string => theme.palette.white.regular};
		color: ${({ theme }): string => theme.palette.black.regular};
		border: 0.0625rem solid ${COLORS.MAIN_BORDER};
		border-radius: 0.3rem;
		display: inline-block;
		position: relative;
	}

	.react-datepicker--time-only .react-datepicker__triangle {
		left: 2.1875rem;
	}
	.react-datepicker--time-only .react-datepicker__time-container {
		border-left: 0;
	}
	.react-datepicker--time-only .react-datepicker__time,
	.react-datepicker--time-only .react-datepicker__time-box {
		border-bottom-left-radius: 0.3rem;
		border-bottom-right-radius: 0.3rem;
	}

	.react-datepicker__triangle {
		position: absolute;
		left: 3.125rem;
	}

	.react-datepicker-popper {
		z-index: 1;
	}
	.react-datepicker-popper[data-placement^='bottom'] {
		padding-top: 0.625rem;
	}
	.react-datepicker-popper[data-placement='bottom-end'] .react-datepicker__triangle,
	.react-datepicker-popper[data-placement='top-end'] .react-datepicker__triangle {
		left: auto;
		right: 3.125rem;
	}
	.react-datepicker-popper[data-placement^='top'] {
		padding-bottom: 0.625rem;
	}
	.react-datepicker-popper[data-placement^='right'] {
		padding-left: 0.5rem;
	}
	.react-datepicker-popper[data-placement^='right'] .react-datepicker__triangle {
		left: auto;
		right: 2.625rem;
	}
	.react-datepicker-popper[data-placement^='left'] {
		padding-right: 0.5rem;
	}
	.react-datepicker-popper[data-placement^='left'] .react-datepicker__triangle {
		left: 2.625rem;
		right: auto;
	}

	.react-datepicker__header {
		text-align: center;
		background-color: ${COLORS.TODAY_BACKGROUND};
		border-bottom: 0.0625rem solid ${COLORS.MAIN_BORDER};
		border-top-left-radius: 0.3rem;
		padding: 0.5rem 0;
		position: relative;
	}
	.react-datepicker__header--time {
		padding-bottom: 0.5rem;
		padding-left: 0.3125rem;
		padding-right: 0.3125rem;
	}
	.react-datepicker__header--time:not(.react-datepicker__header--time--only) {
		border-top-left-radius: 0;
	}
	.react-datepicker__header:not(.react-datepicker__header--has-time-select) {
		border-top-right-radius: 0.3rem;
	}

	.react-datepicker__year-dropdown-container--select,
	.react-datepicker__month-dropdown-container--select,
	.react-datepicker__month-year-dropdown-container--select,
	.react-datepicker__year-dropdown-container--scroll,
	.react-datepicker__month-dropdown-container--scroll,
	.react-datepicker__month-year-dropdown-container--scroll {
		display: inline-block;
		margin: 0 0.125rem;
	}

	.react-datepicker__current-month,
	.react-datepicker-time__header,
	.react-datepicker-year-header {
		margin-top: 0;
		color: ${({ theme }): string => theme.palette.black.regular};
		font-weight: bold;
		font-size: 0.944rem;
	}

	.react-datepicker-time__header {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.react-datepicker__navigation {
		align-items: center;
		background: none;
		display: flex;
		justify-content: center;
		text-align: center;
		cursor: pointer;
		position: absolute;
		top: 0.125rem;
		padding: 0;
		border: none;
		z-index: 1;
		height: 2rem;
		width: 2rem;
		text-indent: -999rem;
		overflow: hidden;
	}
	.react-datepicker__navigation--previous {
		left: 0.125rem;
	}
	.react-datepicker__navigation--next {
		right: 0.125rem;
	}
	.react-datepicker__navigation--next--with-time:not(
			.react-datepicker__navigation--next--with-today-button
		) {
		right: 5.3125rem;
	}
	.react-datepicker__navigation--years {
		position: relative;
		top: 0;
		display: block;
		margin-left: auto;
		margin-right: auto;
	}
	.react-datepicker__navigation--years-previous {
		top: 0.25rem;
	}
	.react-datepicker__navigation--years-upcoming {
		top: -0.25rem;
	}
	.react-datepicker__navigation:hover *::before {
		border-color: ${COLORS.MAIN_BORDER_HOVER};
	}

	.react-datepicker__navigation-icon {
		position: relative;
		top: -0.0625rem;
		font-size: 1.25rem;
		width: 0;
	}
	.react-datepicker__navigation-icon--next {
		left: -0.125rem;
	}
	.react-datepicker__navigation-icon--next::before {
		transform: rotate(45deg);
		left: -0.4375rem;
	}
	.react-datepicker__navigation-icon--previous {
		right: -0.125rem;
	}
	.react-datepicker__navigation-icon--previous::before {
		transform: rotate(225deg);
		right: -0.4375rem;
	}

	.react-datepicker__month-container {
		float: left;
	}

	.react-datepicker__year {
		margin: 0.4rem;
		text-align: center;
	}
	.react-datepicker__year-wrapper {
		display: flex;
		flex-wrap: wrap;
		max-width: 11.25rem;
	}
	.react-datepicker__year .react-datepicker__year-text {
		display: inline-block;
		width: 4rem;
		margin: 0.125rem;
	}

	.react-datepicker__month {
		margin: 0.4rem;
		text-align: center;
	}
	.react-datepicker__month .react-datepicker__month-text,
	.react-datepicker__month .react-datepicker__quarter-text {
		display: inline-block;
		width: 4rem;
		margin: 0.125rem;
	}

	.react-datepicker__input-time-container {
		clear: both;
		width: 100%;
		float: left;
		margin: 0.3125rem 0 0.625rem 0.9375rem;
		text-align: left;
	}
	.react-datepicker__input-time-container .react-datepicker-time__caption {
		display: inline-block;
	}
	.react-datepicker__input-time-container .react-datepicker-time__input-container {
		display: inline-block;
	}
	.react-datepicker__input-time-container
		.react-datepicker-time__input-container
		.react-datepicker-time__input {
		display: inline-block;
		margin-left: 0.625rem;
	}
	.react-datepicker__input-time-container
		.react-datepicker-time__input-container
		.react-datepicker-time__input
		input {
		width: auto;
	}
	.react-datepicker__input-time-container
		.react-datepicker-time__input-container
		.react-datepicker-time__input
		input[type='time']::-webkit-inner-spin-button,
	.react-datepicker__input-time-container
		.react-datepicker-time__input-container
		.react-datepicker-time__input
		input[type='time']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	.react-datepicker__input-time-container
		.react-datepicker-time__input-container
		.react-datepicker-time__input
		input[type='time'] {
		-moz-appearance: textfield;
	}
	.react-datepicker__input-time-container
		.react-datepicker-time__input-container
		.react-datepicker-time__delimiter {
		margin-left: 0.3125rem;
		display: inline-block;
	}

	.react-datepicker__time-container {
		float: right;
		border-left: 0.0625rem solid ${COLORS.MAIN_BORDER};
		width: 5.3125rem;
	}
	.react-datepicker__time-container--with-today-button {
		display: inline;
		border: 0.0625rem solid ${COLORS.MAIN_BORDER};
		border-radius: 0.3rem;
		position: absolute;
		right: -4.5rem;
		top: 0;
	}
	.react-datepicker__time-container .react-datepicker__time {
		position: relative;
		background: white;
		border-bottom-right-radius: 0.3rem;
	}
	.react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box {
		width: 5.3125rem;
		overflow-x: hidden;
		margin: 0 auto;
		text-align: center;
		border-bottom-right-radius: 0.3rem;
	}
	.react-datepicker__time-container
		.react-datepicker__time
		.react-datepicker__time-box
		ul.react-datepicker__time-list {
		list-style: none;
		margin: 0;
		height: calc(12.1875rem + (1.7rem / 2));
		overflow-y: scroll;
		padding-right: 0;
		padding-left: 0;
		width: 100%;
		box-sizing: content-box;
	}
	.react-datepicker__time-container
		.react-datepicker__time
		.react-datepicker__time-box
		ul.react-datepicker__time-list
		li.react-datepicker__time-list-item {
		height: 1.875rem;
		padding: 0.3125rem 0.625rem;
		white-space: nowrap;
	}
	.react-datepicker__time-container
		.react-datepicker__time
		.react-datepicker__time-box
		ul.react-datepicker__time-list
		li.react-datepicker__time-list-item:hover {
		cursor: pointer;
		background-color: ${COLORS.TODAY_BACKGROUND};
	}
	.react-datepicker__time-container
		.react-datepicker__time
		.react-datepicker__time-box
		ul.react-datepicker__time-list
		li.react-datepicker__time-list-item--selected {
		background-color: ${({ theme }): string => theme.palette.primary.active};
		color: white;
		font-weight: bold;
	}
	.react-datepicker__time-container
		.react-datepicker__time
		.react-datepicker__time-box
		ul.react-datepicker__time-list
		li.react-datepicker__time-list-item--selected:hover {
		background-color: ${({ theme }): string => theme.palette.primary.active};
	}
	.react-datepicker__time-container
		.react-datepicker__time
		.react-datepicker__time-box
		ul.react-datepicker__time-list
		li.react-datepicker__time-list-item--disabled {
		color: ${COLORS.NAVIGATION_ICON_BORDER};
	}
	.react-datepicker__time-container
		.react-datepicker__time
		.react-datepicker__time-box
		ul.react-datepicker__time-list
		li.react-datepicker__time-list-item--disabled:hover {
		cursor: default;
		background-color: transparent;
	}

	.react-datepicker__week-number {
		color: ${COLORS.NAVIGATION_ICON_BORDER};
		display: inline-block;
		width: 1.7rem;
		line-height: 1.7rem;
		text-align: center;
		margin: 0.166rem;
	}
	.react-datepicker__week-number.react-datepicker__week-number--clickable {
		cursor: pointer;
	}
	.react-datepicker__week-number.react-datepicker__week-number--clickable:hover {
		border-radius: 0.3rem;
		background-color: ${COLORS.TODAY_BACKGROUND};
	}

	.react-datepicker__day-names,
	.react-datepicker__week {
		white-space: nowrap;
	}

	.react-datepicker__day-names {
		margin-bottom: -0.5rem;
	}

	.react-datepicker__day-name,
	.react-datepicker__day,
	.react-datepicker__time-name {
		color: ${({ theme }): string => theme.palette.black.regular};
		display: inline-block;
		width: 1.7rem;
		line-height: 1.7rem;
		text-align: center;
		margin: 0.166rem;
	}

	.react-datepicker__month--selected,
	.react-datepicker__month--in-selecting-range,
	.react-datepicker__month--in-range,
	.react-datepicker__quarter--selected,
	.react-datepicker__quarter--in-selecting-range,
	.react-datepicker__quarter--in-range {
		border-radius: 0.3rem;
		background-color: ${({ theme }): string => theme.palette.primary.active};
		color: ${({ theme }): string => theme.palette.white.regular};
	}
	.react-datepicker__month--selected:hover,
	.react-datepicker__month--in-selecting-range:hover,
	.react-datepicker__month--in-range:hover,
	.react-datepicker__quarter--selected:hover,
	.react-datepicker__quarter--in-selecting-range:hover,
	.react-datepicker__quarter--in-range:hover {
		background-color: ${({ theme }): string => theme.palette.primary.hover};
	}
	.react-datepicker__month--disabled,
	.react-datepicker__quarter--disabled {
		color: ${COLORS.NAVIGATION_ICON_BORDER};
		pointer-events: none;
	}
	.react-datepicker__month--disabled:hover,
	.react-datepicker__quarter--disabled:hover {
		cursor: default;
		background-color: transparent;
	}

	.react-datepicker__day,
	.react-datepicker__month-text,
	.react-datepicker__quarter-text,
	.react-datepicker__year-text {
		cursor: pointer;
	}
	.react-datepicker__day:hover,
	.react-datepicker__month-text:hover,
	.react-datepicker__quarter-text:hover,
	.react-datepicker__year-text:hover {
		border-radius: 0.3rem;
		background-color: ${COLORS.TODAY_BACKGROUND};
	}
	.react-datepicker__day--today,
	.react-datepicker__month-text--today,
	.react-datepicker__quarter-text--today,
	.react-datepicker__year-text--today {
		font-weight: bold;
	}
	.react-datepicker__day--highlighted,
	.react-datepicker__month-text--highlighted,
	.react-datepicker__quarter-text--highlighted,
	.react-datepicker__year-text--highlighted {
		border-radius: 0.3rem;
		background-color: ${COLORS.HIGHLIGHTED};
		color: ${({ theme }): string => theme.palette.white.regular};
	}
	.react-datepicker__day--highlighted:hover,
	.react-datepicker__month-text--highlighted:hover,
	.react-datepicker__quarter-text--highlighted:hover,
	.react-datepicker__year-text--highlighted:hover {
		background-color: ${COLORS.HIGHLIGHTED_HOVER};
	}
	.react-datepicker__day--highlighted-custom-1,
	.react-datepicker__month-text--highlighted-custom-1,
	.react-datepicker__quarter-text--highlighted-custom-1,
	.react-datepicker__year-text--highlighted-custom-1 {
		color: ${COLORS.HIGHLIGHTED_CUSTOM};
	}
	.react-datepicker__day--highlighted-custom-2,
	.react-datepicker__month-text--highlighted-custom-2,
	.react-datepicker__quarter-text--highlighted-custom-2,
	.react-datepicker__year-text--highlighted-custom-2 {
		color: ${COLORS.HIGHLIGHTED_CUSTOM_2};
	}
	.react-datepicker__day--selected,
	.react-datepicker__day--in-selecting-range,
	.react-datepicker__day--in-range,
	.react-datepicker__month-text--selected,
	.react-datepicker__month-text--in-selecting-range,
	.react-datepicker__month-text--in-range,
	.react-datepicker__quarter-text--selected,
	.react-datepicker__quarter-text--in-selecting-range,
	.react-datepicker__quarter-text--in-range,
	.react-datepicker__year-text--selected,
	.react-datepicker__year-text--in-selecting-range,
	.react-datepicker__year-text--in-range {
		border-radius: 0.3rem;
		background-color: ${({ theme }): string => theme.palette.primary.active};
		color: ${({ theme }): string => theme.palette.white.regular};
	}
	.react-datepicker__day--selected:hover,
	.react-datepicker__day--in-selecting-range:hover,
	.react-datepicker__day--in-range:hover,
	.react-datepicker__month-text--selected:hover,
	.react-datepicker__month-text--in-selecting-range:hover,
	.react-datepicker__month-text--in-range:hover,
	.react-datepicker__quarter-text--selected:hover,
	.react-datepicker__quarter-text--in-selecting-range:hover,
	.react-datepicker__quarter-text--in-range:hover,
	.react-datepicker__year-text--selected:hover,
	.react-datepicker__year-text--in-selecting-range:hover,
	.react-datepicker__year-text--in-range:hover {
		background-color: ${({ theme }): string => theme.palette.primary.hover};
	}
	.react-datepicker__day--keyboard-selected,
	.react-datepicker__month-text--keyboard-selected,
	.react-datepicker__quarter-text--keyboard-selected,
	.react-datepicker__year-text--keyboard-selected {
		border-radius: 0.3rem;
		background-color: ${({ theme }): string => theme.palette.primary.regular};
		color: ${({ theme }): string => theme.palette.white.regular};
	}
	.react-datepicker__day--keyboard-selected:hover,
	.react-datepicker__month-text--keyboard-selected:hover,
	.react-datepicker__quarter-text--keyboard-selected:hover,
	.react-datepicker__year-text--keyboard-selected:hover {
		background-color: ${({ theme }): string => theme.palette.primary.hover};
	}
	.react-datepicker__day--in-selecting-range:not(
			.react-datepicker__day--in-range,
			.react-datepicker__month-text--in-range,
			.react-datepicker__quarter-text--in-range,
			.react-datepicker__year-text--in-range
		),
	.react-datepicker__month-text--in-selecting-range:not(
			.react-datepicker__day--in-range,
			.react-datepicker__month-text--in-range,
			.react-datepicker__quarter-text--in-range,
			.react-datepicker__year-text--in-range
		),
	.react-datepicker__quarter-text--in-selecting-range:not(
			.react-datepicker__day--in-range,
			.react-datepicker__month-text--in-range,
			.react-datepicker__quarter-text--in-range,
			.react-datepicker__year-text--in-range
		),
	.react-datepicker__year-text--in-selecting-range:not(
			.react-datepicker__day--in-range,
			.react-datepicker__month-text--in-range,
			.react-datepicker__quarter-text--in-range,
			.react-datepicker__year-text--in-range
		) {
		background-color: ${({ theme }): string => rgba(theme.palette.primary.active, 0.5)};
	}
	.react-datepicker__month--selecting-range
		.react-datepicker__day--in-range:not(
			.react-datepicker__day--in-selecting-range,
			.react-datepicker__month-text--in-selecting-range,
			.react-datepicker__quarter-text--in-selecting-range,
			.react-datepicker__year-text--in-selecting-range
		),
	.react-datepicker__month--selecting-range
		.react-datepicker__month-text--in-range:not(
			.react-datepicker__day--in-selecting-range,
			.react-datepicker__month-text--in-selecting-range,
			.react-datepicker__quarter-text--in-selecting-range,
			.react-datepicker__year-text--in-selecting-range
		),
	.react-datepicker__month--selecting-range
		.react-datepicker__quarter-text--in-range:not(
			.react-datepicker__day--in-selecting-range,
			.react-datepicker__month-text--in-selecting-range,
			.react-datepicker__quarter-text--in-selecting-range,
			.react-datepicker__year-text--in-selecting-range
		),
	.react-datepicker__month--selecting-range
		.react-datepicker__year-text--in-range:not(
			.react-datepicker__day--in-selecting-range,
			.react-datepicker__month-text--in-selecting-range,
			.react-datepicker__quarter-text--in-selecting-range,
			.react-datepicker__year-text--in-selecting-range
		) {
		background-color: ${COLORS.TODAY_BACKGROUND};
		color: ${({ theme }): string => theme.palette.black.regular};
	}
	.react-datepicker__day--disabled,
	.react-datepicker__month-text--disabled,
	.react-datepicker__quarter-text--disabled,
	.react-datepicker__year-text--disabled {
		cursor: default;
		color: ${COLORS.NAVIGATION_ICON_BORDER};
	}
	.react-datepicker__day--disabled:hover,
	.react-datepicker__month-text--disabled:hover,
	.react-datepicker__quarter-text--disabled:hover,
	.react-datepicker__year-text--disabled:hover {
		background-color: transparent;
	}

	.react-datepicker__month-text.react-datepicker__month--selected:hover,
	.react-datepicker__month-text.react-datepicker__month--in-range:hover,
	.react-datepicker__month-text.react-datepicker__quarter--selected:hover,
	.react-datepicker__month-text.react-datepicker__quarter--in-range:hover,
	.react-datepicker__quarter-text.react-datepicker__month--selected:hover,
	.react-datepicker__quarter-text.react-datepicker__month--in-range:hover,
	.react-datepicker__quarter-text.react-datepicker__quarter--selected:hover,
	.react-datepicker__quarter-text.react-datepicker__quarter--in-range:hover {
		background-color: ${({ theme }): string => theme.palette.primary.active};
	}
	.react-datepicker__month-text:hover,
	.react-datepicker__quarter-text:hover {
		background-color: ${COLORS.TODAY_BACKGROUND};
	}

	.react-datepicker__input-container {
		position: relative;
		display: inline-block;
		width: 100%;
	}

	.react-datepicker__year-read-view,
	.react-datepicker__month-read-view,
	.react-datepicker__month-year-read-view {
		border: 0.0625rem solid transparent;
		border-radius: 0.3rem;
		position: relative;
	}
	.react-datepicker__year-read-view:hover,
	.react-datepicker__month-read-view:hover,
	.react-datepicker__month-year-read-view:hover {
		cursor: pointer;
	}
	.react-datepicker__year-read-view:hover .react-datepicker__year-read-view--down-arrow,
	.react-datepicker__year-read-view:hover .react-datepicker__month-read-view--down-arrow,
	.react-datepicker__month-read-view:hover .react-datepicker__year-read-view--down-arrow,
	.react-datepicker__month-read-view:hover .react-datepicker__month-read-view--down-arrow,
	.react-datepicker__month-year-read-view:hover .react-datepicker__year-read-view--down-arrow,
	.react-datepicker__month-year-read-view:hover .react-datepicker__month-read-view--down-arrow {
		border-top-color: ${COLORS.MONTH_YEAR_OPTION};
	}
	.react-datepicker__year-read-view--down-arrow,
	.react-datepicker__month-read-view--down-arrow,
	.react-datepicker__month-year-read-view--down-arrow {
		transform: rotate(135deg);
		right: -1rem;
		top: 0;
	}

	.react-datepicker__year-dropdown,
	.react-datepicker__month-dropdown,
	.react-datepicker__month-year-dropdown {
		background-color: ${COLORS.TODAY_BACKGROUND};
		position: absolute;
		width: 50%;
		left: 25%;
		top: 1.875rem;
		z-index: 1;
		text-align: center;
		border-radius: 0.3rem;
		border: 0.0625rem solid ${COLORS.MAIN_BORDER};
	}
	.react-datepicker__year-dropdown:hover,
	.react-datepicker__month-dropdown:hover,
	.react-datepicker__month-year-dropdown:hover {
		cursor: pointer;
	}
	.react-datepicker__year-dropdown--scrollable,
	.react-datepicker__month-dropdown--scrollable,
	.react-datepicker__month-year-dropdown--scrollable {
		height: 9.375rem;
		overflow-y: scroll;
	}

	.react-datepicker__year-option,
	.react-datepicker__month-option,
	.react-datepicker__month-year-option {
		line-height: 1.25rem;
		width: 100%;
		display: block;
		margin-left: auto;
		margin-right: auto;
	}
	.react-datepicker__year-option:first-of-type,
	.react-datepicker__month-option:first-of-type,
	.react-datepicker__month-year-option:first-of-type {
		border-top-left-radius: 0.3rem;
		border-top-right-radius: 0.3rem;
	}
	.react-datepicker__year-option:last-of-type,
	.react-datepicker__month-option:last-of-type,
	.react-datepicker__month-year-option:last-of-type {
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		border-bottom-left-radius: 0.3rem;
		border-bottom-right-radius: 0.3rem;
	}
	.react-datepicker__year-option:hover,
	.react-datepicker__month-option:hover,
	.react-datepicker__month-year-option:hover {
		background-color: ${COLORS.NAVIGATION_ICON_BORDER};
	}
	.react-datepicker__year-option:hover .react-datepicker__navigation--years-upcoming,
	.react-datepicker__month-option:hover .react-datepicker__navigation--years-upcoming,
	.react-datepicker__month-year-option:hover .react-datepicker__navigation--years-upcoming {
		border-bottom-color: ${COLORS.MONTH_YEAR_OPTION};
	}
	.react-datepicker__year-option:hover .react-datepicker__navigation--years-previous,
	.react-datepicker__month-option:hover .react-datepicker__navigation--years-previous,
	.react-datepicker__month-year-option:hover .react-datepicker__navigation--years-previous {
		border-top-color: ${COLORS.MONTH_YEAR_OPTION};
	}
	.react-datepicker__year-option--selected,
	.react-datepicker__month-option--selected,
	.react-datepicker__month-year-option--selected {
		position: absolute;
		left: 0.9375rem;
	}

	.react-datepicker__close-icon {
		cursor: pointer;
		background-color: transparent;
		border: 0;
		outline: 0;
		padding: 0 0.375rem 0 0;
		position: absolute;
		top: 0;
		right: 0;
		height: 100%;
		display: table-cell;
		vertical-align: middle;
	}
	.react-datepicker__close-icon::after {
		cursor: pointer;
		background-color: ${({ theme }): string => theme.palette.primary.active};
		color: ${({ theme }): string => theme.palette.white.regular};
		border-radius: 50%;
		height: 1rem;
		width: 1rem;
		padding: 0.125rem;
		font-size: 0.75rem;
		line-height: 1;
		text-align: center;
		display: table-cell;
		vertical-align: middle;
		content: '×';
	}

	.react-datepicker__today-button {
		background: ${COLORS.TODAY_BACKGROUND};
		border-top: 0.0625rem solid ${COLORS.MAIN_BORDER};
		cursor: pointer;
		text-align: center;
		font-weight: bold;
		padding: 0.3125rem 0;
		clear: left;
	}

	.react-datepicker__portal {
		position: fixed;
		width: 100vw;
		height: 100vh;
		background-color: ${({ theme }): string => rgba(theme.palette.black.regular, 0.8)};
		left: 0;
		top: 0;
		justify-content: center;
		align-items: center;
		display: flex;
		z-index: 2147483647;
	}
	.react-datepicker__portal .react-datepicker__day-name,
	.react-datepicker__portal .react-datepicker__day,
	.react-datepicker__portal .react-datepicker__time-name {
		width: 3rem;
		line-height: 3rem;
	}
	@media (max-width: 400px), (max-height: 550px) {
		.react-datepicker__portal .react-datepicker__day-name,
		.react-datepicker__portal .react-datepicker__day,
		.react-datepicker__portal .react-datepicker__time-name {
			width: 2rem;
			line-height: 2rem;
		}
	}
	.react-datepicker__portal .react-datepicker__current-month,
	.react-datepicker__portal .react-datepicker-time__header {
		font-size: 1.44rem;
	}

	/* 
	 * Copy of the original style to hide the aria label needed for accessibility
	 * See https://github.com/Hacker0x01/react-datepicker/issues/3924#issuecomment-1430907381
	 */
	.react-datepicker__aria-live {
		position: absolute;
		clip-path: circle(0);
		border: 0;
		height: 1px;
		margin: -1px;
		overflow: hidden;
		padding: 0;
		width: 1px;
		white-space: nowrap;
	}

	/*# sourceMappingURL=styles.css.map */

	/* color: ${({ theme }): string => theme.palette.text.regular}; */
	font-family: ${({ theme }): string => theme.fonts.default};
	font-size: ${({ theme }): string => theme.sizes.font.medium};
	font-weight: ${({ theme }): number => theme.fonts.weight.regular};
`;

const InputIconsContainer = styled.div`
	display: flex;
	gap: 0.5rem;
	width: fit-content;
`;

const CustomIconButton = styled(IconButton)`
	padding: 0.125rem;
`;

interface DateTimePickerProps extends Omit<ReactDatePickerProps, 'onChange' | 'placeholderText'> {
	/** Input's background color */
	backgroundColor?: keyof DefaultTheme['palette'];
	/** Close icon to clear the Input */
	isClearable?: boolean;
	/** Label for input */
	label: string;
	/** input change callback */
	onChange?: (newValue: Date | null) => void;
	/** default value of the input */
	defaultValue?: Date;
	/** Whether the input has an error */
	hasError?: boolean;
	/** Error Message */
	errorLabel?: string;
	/** Show time picker   */
	includeTime?: boolean;
	/** Date format  */
	dateFormat?: string;
	/** Time format  */
	timeFormat?: string;
	/** Label for time options */
	timeLabel?: string;
	/** Minutes Gap between different time options */
	timeIntervals?: number;
	/** Use Chips to show selected value */
	enableChips?: boolean;
	/** Pass chip props */
	chipProps?: Partial<ChipProps>;
	/**
	 * Input width: <br/>
	 *  <li>`fit`: shorthand for fit-content</li>
	 *  <li>`fill`: semantic alternative for `100%`</li>
	 *  <li>number: measure in px</li>
	 *  <li>string: any measure in CSS syntax</li>
	 */
	width?: 'fit' | 'fill' | string | number;
	/**
	 * Use a custom component instead of the default one.
	 * The component will be cloned by react-datepicker.
	 * See "With Custom Input" section for more details.
	 */
	CustomComponent?: React.ComponentType<{
		value?: string;
		onClick?: React.ReactEventHandler;
	}>;
	/** Disable the input */
	disabled?: boolean;
}

interface ReactDatePickerCustomInputProps
	extends Pick<
		InputHTMLAttributes<HTMLInputElement>,
		| 'value'
		| 'onBlur'
		| 'onChange'
		| 'onClick'
		| 'onFocus'
		| 'onKeyDown'
		| 'id'
		| 'name'
		| 'form'
		| 'autoFocus'
		| 'placeholder'
		| 'disabled'
		| 'autoComplete'
		| 'className'
		| 'title'
		| 'readOnly'
		| 'required'
		| 'tabIndex'
		| 'aria-describedby'
		| 'aria-invalid'
		| 'aria-labelledby'
		| 'aria-required'
	> {
	value?: string;
}

type DateTimePickerInputProps = Omit<InputProps, keyof ReactDatePickerCustomInputProps> & {
	width: ContainerProps['width'];
	isClearable: boolean;
	onClear: IconButtonProps['onClick'];
};

type DateTimePickerChipInputProps = Omit<
	ChipInputProps<Date>,
	keyof ReactDatePickerCustomInputProps
> & {
	width: ContainerProps['width'];
	chipValue: Date | null;
	chipProps: Partial<ChipProps> | undefined;
	/** Redefine onChange for ChipInput to avoid having it overwritten by react-datepicker */
	handleChipChange: (items: DateChipItem[]) => void;
};

interface InputIconsProps {
	showClear: boolean;
	onClear: IconButtonProps['onClick'];
	onClick: IconButtonProps['onClick'];
}

type DateChipItem = ChipItem<Date>;

const buildInputIcons = ({
	showClear,
	onClear,
	onClick
}: InputIconsProps): NonNullable<InputProps['CustomIcon']> =>
	function InputIcons({ hasError }): React.JSX.Element {
		return (
			<InputIconsContainer>
				{showClear && (
					<CustomIconButton
						icon="CloseOutline"
						size="large"
						onClick={onClear}
						backgroundColor="transparent"
					/>
				)}
				<CustomIconButton
					icon="CalendarOutline"
					size="large"
					backgroundColor="transparent"
					onClick={onClick}
					iconColor={hasError ? 'error' : 'text'}
				/>
			</InputIconsContainer>
		);
	};

const DateTimePickerInput = React.forwardRef<
	HTMLDivElement,
	DateTimePickerInputProps & { [K in keyof ReactDatePickerCustomInputProps]: never }
>(function DateTimePickerInputFn(
	{
		width,
		onClear,
		isClearable,
		placeholder,
		...rest
	}: DateTimePickerInputProps & ReactDatePickerCustomInputProps,
	ref
) {
	const { value, onClick = noop } = rest;
	const InputIconsComponent = useMemo<InputProps['CustomIcon']>(
		() => buildInputIcons({ showClear: isClearable && !!value, onClear, onClick }),
		[isClearable, onClear, onClick, value]
	);

	return (
		<Container width={width} ref={ref}>
			<Input CustomIcon={InputIconsComponent} label={placeholder} {...rest} />
		</Container>
	);
});

const DateTimePickerChipInput = React.forwardRef<
	HTMLDivElement,
	DateTimePickerChipInputProps & { [K in keyof ReactDatePickerCustomInputProps]: never }
>(function DateTimePickerChipInputFn(
	{
		width,
		onChange,
		chipProps,
		handleChipChange,
		placeholder,
		chipValue,
		value,
		...rest
	}: DateTimePickerChipInputProps & ReactDatePickerCustomInputProps,
	ref
) {
	const { hasError, onClick } = rest;
	const inputRef = useRef<HTMLInputElement>(null);
	const [chipInputValue, setChipInputValue] = useState<SingleItemArray<DateChipItem>>([]);

	useEffect(() => {
		setChipInputValue((prevState) => {
			const prevValue = prevState.length > 0 && prevState[0] ? prevState[0].value : null;
			if (chipValue && value) {
				return [
					{
						background: 'gray2',
						avatarIcon: 'CalendarOutline',
						color: 'text',
						...chipProps,
						value: chipValue,
						label: value,
						onClick
					}
				];
			}
			if (prevValue && !chipValue) {
				return [];
			}
			return prevState;
		});
		if (value && chipValue && inputRef.current) {
			inputRef.current.value = '';
			inputRef.current.dispatchEvent(new Event('change'));
		}
	}, [chipProps, chipValue, onClick, value]);

	const onInputType = useCallback(
		(event: React.KeyboardEvent<HTMLInputElement>) => {
			if (onChange && event.target instanceof HTMLInputElement) {
				onChange({
					...event,
					target: event.target
				});
			}
		},
		[onChange]
	);

	return (
		<Container width={width} ref={ref}>
			<ChipInput
				icon="CalendarOutline"
				iconAction={onClick}
				iconColor={hasError ? 'error' : 'text'}
				wrap={'nowrap'}
				separators={[]}
				{...rest}
				placeholder={placeholder}
				value={chipInputValue}
				onChange={handleChipChange}
				onInputType={onInputType}
				maxChips={1}
				inputRef={inputRef}
			/>
		</Container>
	);
});

const DateTimePicker = React.forwardRef<ReactDatePicker, DateTimePickerProps>(
	function DateTimePickerFn(
		{
			width = '15.625rem',
			hasError,
			label,
			includeTime = true,
			dateFormat = 'MMMM d, yyyy h:mm aa',
			timeLabel,
			timeIntervals = 15,
			timeFormat,
			enableChips,
			chipProps,
			CustomComponent,

			backgroundColor = INPUT_BACKGROUND_COLOR,
			errorLabel = 'Error',
			isClearable = false,

			onChange,
			defaultValue = null,
			disabled,

			...datePickerProps
		},
		ref
	) {
		const dateTimeRef = useRef<Date | null>(defaultValue);
		const [dateTime, _setDateTime] = useState(defaultValue);
		const setDateTime = useCallback<
			(
				action:
					| { type: 'SAVE' | 'SAVE_AND_UPDATE'; value: Date | null }
					| { type: 'UPDATE'; value?: never }
			) => void
		>(
			({ type, value: newValue }) => {
				const currentValue = dateTimeRef.current;
				switch (type) {
					case 'SAVE':
						dateTimeRef.current = newValue;
						break;
					case 'UPDATE':
						_setDateTime(currentValue);
						onChange && onChange(currentValue);
						break;
					case 'SAVE_AND_UPDATE':
						dateTimeRef.current = newValue;
						_setDateTime(newValue);
						onChange && onChange(newValue);
						break;
					default:
						break;
				}
			},
			[onChange]
		);

		useEffect(() => {
			setDateTime({ type: 'SAVE_AND_UPDATE', value: defaultValue });
		}, [defaultValue, setDateTime]);

		const onClear = useCallback(() => {
			setDateTime({ type: 'SAVE_AND_UPDATE', value: null });
		}, [setDateTime]);

		const onValueChange = useCallback<ReactDatePickerProps['onChange']>(
			(date) => {
				setDateTime({ type: 'SAVE', value: date });
			},
			[setDateTime]
		);

		const handleChipChange = useCallback(
			(items: DateChipItem[]) => {
				// this change is called only when chip is removed through the close action
				// so the value set as new date should always be null.
				// Other changes are handled from outside by changing the value of the chip input directly.
				const newDateTime = items.length > 0 ? (items[0].value as Date) : null;
				setDateTime({ type: 'SAVE_AND_UPDATE', value: newDateTime });
			},
			[setDateTime]
		);

		const defaultInputComponent = useMemo(() => {
			if (enableChips) {
				return (
					<DateTimePickerChipInput
						width={width}
						background={backgroundColor}
						hasError={hasError}
						description={(hasError && errorLabel) || undefined}
						handleChipChange={handleChipChange}
						chipProps={chipProps}
						chipValue={dateTime}
					/>
				);
			}
			return (
				<DateTimePickerInput
					backgroundColor={backgroundColor}
					hasError={hasError}
					description={(hasError && errorLabel) || undefined}
					width={width}
					label={label}
					onClear={onClear}
					isClearable={isClearable}
				/>
			);
		}, [
			backgroundColor,
			chipProps,
			dateTime,
			enableChips,
			errorLabel,
			handleChipChange,
			hasError,
			isClearable,
			label,
			onClear,
			width
		]);

		const updateDateTime = useCallback<NonNullable<ReactDatePickerProps['onCalendarClose']>>(() => {
			setDateTime({ type: 'UPDATE' });
		}, [setDateTime]);

		return (
			<Styler orientation="horizontal" height="fit" mainAlignment="flex-start">
				<DatePicker
					showPopperArrow={false}
					selected={dateTime}
					onChange={onValueChange}
					showTimeSelect={includeTime}
					timeFormat={timeFormat}
					timeIntervals={timeIntervals}
					timeCaption={timeLabel}
					dateFormat={dateFormat}
					disabled={disabled}
					customInput={CustomComponent ? <CustomComponent /> : defaultInputComponent}
					ref={ref}
					placeholderText={label}
					onCalendarClose={updateDateTime}
					onSelect={updateDateTime}
					onBlur={updateDateTime}
					{...datePickerProps}
				/>
			</Styler>
		);
	}
);

export { DateTimePicker, DateTimePickerProps, getDefaultLocale, setDefaultLocale, registerLocale };
