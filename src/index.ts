/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
// import module augmentations to make ts use them while generating types definitions
import './types/globals';
import './types/emotion';

/** Basic components */
export * from './components/basic/avatar/Avatar';
export * from './components/basic/badge/Badge';
export * from './components/basic/button/Button';
export { Icon, type IconProps } from './components/basic/icon/Icon';
export * from './components/basic/link/Link';
export * from './components/basic/loadMore/LoadMore';
export * from './components/basic/formSection/FormSection';
export * from './components/basic/text/Text';
export * from './components/basic/spinner/Spinner';
/** Layout components */
export * from './components/layout/container/Container';
export * from './components/layout/divider/Divider';
export * from './components/layout/Padding';
export * from './components/layout/Paragraph';
export * from './components/layout/Row';

/** Inputs components */
export * from './components/inputs/checkbox/Checkbox';
export {
	ChipInput,
	type ChipInputType,
	type ChipItem,
	type ChipInputProps
} from './components/inputs/chipInput/ChipInput';
export * from './components/inputs/fileLoader/FileLoader';
export * from './components/inputs/IconButton';
export * from './components/inputs/iconCheckbox/IconCheckbox';
export * from './components/inputs/multiButton/MultiButton';
export * from './components/inputs/input/Input';
export * from './components/inputs/passwordInput/PasswordInput';
export { Radio, type RadioProps } from './components/inputs/radio/Radio';
export { RadioGroup, type RadioGroupProps } from './components/inputs/radioGroup/RadioGroup';
export {
	Select,
	type SelectProps,
	type SingleSelectionOnChange,
	type MultipleSelectionOnChange,
	type SelectItem,
	type LabelFactoryProps
} from './components/inputs/select/Select';
export * from './components/inputs/switch/Switch';
export {
	DateTimePicker,
	type DateTimePickerProps,
	registerLocale,
	setDefaultLocale,
	getDefaultLocale,
	DEFAULT_MODIFIERS
} from './components/inputs/datetimePicker/DateTimePicker';
export * from './components/inputs/slider/Slider';
export * from './components/inputs/textArea/TextArea';

/** navigation components */
export * from './components/navigation/Accordion';
export * from './components/navigation/Breadcrumbs';
export * from './components/navigation/TabBar';

/** display components */
export * from './components/display/chip/Chip';
export * from './components/display/dropdown/Dropdown';
export * from './components/display/list/List';
export * from './components/display/listItem/ListItem';
export * from './components/display/popover/Popover';
export * from './components/display/popper/Popper';
export * from './components/display/tooltip/Tooltip';
export {
	Table,
	type TableProps,
	type THeader,
	type TRow,
	type THeaderProps,
	type TRowProps,
	DefaultRowFactory,
	DefaultHeaderFactory
} from './components/display/table/Table';
export * from './components/display/collapsingActions/CollapsingActions';

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
export * from './components/utilities/shimmer/Shimmer';

export * from './theme/theme-utils';
export * from './theme/theme-context-provider';
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

export type {
	Theme,
	ThemeColorObj,
	ThemeSizeObj,
	ThemeSizeObjExtended,
	Palette
} from './theme/theme';
export * from './types/globals';
export type { AnyColor, PaletteColor } from './types/utils';
