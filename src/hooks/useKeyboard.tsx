/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useEffect, useMemo } from 'react';
import { map, forEach } from 'lodash';

type HtmlElementKeyboardEventKey = {
	[K in keyof HTMLElementEventMap]: HTMLElementEventMap[K] extends KeyboardEvent ? K : never;
}[keyof HTMLElementEventMap];

type ElementType = 'listItem' | 'button' | 'list' | 'chipInputKeys' | 'chipInputSpace';
type KeyboardPresetObj = {
	type: HtmlElementKeyboardEventKey;
	callback: (e: KeyboardEvent) => void;
	keys: string[];
	modifier?: boolean;
	haveToPreventDefault?: boolean;
};
type KeyboardPreset = Array<KeyboardPresetObj>;

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
	keys: string[] = [],
	modifier = false
): KeyboardPreset {
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

	const eventsArray: KeyboardPreset = [];
	switch (type) {
		case 'listItem': {
			eventsArray.push({
				type: 'keypress',
				callback,
				keys: ['Enter', 'NumpadEnter'],
				modifier
			});
			break;
		}
		case 'button': {
			eventsArray.push({ type: 'keyup', callback, keys: ['Space'], modifier });
			eventsArray.push({
				type: 'keypress',
				callback: (e: KeyboardEvent) => e.preventDefault(),
				keys: ['Space'],
				modifier
			});
			eventsArray.push({
				type: 'keypress',
				callback,
				keys: ['Enter', 'NumpadEnter'],
				modifier
			});
			break;
		}
		case 'list': {
			eventsArray.push({
				type: 'keydown',
				callback: handleArrowUp,
				keys: ['ArrowUp'],
				modifier
			});
			eventsArray.push({
				type: 'keydown',
				callback: handleArrowDown,
				keys: ['ArrowDown'],
				modifier
			});
			eventsArray.push({
				type: 'keydown',
				callback: handleCtrlArrowUp,
				keys: ['ArrowUp'],
				modifier: true
			});
			eventsArray.push({
				type: 'keydown',
				callback: handleCtrlArrowDown,
				keys: ['ArrowDown'],
				modifier: true
			});
			eventsArray.push({
				type: 'keydown',
				callback: handleEscape,
				keys: ['Escape'],
				modifier
			});
			eventsArray.push({
				type: 'keydown',
				callback: handleEnter,
				keys: ['Enter', 'NumpadEnter'],
				modifier
			});

			break;
		}
		case 'chipInputKeys': {
			eventsArray.push({ type: 'keypress', callback, keys, modifier });
			break;
		}
		default: {
			break;
		}
	}
	return eventsArray;
}

function useKeyboard(ref: React.RefObject<HTMLElement>, events: KeyboardPreset): void {
	const keyEvents = useMemo(
		() =>
			map<KeyboardPresetObj, (e: KeyboardEvent) => void>(
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
		if (ref.current) {
			forEach(keyEvents, (keyEvent, index) => {
				ref.current && ref.current.addEventListener(events[index].type, keyEvent);
			});
		}
		const refSave = ref.current;
		return (): void => {
			if (refSave) {
				forEach(keyEvents, (keyEvent, index) => {
					refSave.removeEventListener(events[index].type, keyEvent);
				});
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [events, keyEvents, ref, ref.current]);
}

export { useKeyboard, getKeyboardPreset, KeyboardPreset };
