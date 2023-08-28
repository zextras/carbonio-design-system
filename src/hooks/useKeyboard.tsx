/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useEffect, useMemo } from 'react';

import { map, forEach, noop } from 'lodash';

type HtmlElementKeyboardEventKey = {
	[K in keyof HTMLElementEventMap]: HTMLElementEventMap[K] extends KeyboardEvent ? K : never;
}[keyof HTMLElementEventMap];

type NativeKeyboardEventHandler = (event: KeyboardEvent) => void;
type ElementType = 'listItem' | 'button' | 'list' | 'chipInputKeys';
type KeyboardPresetObj = {
	type: HtmlElementKeyboardEventKey;
	callback: NativeKeyboardEventHandler;
	keys: string[];
	modifier?: boolean;
	haveToPreventDefault?: boolean;
};
type KeyboardPreset = Array<KeyboardPresetObj>;

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

function getListItemKeyboardPreset(
	callback: NativeKeyboardEventHandler,
	modifier?: boolean
): KeyboardPreset {
	return [
		{
			type: 'keypress',
			callback,
			keys: ['Enter', 'NumpadEnter'],
			modifier
		}
	];
}

function getButtonKeyboardPreset(
	callback: NativeKeyboardEventHandler,
	modifier?: boolean
): KeyboardPreset {
	return [
		{ type: 'keyup', callback, keys: ['Space'], modifier },
		{
			type: 'keypress',
			callback: (e) => e.preventDefault(),
			keys: ['Space'],
			modifier
		},
		{
			type: 'keypress',
			callback,
			keys: ['Enter', 'NumpadEnter'],
			modifier
		}
	];
}

function getListKeyboardPreset(
	ref: React.RefObject<HTMLElement> | undefined,
	modifier?: boolean
): KeyboardPreset {
	return [
		{
			type: 'keydown',
			callback: () => handleArrowUp(ref),
			keys: ['ArrowUp'],
			modifier
		},
		{
			type: 'keydown',
			callback: () => handleArrowDown(ref),
			keys: ['ArrowDown'],
			modifier
		},
		{
			type: 'keydown',
			callback: () => handleCtrlArrowUp(ref),
			keys: ['ArrowUp'],
			modifier: true
		},
		{
			type: 'keydown',
			callback: () => handleCtrlArrowDown(ref),
			keys: ['ArrowDown'],
			modifier: true
		},
		{
			type: 'keydown',
			callback: () => handleEscape(ref),
			keys: ['Escape'],
			modifier
		},
		{
			type: 'keydown',
			callback: () => handleEnter(ref),
			keys: ['Enter', 'NumpadEnter'],
			modifier
		}
	];
}

function getKeyboardPreset(
	type: 'listItem',
	callback: NativeKeyboardEventHandler,
	ref?: undefined,
	keys?: undefined,
	modifier?: boolean
): KeyboardPreset;
function getKeyboardPreset(
	type: 'button',
	callback: NativeKeyboardEventHandler,
	ref?: undefined,
	keys?: undefined,
	modifier?: boolean
): KeyboardPreset;
function getKeyboardPreset(
	type: 'list',
	callback: undefined,
	ref: React.RefObject<HTMLElement>,
	keys?: undefined,
	modifier?: boolean
): KeyboardPreset;
function getKeyboardPreset(
	type: 'chipInputKeys',
	callback: NativeKeyboardEventHandler,
	ref?: undefined,
	keys?: string[],
	modifier?: boolean
): KeyboardPreset;
function getKeyboardPreset(
	type: ElementType,
	callback: NativeKeyboardEventHandler | undefined = noop,
	ref: React.RefObject<HTMLElement> | undefined = undefined,
	keys: string[] = [],
	modifier = false
): KeyboardPreset {
	switch (type) {
		case 'listItem':
			return getListItemKeyboardPreset(callback, modifier);
		case 'button':
			return getButtonKeyboardPreset(callback, modifier);
		case 'list':
			return getListKeyboardPreset(ref, modifier);
		case 'chipInputKeys':
			return [{ type: 'keypress', callback, keys, modifier }];
		default:
			return [];
	}
}

function useKeyboard(
	ref: React.RefObject<HTMLElement>,
	events: KeyboardPreset,
	registerListener = true
): void {
	const keyEvents = useMemo(
		() =>
			map<KeyboardPresetObj, NativeKeyboardEventHandler>(
				events,
				({ keys, modifier = false, callback, haveToPreventDefault = true }) =>
					(e): void => {
						if (
							!keys.length ||
							(keys.includes(e.key) && modifier === e.ctrlKey) ||
							(keys.includes(e.code) && modifier === e.ctrlKey)
						) {
							if (haveToPreventDefault) {
								e.preventDefault();
							}
							callback(e);
						}
					}
			),
		[events]
	);

	useEffect(() => {
		const refSave = ref.current;
		if (refSave && registerListener) {
			forEach(keyEvents, (keyEvent, index) => {
				refSave.addEventListener(events[index].type, keyEvent);
			});
		}
		return (): void => {
			if (refSave) {
				forEach(keyEvents, (keyEvent, index) => {
					refSave.removeEventListener(events[index].type, keyEvent);
				});
			}
		};
	}, [events, keyEvents, ref, registerListener]);
}

export { useKeyboard, getKeyboardPreset, KeyboardPreset };
