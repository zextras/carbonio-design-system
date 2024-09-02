/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { JSX, useCallback, useEffect, useMemo, useState } from 'react';

import { IconButton } from '@storybook/components';
import { MoonIcon, SunIcon } from '@storybook/icons';
import { auto, disable, enable, isEnabled } from 'darkreader';

export const DarkMode = (): JSX.Element => {
    const [mode, setMode] = useState('auto');

    useEffect(() => {
        switch (mode) {
            case 'light':
                auto(false);
                disable();
                break;
            case 'dark':
                auto(false);
                enable({ sepia: -10 });
                break;
            case 'auto':
            default:
                auto({});
                break;
        }
    }, [mode]);

    const DarkModeIcon = useCallback(() => {
        switch (mode) {
            case 'light':
                return <MoonIcon />;
            case 'dark':
                return <SunIcon />;
            case 'auto':
            default:
                return isEnabled() ? <SunIcon /> : <MoonIcon />;
        }
    }, [mode]);

    const next = useMemo(() => {
        switch (mode) {
            case 'light':
                return 'dark';
            case 'dark':
                return 'light';
            case 'auto':
            default:
                return isEnabled() ? 'light' : 'dark';
        }
    }, [mode]);

    const darkModeToggle = useCallback(() => {
        setMode(next);
    }, [next]);

    return (
        <IconButton title="dark mode" onClick={darkModeToggle}>
            <DarkModeIcon />
        </IconButton>
    );
};
