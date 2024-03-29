/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useEffect, useMemo } from 'react';

import { map, forEach, some, isMatch } from 'lodash';

import { RequireAtLeastOne } from '../typeUtils';

type HtmlElementKeyboardEventKey = {
	[K in keyof HTMLElementEventMap]: HTMLElementEventMap[K] extends KeyboardEvent ? K : never;
}[keyof HTMLElementEventMap];

type ElementType = 'listItem' | 'button' | 'list' | 'chipInputKeys' | 'chipInputSpace';
type KeyboardPresetKey = Partial<
	Pick<KeyboardEvent, 'ctrlKey' | 'altKey' | 'metaKey' | 'shiftKey'>
> &
	RequireAtLeastOne<Pick<KeyboardEvent, 'key' | 'code'>>;
type KeyboardPresetObj = {
	type: HtmlElementKeyboardEventKey;
	callback: (e: KeyboardEvent) => void;
	keys: KeyboardPresetKey[];
	haveToPreventDefault?: boolean;
};

function getFocusableElement(
	focusedElement: HTMLElement,
	direction: 'previousElementSibling' | 'nextElementSibling'
): HTMLElement | null {
	const siblingElement = focusedElement[direction] as HTMLElement | null;
	if (!siblingElement) {
		return null;
	}
	if (siblingElement.tabIndex >= 0) {
		return focusedElement[direction] as HTMLElement;
	}
	return getFocusableElement(siblingElement, direction);
}

function getKeyboardPreset(
	type: ElementType,
	callback: (e: KeyboardEvent) => void,
	ref: React.MutableRefObject<HTMLElement | null> | undefined = undefined,
	keys: KeyboardPresetObj['keys'] = []
): KeyboardPresetObj[] {
	function handleArrowUp(): void {
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

	function handleArrowDown(): void {
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

	function handleEscape(): void {
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

	const handleEnter = (): void => {
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

	function handleCtrlArrowUp(): void {
		if (ref?.current) {
			const firstChild = ref.current.querySelector<HTMLElement>('[tabindex]:first-child');
			firstChild && firstChild.focus();
		}
	}

	function handleCtrlArrowDown(): void {
		if (ref?.current) {
			const lastChild = ref.current.querySelector<HTMLElement>('[tabindex]:last-child');
			lastChild && lastChild.focus();
		}
	}

	const eventsArray: KeyboardPresetObj[] = [];
	switch (type) {
		case 'listItem': {
			eventsArray.push({
				type: 'keypress',
				callback,
				keys: [{ key: 'Enter', ctrlKey: false }]
			});
			break;
		}
		case 'button': {
			eventsArray.push({ type: 'keyup', callback, keys: [{ code: 'Space', ctrlKey: false }] });
			eventsArray.push({
				type: 'keypress',
				callback: (e: KeyboardEvent) => e.preventDefault(),
				keys: [{ code: 'Space', ctrlKey: false }]
			});
			eventsArray.push({
				type: 'keypress',
				callback,
				keys: [{ key: 'Enter', ctrlKey: false }]
			});
			break;
		}
		case 'list': {
			eventsArray.push({
				type: 'keydown',
				callback: handleArrowUp,
				keys: [{ key: 'ArrowUp', ctrlKey: false }]
			});
			eventsArray.push({
				type: 'keydown',
				callback: handleArrowDown,
				keys: [{ key: 'ArrowDown', ctrlKey: false }]
			});
			eventsArray.push({
				type: 'keydown',
				callback: handleCtrlArrowUp,
				keys: [{ key: 'ArrowUp', ctrlKey: true }]
			});
			eventsArray.push({
				type: 'keydown',
				callback: handleCtrlArrowDown,
				keys: [{ key: 'ArrowDown', ctrlKey: true }]
			});
			eventsArray.push({
				type: 'keydown',
				callback: handleEscape,
				keys: [{ key: 'Escape', ctrlKey: false }]
			});
			eventsArray.push({
				type: 'keydown',
				callback: handleEnter,
				keys: [{ key: 'Enter', ctrlKey: false }]
			});

			break;
		}
		case 'chipInputKeys': {
			eventsArray.push({ type: 'keydown', callback, keys });
			break;
		}
		default: {
			break;
		}
	}
	return eventsArray;
}

/**
 * Attach listeners for the given presets to the given ref.
 *
 * Note:
 * a preset with the `keys` field set to an empty array is considered an event for any keyboard key.
 * To avoid having listeners registered on the keyboard events, provide an empty presets array.
 */
function useKeyboard(ref: React.RefObject<HTMLElement>, presets: KeyboardPresetObj[]): void {
	const keyboardListeners = useMemo(
		() =>
			map<KeyboardPresetObj, (e: KeyboardEvent) => void>(
				presets,
				({ keys, callback, haveToPreventDefault = true }) =>
					(e) => {
						if (keys.length === 0 || some(keys, (key) => isMatch(e, key))) {
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
		if (ref.current) {
			forEach(keyboardListeners, (listener, index) => {
				ref.current?.addEventListener(presets[index].type, listener);
			});
		}
		const refSave = ref.current;
		return (): void => {
			if (refSave) {
				forEach(keyboardListeners, (listener, index) => {
					refSave.removeEventListener(presets[index].type, listener);
				});
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [presets, keyboardListeners, ref, ref.current]);
}

export { useKeyboard, getKeyboardPreset, type KeyboardPresetObj, type KeyboardPresetKey };
