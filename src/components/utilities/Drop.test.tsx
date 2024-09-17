/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { act, EventType, screen, within } from '@testing-library/react';

import { Drop } from './Drop';
import { setup } from '../../test-utils';

describe('Drop', () => {
	const OverlayAcceptDummy = <div>accept</div>;
	const OverlayDenyDummy = <div>deny</div>;

	function createBubbledEvent(type: Lowercase<EventType>, props?: unknown): Event {
		const event = new Event(type, { bubbles: true });
		Object.assign(event, props);
		return event;
	}

	function drop(element: HTMLElement, props?: Partial<React.DragEvent>): void {
		act(() => {
			element.dispatchEvent(
				createBubbledEvent('drop', {
					dataTransfer: {} as unknown as DataTransfer,
					...props
				} satisfies Partial<React.DragEvent>)
			);
		});
	}

	function dragEnter(
		toElement: HTMLElement,
		fromElement: HTMLElement | null,
		props?: Partial<React.DragEvent>
	): void {
		act(() => {
			toElement.dispatchEvent(
				createBubbledEvent('dragenter', {
					dataTransfer: {} as unknown as DataTransfer,
					...props,
					relatedTarget: fromElement
				} satisfies Partial<React.DragEvent>)
			);
		});
	}

	function dragOver(element: HTMLElement, props?: Partial<React.DragEvent>): void {
		act(() => {
			element.dispatchEvent(
				createBubbledEvent('dragover', {
					dataTransfer: {} as unknown as DataTransfer,
					...props
				} satisfies Partial<React.DragEvent>)
			);
		});
	}

	function dragLeave(
		fromElement: HTMLElement,
		toElement: HTMLElement | null,
		props?: Partial<React.DragEvent>
	): void {
		act(() => {
			fromElement.dispatchEvent(
				createBubbledEvent('dragleave', {
					dataTransfer: {} as unknown as DataTransfer,
					...props,
					relatedTarget: toElement
				} satisfies Partial<React.DragEvent>)
			);
		});
	}

	test('should show the accept overlay if the type match', async () => {
		window.draggedItem = {
			data: {
				id: 1
			},
			type: 'accept',
			event: {} as unknown as React.DragEvent<HTMLDivElement>
		};

		setup(
			<Drop
				acceptType={['accept']}
				overlayAcceptComponent={OverlayAcceptDummy}
				overlayDenyComponent={OverlayDenyDummy}
			>
				<div>Dropzone</div>
			</Drop>
		);
		const dropzone = screen.getByTestId('drop');
		expect(dropzone).toBeVisible();
		dragEnter(dropzone, null);
		const overlay = await screen.findByText('accept');
		expect(overlay).toBeVisible();
	});

	test('should keep the overlay visible when the drag enter the overlay and leave the dropzone', async () => {
		window.draggedItem = {
			data: {
				id: 1
			},
			type: 'accept',
			event: {} as unknown as React.DragEvent<HTMLDivElement>
		};

		setup(
			<Drop
				acceptType={['accept']}
				overlayAcceptComponent={OverlayAcceptDummy}
				overlayDenyComponent={OverlayDenyDummy}
			>
				<div>Dropzone</div>
			</Drop>
		);
		const dropzone = screen.getByTestId('drop');
		expect(dropzone).toBeVisible();
		dragEnter(dropzone, null);
		const overlay = await screen.findByText('accept');
		dragEnter(overlay, dropzone);
		dragLeave(dropzone, overlay);
		expect(await screen.findByText('accept')).toBeVisible();
	});

	test('should keep the overlay visible when the drag is over the overlay', async () => {
		window.draggedItem = {
			data: {
				id: 1
			},
			type: 'accept',
			event: {} as unknown as React.DragEvent<HTMLDivElement>
		};

		setup(
			<Drop
				acceptType={['accept']}
				overlayAcceptComponent={OverlayAcceptDummy}
				overlayDenyComponent={OverlayDenyDummy}
			>
				<div>Dropzone</div>
			</Drop>
		);
		const dropzone = screen.getByTestId('drop');
		expect(dropzone).toBeVisible();
		dragEnter(dropzone, null);
		dragOver(dropzone);
		const overlay = await screen.findByText('accept');
		dragEnter(overlay, dropzone);
		dragLeave(dropzone, overlay);
		dragOver(overlay);
		expect(await screen.findByText('accept')).toBeVisible();
	});

	test('should show the deny overlay if the type does not match', async () => {
		window.draggedItem = {
			data: {
				id: 1
			},
			type: 'wrong',
			event: {} as unknown as React.DragEvent<HTMLDivElement>
		};

		setup(
			<Drop
				acceptType={['accept']}
				overlayAcceptComponent={OverlayAcceptDummy}
				overlayDenyComponent={OverlayDenyDummy}
			>
				<div>Dropzone</div>
			</Drop>
		);
		const dropzone = screen.getByTestId('drop');
		expect(dropzone).toBeVisible();
		dragEnter(dropzone, null);
		const overlay = await screen.findByText('deny');
		expect(overlay).toBeVisible();
	});

	test.each(['accept', 'deny'])(
		'should hide the %s overlay when the drag leave the dropzone',
		async (overlayType) => {
			window.draggedItem = {
				data: {
					id: 1
				},
				type: overlayType,
				event: {} as unknown as React.DragEvent<HTMLDivElement>
			};

			setup(
				<Drop
					acceptType={['accept']}
					overlayAcceptComponent={OverlayAcceptDummy}
					overlayDenyComponent={OverlayDenyDummy}
				>
					<div>Dropzone</div>
				</Drop>
			);
			const dropzone = screen.getByTestId('drop');
			dragEnter(dropzone, null);
			await screen.findByText(overlayType);
			dragLeave(dropzone, null);
			expect(screen.queryByText(overlayType)).not.toBeInTheDocument();
		}
	);

	test('should hide overlay when drop happens inside the dropzone', async () => {
		window.draggedItem = {
			data: {
				id: 1
			},
			type: 'accept',
			event: {} as unknown as React.DragEvent<HTMLDivElement>
		};

		setup(
			<Drop
				acceptType={['accept']}
				overlayAcceptComponent={OverlayAcceptDummy}
				overlayDenyComponent={OverlayDenyDummy}
			>
				<div>Dropzone</div>
			</Drop>
		);
		const dropzone = screen.getByTestId('drop');
		dragEnter(dropzone, null);
		await screen.findByText('accept');
		drop(dropzone);
		expect(screen.queryByText('accept')).not.toBeInTheDocument();
	});

	// FIXME(characterization test): it might happen that the dragLeave is never fired, but a dragEnter happens somewhere else.
	// 	It probably makes sense that the dropzone overlay becomes hidden in this situation
	test('should not hide overlay when drop happens outside the dropzone and the dragLeave event is not fired', async () => {
		window.draggedItem = {
			data: {
				id: 1
			},
			type: 'accept',
			event: {} as unknown as React.DragEvent<HTMLDivElement>
		};

		setup(
			<Drop
				acceptType={['accept']}
				overlayAcceptComponent={OverlayAcceptDummy}
				overlayDenyComponent={OverlayDenyDummy}
			>
				<div>Dropzone</div>
			</Drop>
		);
		const dropzone = screen.getByTestId('drop');
		dragEnter(dropzone, null);
		await screen.findByText('accept');
		drop(window.document.body);
		expect(screen.getByText('accept')).toBeVisible();
	});

	test('should not block events of nested elements when drop happens outside the dropzone', async () => {
		const onClickFn = jest.fn();
		window.draggedItem = {
			data: {
				id: 1
			},
			type: 'accept',
			event: {} as unknown as React.DragEvent<HTMLDivElement>
		};
		const { user } = setup(
			<Drop
				acceptType={['accept']}
				overlayAcceptComponent={OverlayAcceptDummy}
				overlayDenyComponent={OverlayDenyDummy}
			>
				<button onClick={onClickFn}>Nested button</button>
			</Drop>
		);
		const dropzone = screen.getByTestId('drop');
		dragEnter(dropzone, null);
		await screen.findByText('accept');
		dragLeave(dropzone, null);
		drop(window.document.body);
		await user.click(screen.getByRole('button', { name: /nested button/i }));
		expect(onClickFn).toHaveBeenCalled();
	});

	// FIXME(characterization test): this is also related to the dragLeave event that sometimes is not fired.
	//  We need to cover this case
	test('should not hide dropzone overlay if another target is reached even without a dragLeave event', async () => {
		window.draggedItem = {
			data: {
				id: 1
			},
			type: 'accept',
			event: {} as unknown as React.DragEvent<HTMLDivElement>
		};
		setup(
			<>
				<div data-testid="dropzone1">
					<Drop
						acceptType={['accept']}
						overlayAcceptComponent={OverlayAcceptDummy}
						overlayDenyComponent={OverlayDenyDummy}
					>
						<div>Dropzone 1</div>
					</Drop>
				</div>
				<div data-testid="dropzone2">
					<Drop
						acceptType={['deny']}
						overlayAcceptComponent={OverlayAcceptDummy}
						overlayDenyComponent={OverlayDenyDummy}
					>
						<div>Dropzone 2</div>
					</Drop>
				</div>
			</>
		);

		const dropzone1 = within(screen.getByTestId('dropzone1')).getByTestId('drop');
		const dropzone2 = within(screen.getByTestId('dropzone2')).getByTestId('drop');
		expect(dropzone1).toBeVisible();
		expect(dropzone2).toBeVisible();
		dragEnter(dropzone1, null);
		await screen.findByText('accept');
		expect(within(dropzone1).getByText('accept')).toBeVisible();
		dragEnter(dropzone2, dropzone1);
		// the dropzone2 is shown
		await screen.findByText('deny');
		// both dropzone are visible
		expect(within(dropzone2).getByText('deny')).toBeVisible();
		expect(within(dropzone1).getByText('accept')).toBeVisible();
	});

	// TODO(characterization test): it probably makes sense to hide the external dropzone and show only the nested one
	test('should not hide dropzone overlay if a nested dropzone is reached', async () => {
		window.draggedItem = {
			type: 'type1',
			data: { id: 1 },
			event: {} as unknown as React.DragEvent<HTMLDivElement>
		};
		setup(
			<div data-testid="dropzone1">
				<Drop
					acceptType={['type1']}
					overlayAcceptComponent={OverlayAcceptDummy}
					overlayDenyComponent={OverlayDenyDummy}
				>
					<div>
						<div>Dropzone 1</div>
						<div data-testid="dropzone2">
							<Drop
								acceptType={['type1']}
								overlayAcceptComponent={OverlayAcceptDummy}
								overlayDenyComponent={OverlayDenyDummy}
							>
								<div>Dropzone 2</div>
							</Drop>
						</div>
						<div data-testid="dropzone3">
							<Drop
								acceptType={['type2']}
								overlayAcceptComponent={OverlayAcceptDummy}
								overlayDenyComponent={OverlayDenyDummy}
							>
								<div>Dropzone 3</div>
							</Drop>
						</div>
					</div>
				</Drop>
			</div>
		);

		const dropzone1 = within(screen.getByTestId('dropzone1')).getAllByTestId('drop')[0];
		const dropzone2 = within(screen.getByTestId('dropzone2')).getByTestId('drop');
		const dropzone3 = within(screen.getByTestId('dropzone3')).getByTestId('drop');
		expect(dropzone1).toBeVisible();
		expect(dropzone2).toBeVisible();
		expect(dropzone3).toBeVisible();
		dragEnter(dropzone1, null);
		expect(await within(dropzone1).findByText('accept')).toBeVisible();
		dragEnter(dropzone2, dropzone1);
		// dropzone2 is shown
		expect(await within(dropzone2).findByText('accept')).toBeVisible();
		// dropzone1 is still visible, resulting in 2 accept overlays
		const overlays = screen.getAllByText('accept');
		expect(overlays).toHaveLength(2);
		expect(overlays[0]).toBeVisible();
		expect(overlays[1]).toBeVisible();
		// enter dropzone 3, which is an invalid dropzone for the type defined in dataTransfer
		dragEnter(dropzone3, dropzone2);
		dragLeave(dropzone2, dropzone3);
		// overlay is removed from dropzone 2
		expect(within(dropzone2).queryByText('accept')).not.toBeInTheDocument();
		// and is shown for dropzone 3
		await screen.findByText('deny');
		expect(within(dropzone3).queryByText('deny')).toBeVisible();
		// dropzone 1 is still visible
		expect(screen.getByText('accept')).toBeVisible();
	});
});
