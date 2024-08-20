/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
// import module augmentations to make ts use them while generating types definitions
import './globals';
import './styled-components';

/** Basic components */
export * from './components/basic/Avatar';
export * from './components/basic/badge/Badge';
export * from './components/basic/button/Button';
export { Icon, type IconProps } from './components/basic/icon/Icon';
export * from './components/basic/Link';
export * from './components/basic/LoadMore';
export * from './components/basic/FormSection';
export * from './components/basic/text/Text';
export * from './components/basic/TextWithTooltip';
export * from './components/basic/Spinner';
/** Layout components */
export * from './components/layout/Container';
export * from './components/layout/divider/Divider';
export * from './components/layout/Padding';
export * from './components/layout/Paragraph';
export * from './components/layout/Row';

/** Inputs components */
export * from './components/inputs/Checkbox';
export {
	ChipInput,
	type ChipInputType,
	type ChipItem,
	type ChipInputProps
} from './components/inputs/ChipInput';
export * from './components/inputs/FileLoader';
export * from './components/inputs/IconButton';
export * from './components/inputs/IconCheckbox';
export * from './components/inputs/multiButton/MultiButton';
export * from './components/inputs/Input';
export * from './components/inputs/PasswordInput';
export { Radio, type RadioProps } from './components/inputs/Radio';
export { RadioGroup, type RadioGroupProps } from './components/inputs/RadioGroup';
export * from './components/inputs/SearchInput';
export {
	Select,
	type SelectProps,
	type SingleSelectionOnChange,
	type MultipleSelectionOnChange,
	type SelectItem,
	type LabelFactoryProps
} from './components/inputs/Select';
export * from './components/inputs/Switch';
export * from './components/inputs/DateTimePicker';
export * from './components/inputs/Slider';
export * from './components/inputs/TextArea';

/** navigation components */
export * from './components/navigation/Accordion';
export * from './components/navigation/Breadcrumbs';
export * from './components/navigation/TabBar';

/** display components */
export * from './components/display/Chip';
export * from './components/display/Dropdown';
export * from './components/display/List';
export * from './components/display/ListV2/ListV2';
export * from './components/display/ListItem';
export * from './components/display/Popover';
export * from './components/display/Popper';
export * from './components/display/Tooltip';
export {
	Table,
	type TableProps,
	type THeader,
	type TRow,
	type THeaderProps,
	type TRowProps,
	DefaultRowFactory,
	DefaultHeaderFactory
} from './components/display/Table';
export * from './components/display/CollapsingActions';

/** Feedback components */
export { Banner, type BannerProps } from './components/feedback/banner/Banner';
export * from './components/feedback/CustomModal';
export * from './components/feedback/Modal';
export * from './components/feedback/modal-components/ModalHeader';
export * from './components/feedback/modal-components/ModalBody';
export * from './components/feedback/modal-components/ModalFooter';
export * from './components/feedback/quota/Quota';
export * from './components/feedback/snackbar/Snackbar';

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
export * from './hooks/useIsVisible/useIsVisible';
export * from './hooks/useCheckbox';
export * from './hooks/useCombinedRefs';
export * from './hooks/useHiddenCount';
export * from './hooks/useKeyboard';
export * from './hooks/useScreenMode';
export * from './hooks/useSnackbar/useSnackbar';
export * from './hooks/useModal';
export * from './hooks/useSplitVisibility';
export { useIntersectionObserver } from './hooks/useIntersectionObserver/useIntersectionObserver';

export type { ThemeObj as Theme } from './theme/theme';
export * from './globals';
export type { AnyColor, PaletteColor } from './types/utils';
