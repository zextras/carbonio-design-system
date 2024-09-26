import { useGlobals } from "storybook/internal/preview-api";
import type { Renderer, PartialStoryFn as StoryFunction } from "storybook/internal/types";
import { useEffect } from "react";
import { disable, enable } from "darkreader";

export const withDarkreader = (StoryFn: StoryFunction<Renderer>) => {
    const [globals] = useGlobals();
    const isDarkModeEnabled = globals.isDarkModeEnabled;

    useEffect(() => {
        isDarkModeEnabled ? enable({}) : disable();
    }, [isDarkModeEnabled]);

    return StoryFn()
};