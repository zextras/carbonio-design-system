/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/** Basic components */
export * from './components/basic/Avatar';
export * from './components/basic/Badge';
export * from './components/basic/Button';
export * from './components/temp/Button';
export * from './components/basic/Icon';
export * from './components/basic/Link';
export * from './components/basic/LoadMore';
export * from './components/basic/FormSection';
export * from './components/basic/Text';
export * from './components/basic/TextWithTooltip';
export * from './components/basic/Spinner';
/** Layout components */
export * from './components/layout/Container';
export * from './components/layout/Divider';
export * from './components/layout/Padding';
export * from './components/layout/Paragraph';
export * from './components/layout/Row';

/** Inputs components */
export * from './components/inputs/Checkbox';
export * from './components/inputs/ChipInput';
export * from './components/inputs/EmailComposerInput';
export * from './components/inputs/FileLoader';
export * from './components/inputs/IconButton';
export * from './components/inputs/IconCheckbox';
export * from './components/inputs/MultiButton';
export * from './components/inputs/Input';
export * from './components/inputs/PasswordInput';
export * from './components/inputs/Radio';
export * from './components/inputs/RadioGroup';
export * from './components/inputs/SearchInput';
export * from './components/inputs/Select';
export * from './components/inputs/Switch';
export * from './components/inputs/DateTimePicker';

/** navigation components */
export * from './components/navigation/Accordion';
export * from './components/navigation/Breadcrumbs';
export * from './components/navigation/TabBar';

/** display components */
export * from './components/display/Chip';
export * from './components/display/Dropdown';
export * from './components/display/List';
export * from './components/display/Popover';
export * from './components/display/Popper';
export * from './components/display/Tooltip';
export * from './components/display/Table';

/** Feedback components */
export * from './components/feedback/CustomModal';
export * from './components/feedback/Modal';
export * from './components/feedback/Quota';
export * from './components/feedback/Snackbar';

/** Utilities components */
export * from './components/utilities/Collapse';
export * from './components/utilities/Catcher';
export * from './components/utilities/Portal';
export * from './components/utilities/Responsive';
export * from './components/utilities/SnackbarManager';
export * from './components/utilities/ModalManager';
export * from './components/utilities/Transition';
export * from './components/utilities/Drag';
export * from './components/utilities/Drop';
export * from './components/utilities/Shimmer';

export * from './theme/theme-utils';
export * from './theme/theme-context-provider';
export * from './theme/zimbra-classic-theme-context-provider';
export * from './hooks/useIsVisible';
export * from './hooks/useCheckbox';
export * from './hooks/useCombinedRefs';
export * from './hooks/useHiddenCount';
export * from './hooks/useKeyboard';
export * from './hooks/useScreenMode';
export * from './hooks/useSnackbar';
export * from './hooks/useModal';
export * from './hooks/useSplitVisibility';

// export types
// @see https://github.com/rollup/rollup-plugin-typescript/issues/28#issuecomment-546387825
export type Theme = import('./theme/theme').ThemeObj;
export * from './globals';
