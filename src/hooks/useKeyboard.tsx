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
	modifier: boolean;
	haveToPreventDefault?: boolean;
};
export type KeyboardPreset = Array<KeyboardPresetObj>;

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

const consoleLogKeySequence = (e: KeyboardEvent): void => {
	// console.log(
	// 	`keys pressed: %c  ${e.ctrlKey ? 'Ctrl/Cmd + ' : ''}${e.key} `,
	// 	'color: white; background: #39b654; border-radius: 5px; padding: 6px; width: 100%; font-size:24px; font-weight: 800'
	// );
};

export function getKeyboardPreset(
	type: ElementType,
	callback: (e: KeyboardEvent) => void,
	ref: React.MutableRefObject<HTMLElement> | undefined = undefined,
	keys: string[] = [],
	modifier = false
): KeyboardPreset {
	function handleArrowUp(e: KeyboardEvent): void {
		if (ref?.current) {
			const focusedElement = ref.current.querySelector<HTMLElement>('[tabindex]:focus');
			if (focusedElement) {
				const prevEl = getFocusableElement(focusedElement, 'previousElementSibling');
				if (prevEl) {
					consoleLogKeySequence(e);
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

	function handleArrowDown(e: KeyboardEvent): void {
		if (ref?.current) {
			const focusedElement = ref.current.querySelector<HTMLElement>('[tabindex]:focus');
			if (focusedElement) {
				const nextEl = getFocusableElement(focusedElement, 'nextElementSibling');
				if (nextEl) {
					consoleLogKeySequence(e);
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

	function handleEscape(e: KeyboardEvent): void {
		if (ref?.current) {
			const focusedElement = ref.current.querySelector<HTMLElement>('[tabindex]:focus');
			if (focusedElement) {
				consoleLogKeySequence(e);
				focusedElement.blur();
			}
		}
	}

	function handleCtrlArrowUp(e: KeyboardEvent): void {
		if (ref?.current) {
			consoleLogKeySequence(e);
			const firstChild = ref.current.querySelector<HTMLElement>('[tabindex]:first-child');
			firstChild && firstChild.focus();
		}
	}

	function handleCtrlArrowDown(e: KeyboardEvent): void {
		if (ref?.current) {
			consoleLogKeySequence(e);
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

			break;
		}
		case 'chipInputKeys': {
			eventsArray.push({ type: 'keypress', callback, keys, modifier });
			break;
		}
		case 'chipInputSpace': {
			eventsArray.push({ type: 'keyup', callback, keys: ['Space'], modifier });
			eventsArray.push({
				type: 'keypress',
				callback: (e: KeyboardEvent) => e.preventDefault(),
				keys: ['Space'],
				modifier
			});
			break;
		}
		default: {
			break;
		}
	}
	return eventsArray;
}

export function useKeyboard(ref: React.RefObject<HTMLElement>, events: KeyboardPreset): void {
	const keyEvents = useMemo(
		() =>
			map<KeyboardPresetObj, (e: KeyboardEvent) => void>(
				events,
				({ keys, modifier, callback, haveToPreventDefault = true }) =>
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
	}, [events, keyEvents, ref.current]);
}
