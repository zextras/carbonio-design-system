/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { addons, types } from '@storybook/addons';
import { ADDON_ID } from "../../../src/components/constants";
import { DarkMode } from "../../dark-mode";

addons.register(ADDON_ID, () => {
    addons.add(ADDON_ID, {
        title: 'Dark reader',
        type: types.TOOL,
        match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
        render: () => <DarkMode />
    });
});

