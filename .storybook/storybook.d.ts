import '@storybook/csf';

declare module '@storybook/csf' {
    interface Globals {
        isDarkModeEnabled: boolean | undefined
    }
}