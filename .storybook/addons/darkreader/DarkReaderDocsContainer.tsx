import React from 'react';
import { DocsContainer } from "@storybook/blocks";
import { useEffect } from "react";
import { disable, enable } from "darkreader";
import { Globals } from '@storybook/csf'

export const DarkReaderDocsContainer = ({ children, context, ...rest }: React.ComponentProps<typeof DocsContainer> & { context: { store: { userGlobals: { globals: Globals }} } })=> {
    const isDarkModeEnabled = context.store.userGlobals.globals.isDarkModeEnabled

    useEffect(() => {
        isDarkModeEnabled ? enable({}) : disable()
    }, [isDarkModeEnabled]);

    return <DocsContainer context={context} {...rest}>{children}</DocsContainer>
};