/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/* eslint-disable import/no-cycle */
/** Basic components */
export { default as Avatar } from './components/basic/Avatar';
export { default as Badge } from './components/basic/Badge';
export { default as Button } from './components/basic/Button';
export { default as Icon } from './components/basic/Icon';
export { default as Link } from './components/basic/Link';
export { default as LoadMore } from './components/basic/LoadMore';
export { FormSection, FormSubSection, FormRow } from './components/basic/FormSection';
export { default as Logo } from './components/basic/Logo';
export { default as Text } from './components/basic/Text';
export { default as TextWithTooltip } from './components/basic/TextWithTooltip';
/** Layout components */
export { default as Container } from './components/layout/Container';
export { default as Divider } from './components/layout/Divider';
export { default as Padding } from './components/layout/Padding';
export { default as Paragraph } from './components/layout/Paragraph';
export { default as Row } from './components/layout/Row';

/** Inputs components */
export { default as Checkbox } from './components/inputs/Checkbox';
export { default as ChipInput } from './components/inputs/ChipInput';
export { default as EmailComposerInput } from './components/inputs/EmailComposerInput';
export { default as FileLoader } from './components/inputs/FileLoader';
export { default as IconButton } from './components/inputs/IconButton';
export { default as IconCheckbox } from './components/inputs/IconCheckbox';
export { default as MultiButton } from './components/inputs/MultiButton';
export { Input, PasswordInput } from './components/inputs/Input';
export { default as Radio } from './components/inputs/Radio';
export { default as RadioGroup } from './components/inputs/RadioGroup';
export { default as SearchInput } from './components/inputs/SearchInput';
export { default as Select } from './components/inputs/Select';
export { default as Switch } from './components/inputs/Switch';
export { default as DateTimePicker } from './components/inputs/DateTimePicker';
// export { default as RichTextEditor } from './components/inputs/RichTextEditor';

/** navigation components */
export { Accordion, AccordionItem } from './components/navigation/Accordion';
export { default as Breadcrumbs } from './components/navigation/Breadcrumbs';
export { TabBar, DefaultTabBarItem } from './components/navigation/TabBar';

/** display components */
export { default as Chip } from './components/display/Chip';
export { default as Dropdown } from './components/display/Dropdown';
export { default as List } from './components/display/List';
export { default as Popover } from './components/display/Popover';
export { default as Popper } from './components/display/Popper';
export { default as Tooltip } from './components/display/Tooltip';
export { default as Table } from './components/display/Table';

/** Feedback components */
export { default as CustomModal } from './components/feedback/CustomModal';
export { default as Modal } from './components/feedback/Modal';
export { default as Quota } from './components/feedback/Quota';
export { default as Snackbar } from './components/feedback/Snackbar';

/** Utilities components */
export { default as Collapse, Collapser } from './components/utilities/Collapse';
export { default as Catcher } from './components/utilities/Catcher';
export { default as Portal } from './components/utilities/Portal';
export { default as Responsive } from './components/utilities/Responsive';
export { SnackbarManagerContext, SnackbarManager } from './components/utilities/SnackbarManager';
export { ModalManagerContext, ModalManager } from './components/utilities/ModalManager';
export { default as Transition } from './components/utilities/Transition';
export { default as Drag } from './components/utilities/Drag';
export { default as Drop } from './components/utilities/Drop';
export { default as Shimmer } from './components/utilities/Shimmer';

export {
	generateColorSet,
	useTheme,
	getColor,
	getPadding,
	getParsedPadding
} from './theme/theme-utils';
export { ThemeContext, ThemeProvider } from './theme/theme-context-provider';
export { default as ZimbraClassicThemeContextProvider } from './theme/zimbra-classic-theme-context-provider';
export { useIsVisible } from './hooks/useIsVisible';
export { useCheckbox } from './hooks/useCheckbox';
export { useCombinedRefs } from './hooks/useCombinedRefs';
export { useHiddenCount } from './hooks/useHiddenCount';
export { useKeyboard, getKeyboardPreset } from './hooks/useKeyboard';
export { useScreenMode } from './hooks/useScreenMode';
export { useSnackbar } from './hooks/useSnackbar';
export { useModal } from './hooks/useModal';
export { useSplitVisibility } from './hooks/useSplitVisibility';

export { pseudoClasses } from './components/utilities/functions';
