/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { DarkMode } from "./dark-mode";
import { addons, types } from "storybook/internal/manager-api";

const ADDON_ID = 'storybook/dark-mode';
const TOOL_ID = `${ADDON_ID}/tool`;

addons.register(ADDON_ID, () => {
    addons.add(TOOL_ID, {
        title: 'Dark reader',
        type: types.TOOL,
        match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
        render: () => <DarkMode />
    });
});

