/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useEffect, useMemo } from 'react';

import { isMatch } from 'lodash';

import { RequireAtLeastOne } from '../types/utils';

type HtmlElementKeyboardEventKey = {
	[K in keyof HTMLElementEventMap]: HTMLElementEventMap[K] extends KeyboardEvent ? K : never;
}[keyof HTMLElementEventMap];

type NativeKeyboardEventHandler = (event: KeyboardEvent) => void;
type ElementType = 'listItem' | 'button' | 'list' | 'chipInputKeys';
type KeyboardPresetKey = Partial<
	Pick<KeyboardEvent, 'ctrlKey' | 'altKey' | 'metaKey' | 'shiftKey'>
> &
	RequireAtLeastOne<Pick<KeyboardEvent, 'key' | 'code'>>;
type KeyboardPresetObj = {
	type: HtmlElementKeyboardEventKey;
	callback: NativeKeyboardEventHandler;
	keys: KeyboardPresetKey[];
	haveToPreventDefault?: boolean;
};

function getFocusableElement(
	focusedElement: HTMLElement,
	direction: 'previousElementSibling' | 'nextElementSibling'
): HTMLElement | null {
	const siblingElement = focusedElement[direction];
	if (!(siblingElement instanceof HTMLElement)) {
		return null;
	}
	if (siblingElement.tabIndex >= 0) {
		return siblingElement;
	}
	return getFocusableElement(siblingElement, direction);
}

function handleArrowUp(ref?: React.RefObject<HTMLElement>): void {
	if (ref?.current) {
		const focusedElement = ref.current.querySelector<HTMLElement>('[tabindex]:focus');
		if (focusedElement) {
			const prevEl = getFocusableElement(focusedElement, 'previousElementSibling');
			if (prevEl) {
				prevEl.focus();
			} else {
				const lastChild = ref.current.querySelector<HTMLElement>('[tabindex]:last-child');
				lastChild && lastChild.focus();
			}
		} else {
			const firstChild = ref.current.querySelector<HTMLElement>('[tabindex]:first-child');
			firstChild && firstChild.focus();
		}
	}
}

function handleArrowDown(ref?: React.RefObject<HTMLElement>): void {
	if (ref?.current) {
		const focusedElement = ref.current.querySelector<HTMLElement>('[tabindex]:focus');
		if (focusedElement) {
			const nextEl = getFocusableElement(focusedElement, 'nextElementSibling');
			if (nextEl) {
				nextEl.focus();
			} else {
				const firstChild = ref.current.querySelector<HTMLElement>('[tabindex]:first-child');
				firstChild && firstChild.focus();
			}
		} else {
			const firstChild = ref.current.querySelector<HTMLElement>('[tabindex]:first-child');
			firstChild && firstChild.focus();
		}
	}
}

function handleEscape(ref?: React.RefObject<HTMLElement>): void {
	if (ref?.current) {
		const focusedElement = ref.current.querySelector<HTMLElement>('[tabindex]:focus');
		if (focusedElement) {
			focusedElement.blur();
		}
	}
}

const findFirstChildWithClick = (element: HTMLElement): HTMLElement => {
	let result = element;
	while (!result?.onclick && result !== null) {
		result = result.firstElementChild as HTMLElement;
	}
	return result;
};

const handleEnter = (ref?: React.RefObject<HTMLElement>): void => {
	if (ref?.current) {
		const focusedElement = ref.current.querySelector<HTMLElement>('[tabindex]:focus');
		if (focusedElement) {
			const firstChild = findFirstChildWithClick(focusedElement);
			if (firstChild) {
				firstChild.click();
			}
		}
	}
};

function handleCtrlArrowUp(ref?: React.RefObject<HTMLElement>): void {
	if (ref?.current) {
		const firstChild = ref.current.querySelector<HTMLElement>('[tabindex]:first-child');
		firstChild && firstChild.focus();
	}
}

function handleCtrlArrowDown(ref?: React.RefObject<HTMLElement>): void {
	if (ref?.current) {
		const lastChild = ref.current.querySelector<HTMLElement>('[tabindex]:last-child');
		lastChild && lastChild.focus();
	}
}

function getListItemKeyboardPreset(callback: NativeKeyboardEventHandler): KeyboardPresetObj[] {
	return [
		{
			type: 'keypress',
			callback,
			keys: [{ key: 'Enter', ctrlKey: false }]
		}
	];
}

function getButtonKeyboardPreset(callback: NativeKeyboardEventHandler): KeyboardPresetObj[] {
	return [
		{ type: 'keyup', callback, keys: [{ code: 'Space', ctrlKey: false }] },
		{
			type: 'keypress',
			callback: (e: KeyboardEvent) => e.preventDefault(),
			keys: [{ code: 'Space', ctrlKey: false }]
		},
		{
			type: 'keypress',
			callback,
			keys: [{ key: 'Enter', ctrlKey: false }]
		}
	];
}

function getListKeyboardPreset(ref: React.RefObject<HTMLElement> | undefined): KeyboardPresetObj[] {
	return [
		{
			type: 'keydown',
			callback: () => handleArrowUp(ref),
			keys: [{ key: 'ArrowUp', ctrlKey: false }]
		},
		{
			type: 'keydown',
			callback: () => handleArrowDown(ref),
			keys: [{ key: 'ArrowDown', ctrlKey: false }]
		},
		{
			type: 'keydown',
			callback: () => handleCtrlArrowUp(ref),
			keys: [{ key: 'ArrowUp', ctrlKey: true }]
		},
		{
			type: 'keydown',
			callback: () => handleCtrlArrowDown(ref),
			keys: [{ key: 'ArrowDown', ctrlKey: true }]
		},
		{
			type: 'keydown',
			callback: () => handleEscape(ref),
			keys: [{ key: 'Escape', ctrlKey: false }]
		},
		{
			type: 'keydown',
			callback: () => handleEnter(ref),
			keys: [{ key: 'Enter', ctrlKey: false }]
		}
	];
}

function getKeyboardPreset(
	type: 'listItem',
	callback: NativeKeyboardEventHandler,
	ref?: undefined,
	keys?: undefined
): KeyboardPresetObj[];
function getKeyboardPreset(
	type: 'button',
	callback: NativeKeyboardEventHandler,
	ref?: undefined,
	keys?: undefined
): KeyboardPresetObj[];
function getKeyboardPreset(
	type: 'list',
	callback: undefined,
	ref: React.RefObject<HTMLElement>,
	keys?: undefined
): KeyboardPresetObj[];
function getKeyboardPreset(
	type: 'chipInputKeys',
	callback: NativeKeyboardEventHandler,
	ref?: undefined,
	keys?: KeyboardPresetObj['keys']
): KeyboardPresetObj[];
function getKeyboardPreset(
	type: ElementType,
	callback: NativeKeyboardEventHandler | undefined = (): void => undefined,
	ref: React.RefObject<HTMLElement> | undefined = undefined,
	keys: KeyboardPresetObj['keys'] = []
): KeyboardPresetObj[] {
	switch (type) {
		case 'listItem':
			return getListItemKeyboardPreset(callback);
		case 'button':
			return getButtonKeyboardPreset(callback);
		case 'list':
			return getListKeyboardPreset(ref);
		case 'chipInputKeys':
			return [{ type: 'keydown', callback, keys }];
		default:
			return [];
	}
}

/**
 * Attach listeners for the given presets to the given ref.
 *
 * Note:
 * a preset with the `keys` field set to an empty array is considered an event for any keyboard key.
 * To avoid having listeners registered on the keyboard events, provide an empty presets array.
 */
function useKeyboard(
	ref: React.RefObject<HTMLElement> | HTMLElement | null,
	presets: KeyboardPresetObj[],
	registerListener = true
): void {
	const keyboardListeners = useMemo(
		() =>
			presets.map<(e: KeyboardEvent) => void>(
				({ keys, callback, haveToPreventDefault = true }) =>
					(e) => {
						if (keys.length === 0 || keys.some((key) => isMatch(e, key))) {
							if (haveToPreventDefault) {
								e.preventDefault();
							}
							callback(e);
						}
					}
			),
		[presets]
	);

	useEffect(() => {
		const refSave = ref instanceof HTMLElement ? ref : ref?.current;
		if (refSave && registerListener) {
			keyboardListeners.forEach((listener, index) => {
				refSave.addEventListener(presets[index].type, listener);
			});
		}
		return (): void => {
			if (refSave) {
				keyboardListeners.forEach((listener, index) => {
					refSave.removeEventListener(presets[index].type, listener);
				});
			}
		};
	}, [presets, keyboardListeners, ref, registerListener]);
}

export { useKeyboard, getKeyboardPreset, type KeyboardPresetObj, type KeyboardPresetKey };
