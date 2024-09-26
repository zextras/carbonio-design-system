/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { ADDON_ID, TOOL_ID } from "../../../src/components/constants";
import { DarkMode } from "./dark-mode";
import { addons, types } from "storybook/internal/manager-api";

addons.register(ADDON_ID, (api) => {
    addons.add(TOOL_ID, {
        title: 'Dark reader',
        type: types.TOOL,
        match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
        render: () => <DarkMode api={api} />
    });
});

