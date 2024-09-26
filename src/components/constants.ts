/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
export const INPUT_BACKGROUND_COLOR = 'gray5';
export const INPUT_DIVIDER_COLOR = 'gray3';

export const TIMERS = {
	MODAL: {
		DELAY_OPEN: 1
	},
	TOOLTIP: {
		REGISTER_LISTENER: 1,
		DELAY_SHOW: 500
	},
	DROPDOWN: {
		CLOSE_NESTED: 500
	},
	SNACKBAR: {
		DEFAULT_HIDE_TIMEOUT: 4000
	}
};

// see https://github.com/microsoft/tabster/blob/b5ebf6a9e7cc632427c2159a97c2e74c7e8c0c1c/src/Consts.ts#L9
export const FOCUSABLE_SELECTOR = [
	'a[href]',
	'button:not([disabled])',
	'input:not([disabled])',
	'select:not([disabled])',
	'textarea:not([disabled])',
	'*[tabindex]',
	'*[contenteditable]',
	'details > summary',
	'audio[controls]',
	'video[controls]'
].join(', ');

export const ADDON_ID = 'storybook/dark-mode';
export const TOOL_ID = `${ADDON_ID}/tool`;
