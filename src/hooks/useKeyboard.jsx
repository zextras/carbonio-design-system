/*
 * Copyright (C) 2011-2019 ZeXtras
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useEffect, useMemo } from 'react';
import { map, forEach } from 'lodash';

function getFocusableElement(focusedElement, direction) {
	if (!focusedElement[direction]) {
		return null;
	}
	if (focusedElement[direction].tabIndex >= 0) {
		return focusedElement[direction];
	}
	return getFocusableElement(focusedElement[direction], direction);
}

const consoleLogKeySequence = (e) => {
	// console.log(
	// 	`keys pressed: %c  ${e.ctrlKey ? 'Ctrl/Cmd + ' : ''}${e.key} `,
	// 	'color: white; background: #39b654; border-radius: 5px; padding: 6px; width: 100%; font-size:24px; font-weight: 800'
	// );
};

export function getKeyboardPreset(type, callback, ref = undefined, keys = [], modifier = false) {
	function handleArrowUp(e) {
		const focusedElement = ref.current.querySelector('[tabindex]:focus');
		if (focusedElement) {
			const prevEl = getFocusableElement(focusedElement, 'previousElementSibling');
			if (prevEl) {
				consoleLogKeySequence(e);
				prevEl.focus();
			} else {
				ref.current.querySelector('[tabindex]:last-child').focus();
			}
		} else {
			ref.current.querySelector('[tabindex]:first-child').focus();
		}
	}
	function handleArrowDown(e) {
		const focusedElement = ref.current.querySelector('[tabindex]:focus');
		if (focusedElement) {
			const nextEl = getFocusableElement(focusedElement, 'nextElementSibling');
			if (nextEl) {
				consoleLogKeySequence(e);
				nextEl.focus();
			} else {
				ref.current.querySelector('[tabindex]:first-child').focus();
			}
		} else {
			ref.current.querySelector('[tabindex]:first-child').focus();
		}
	}
	function handleEscape(e) {
		const focusedElement = ref.current.querySelector('[tabindex]:focus');
		if (focusedElement) {
			consoleLogKeySequence(e);
			focusedElement.blur();
		}
	}

	function handleCtrlArrowUp(e) {
		consoleLogKeySequence(e);
		ref.current.querySelector('[tabindex]:first-child').focus();
	}

	function handleCtrlArrowDown(e) {
		consoleLogKeySequence(e);
		ref.current.querySelector('[tabindex]:last-child').focus();
	}

	const eventsArray = [];
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
				callback: (e) => e.preventDefault(),
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
				callback: (e) => e.preventDefault(),
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

export function useKeyboard(ref, events) {
	const keyEvents = useMemo(
		() =>
			map(events, ({ keys, modifier, callback, haveToPreventDefault = true }) => (e) => {
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
			}),
		[events]
	);

	useEffect(() => {
		if (ref.current) {
			forEach(keyEvents, (keyEvent, index) => {
				ref.current.addEventListener(events[index].type, keyEvent);
			});
		}
		const refSave = ref.current;
		return () => {
			if (refSave) {
				forEach(keyEvents, (keyEvent, index) => {
					refSave.removeEventListener(events[index].type, keyEvent);
				});
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [events, keyEvents, ref.current]);
}
