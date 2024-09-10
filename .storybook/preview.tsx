import React, {useEffect} from 'react'

import { ThemeProvider } from '../src';
import { StoryFn, Preview } from '@storybook/react';
import { DocsContainer, DocsContextProps } from "@storybook/blocks";
import {auto, disable, enable} from "darkreader";

interface ContainerProps {
	children: React.ReactNode,
	context: DocsContextProps
}

export const decorators = [
	(Story: StoryFn) => (
		<ThemeProvider>
			<Story />
		</ThemeProvider>
	)
];

const preview: Preview = {
	initialGlobals: {
		isDarkMode: false
	},
	parameters: {
		actions: { argTypesRegex: '^on.*' },
		docs: {
			container: ({ children, context }: ContainerProps) => {
				const { globals } = (context as any).store.globals;
				const isDarkModeEnabled = globals.isDarkMode;
				useEffect(() => {
					if (isDarkModeEnabled) {
						auto(false);
						enable({ sepia: -10 });
					} else {
						auto(false);
						disable();
					}
				}, [isDarkModeEnabled]);

				return (
					<DocsContainer context={context}>{children}</DocsContainer>
				)
			}
		}
	}
};

export default preview;

