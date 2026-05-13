/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback, useEffect, useRef } from 'react';

import { Breadcrumbs } from './Breadcrumbs';

export const BreadcrumbsDragAndDrop = (): React.JSX.Element => {
	const collapserRef = useRef<HTMLElement | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const openRef = useRef<boolean>(false);

	const closeCollapser = useCallback((event: { defaultPrevented: boolean }) => {
		if (openRef.current && !event.defaultPrevented) {
			containerRef.current?.click();
			openRef.current = false;
		}
	}, []);

	const preventDropdownClose = useCallback((event: React.DragEvent<HTMLElement>) => {
		event.preventDefault();
	}, []);

	const dragEnterHandler = useCallback((event: React.DragEvent<HTMLElement>) => {
		const { currentTarget } = event;
		currentTarget.style.background = 'lightgray';
	}, []);

	const dragLeaveHandler = useCallback((event: React.DragEvent<HTMLElement>) => {
		const { currentTarget } = event;
		currentTarget.style.background = '';
	}, []);

	const dragOverHandler = useCallback((event: React.DragEvent<HTMLElement>) => {
		const { currentTarget } = event;
		currentTarget.style.background = 'lightgray';
		event.preventDefault();
	}, []);

	const dropHandler = useCallback((event: React.DragEvent<HTMLElement>) => {
		event.preventDefault();
		const { currentTarget } = event;
		const draggedData = event.dataTransfer.getData('text/plain');
		console.log('droppedData', draggedData, 'on', currentTarget);
		currentTarget.style.background = '';
	}, []);

	const dragStartHandler = useCallback((event: React.DragEvent<HTMLElement>) => {
		const { currentTarget } = event;
		event.dataTransfer.setData('text/plain', 'bla bla data to be drag-n-dropped');
		currentTarget.style.opacity = '0.5';
	}, []);

	const dragEndHandler = useCallback(
		(event: React.DragEvent<HTMLElement>) => {
			const { currentTarget } = event;
			currentTarget.style.opacity = '1';
			closeCollapser(event);
		},
		[closeCollapser]
	);

	const collapserDragEnterHandler = useCallback((event: React.DragEvent<HTMLElement>) => {
		event.preventDefault();
		const { currentTarget } = event;
		const alreadyOpen = openRef.current;
		currentTarget.style.background = 'lightgray';
		if (!alreadyOpen && currentTarget === event.target) {
			collapserRef.current = currentTarget;
			currentTarget.click();
			openRef.current = true;
		}
	}, []);

	const collapserDragLeaveHandler = useCallback((event: React.DragEvent<HTMLElement>) => {
		const { currentTarget } = event;
		currentTarget.style.background = '';
		event.preventDefault();
	}, []);

	const collapserDragOverHandler = useCallback((event: React.DragEvent<HTMLElement>) => {
		event.preventDefault();
		const { currentTarget } = event;
		currentTarget.style.background = 'lightgray';
	}, []);

	const collapserDropHandler = useCallback((event: React.DragEvent<HTMLElement>) => {
		const { currentTarget } = event;
		currentTarget.style.background = '';
		collapserRef.current?.click();
	}, []);

	useEffect(() => {
		document.addEventListener('dragenter', closeCollapser);

		return () => {
			document.removeEventListener('dragenter', closeCollapser);
		};
	}, [closeCollapser]);

	const crumbs = [
		{
			id: 'crumb-1',
			label: 'Goodnight',
			onClick: (): void => console.log('Goodnight'),
			onDragEnter: dragEnterHandler,
			onDragLeave: dragLeaveHandler,
			onDragOver: dragOverHandler,
			onDrop: dropHandler,
			style: { cursor: 'pointer', borderRadius: '0.125rem' }
		},
		{
			id: 'crumb-2',
			label: 'Hello',
			onClick: (): void => console.log('Hello'),
			onDragEnter: dragEnterHandler,
			onDragLeave: dragLeaveHandler,
			onDragOver: dragOverHandler,
			onDrop: dropHandler,
			style: { cursor: 'pointer', borderRadius: '0.125rem' }
		},
		{
			id: 'crumb-3',
			label: 'AAAAAA',
			onClick: (): void => console.log('AAAAAA'),
			onDragEnter: dragEnterHandler,
			onDragLeave: dragLeaveHandler,
			onDragOver: dragOverHandler,
			onDrop: dropHandler,
			style: { cursor: 'pointer', borderRadius: '0.125rem' }
		},
		{
			id: 'crumb-4',
			label: 'Goodbye',
			onClick: (): void => console.log('Goodbye'),
			onDragEnter: dragEnterHandler,
			onDragLeave: dragLeaveHandler,
			onDragOver: dragOverHandler,
			onDrop: dropHandler,
			style: { cursor: 'pointer', borderRadius: '0.125rem' }
		},
		{
			id: 'crumb-5',
			label: 'Ok',
			onClick: (): void => console.log('Ok'),
			onDragEnter: dragEnterHandler,
			onDragLeave: dragLeaveHandler,
			onDragOver: dragOverHandler,
			onDrop: dropHandler,
			style: { cursor: 'pointer', borderRadius: '0.125rem' }
		}
	];

	return (
		<div ref={containerRef}>
			<div
				draggable
				style={{ border: '0.0625rem solid red', width: 'fit-content' }}
				onDragStart={dragStartHandler}
				onDragEnd={dragEndHandler}
			>
				Drag me
			</div>
			<div style={{ padding: '0.625rem', border: '0.0625rem solid gray', margin: '0.625rem 0' }}>
				<Breadcrumbs
					crumbs={crumbs}
					collapserProps={{
						onDragEnter: collapserDragEnterHandler,
						onDragOver: collapserDragOverHandler,
						onDragLeave: collapserDragLeaveHandler,
						onDrop: collapserDropHandler,
						style: { cursor: 'pointer', borderRadius: '0.125rem' }
					}}
					dropdownProps={{
						onDragEnter: preventDropdownClose
					}}
				/>
			</div>
			<h3>Collapsed</h3>
			<div
				style={{
					width: '12.5rem',
					maxWidth: '100%',
					padding: '0.625rem',
					border: '0.0625rem solid gray',
					margin: '0.625rem 0',
					boxSizing: 'border-box'
				}}
				onDragEnter={preventDropdownClose}
			>
				<Breadcrumbs
					crumbs={crumbs}
					collapserProps={{
						onDragEnter: collapserDragEnterHandler,
						onDragOver: collapserDragOverHandler,
						onDragLeave: collapserDragLeaveHandler,
						onDrop: collapserDropHandler,
						style: { cursor: 'pointer', borderRadius: '0.125rem' }
					}}
					dropdownProps={{
						onDragEnter: preventDropdownClose
					}}
				/>
			</div>
		</div>
	);
};
