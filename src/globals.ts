/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

interface DSWindow {
	draggedItem?: {
		event: React.DragEvent<HTMLDivElement>;
		data: Record<string, unknown>;
		type: string;
	};
}

declare global {
	interface Window extends DSWindow {}
}

export { DSWindow };
