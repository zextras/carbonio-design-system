/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useRef } from 'react';

import { act as rtlAct, renderHook } from '@testing-library/react';
import type * as ReactDOM from 'react-dom';

import { useSnackbar } from './useSnackbar';
import { Button } from '../../components/basic/button/Button';
import { TIMERS } from '../../components/constants';
import type {
	CloseSnackbarFn,
	CreateSnackbarFnArgs,
	SnackbarManagerProps
} from '../../components/utilities/snackbarManager/SnackbarManager';
import { SnackbarManager } from '../../components/utilities/snackbarManager/SnackbarManager';
import { screen, setup } from '../../tests/utils';
import { ThemeProvider } from '../../theme/theme-context-provider';

vi.mock('react-dom', async () => {
	const actual = await vi.importActual<typeof ReactDOM>('react-dom');
	return {
		...actual,
		createPortal: (node: React.ReactNode): React.ReactPortal => node as React.ReactPortal
	};
});

const snackbarContextError = 'snackbar manager context not initialized';
beforeEach(() => {
	const originalErrorFn = console.error.bind(console);
	vi.spyOn(console, 'error').mockImplementation((message, ...args) => {
		// silence error for snackbar
		if (message !== snackbarContextError) {
			originalErrorFn(message, ...args);
		}
	});
});

const Wrapper = ({
	children,
	...props
}: React.PropsWithChildren<SnackbarManagerProps>): React.JSX.Element => (
	<ThemeProvider>
		<SnackbarManager {...props}>{children}</SnackbarManager>
	</ThemeProvider>
);

const TestComponent = ({ args }: { args: CreateSnackbarFnArgs[] }): React.JSX.Element => {
	const createSnackbar = useSnackbar();
	const keyRef = useRef(0);
	return (
		<Button
			onClick={() => {
				createSnackbar({
					key: `key-${keyRef.current}`,
					...args[keyRef.current]
				});
				keyRef.current += 1;
			}}
			label={'create'}
		/>
	);
};

function setupWithSnackbarManager(
	ui: Parameters<typeof setup>[0],
	options?: Parameters<typeof setup>[1] & { snackbarManagerProps?: SnackbarManagerProps }
): ReturnType<typeof setup> {
	return setup(ui, {
		...options,
		renderOptions: {
			wrapper: ({ children }) => <Wrapper {...options?.snackbarManagerProps}>{children}</Wrapper>,
			...options?.renderOptions
		}
	});
}

describe('useSnackbar', () => {
	it('should return a defined function which logs an error if no manager has been set', async () => {
		const { result } = renderHook(useSnackbar, {
			wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>
		});
		expect(result.current).toBeDefined();
		result.current({
			label: 'test'
		});
		expect(console.error).toHaveBeenCalledWith(snackbarContextError);
	});

	it('should return a defined function if a manager has been set', async () => {
		const { result } = renderHook(useSnackbar, {
			wrapper: ({ children }) => (
				<ThemeProvider>
					<SnackbarManager>{children}</SnackbarManager>
				</ThemeProvider>
			)
		});
		expect(result.current).toBeDefined();
		rtlAct(() => {
			result.current({
				label: 'test'
			});
		});
		expect(console.error).not.toHaveBeenCalledWith(snackbarContextError);
		rtlAct(() => {
			vi.runOnlyPendingTimers();
		});
	});

	it('should create a snackbar', async () => {
		const { user } = setupWithSnackbarManager(<TestComponent args={[{ label: 'snackbar' }]} />);
		await user.click(screen.getByRole('button', { name: /create/i }));
		expect(await screen.findByText(/snackbar/i)).toBeVisible();
	});

	it('should show second snackbar after first one disappears', async () => {
		const { user } = setupWithSnackbarManager(
			<TestComponent args={[{ label: 'snackbar 1' }, { label: 'snackbar 2' }]} />
		);
		await user.click(screen.getByRole('button', { name: /create/i }));
		await user.click(screen.getByRole('button', { name: /create/i }));
		expect(screen.queryByText(/snackbar 2/i)).not.toBeInTheDocument();
		rtlAct(() => {
			vi.advanceTimersByTime(TIMERS.SNACKBAR.DEFAULT_HIDE_TIMEOUT);
		});
		expect(await screen.findByText(/snackbar 2/i)).toBeVisible();
	});

	it('should show second snackbar immediately if it has the replace option enabled', async () => {
		const { user } = setupWithSnackbarManager(
			<TestComponent args={[{ label: 'snackbar 1' }, { label: 'snackbar 2', replace: true }]} />
		);
		await user.click(screen.getByRole('button', { name: /create/i }));
		await user.click(screen.getByRole('button', { name: /create/i }));
		expect(await screen.findByText(/snackbar 2/i)).toBeVisible();
	});

	it('should show third snackbar immediately if it has the replace option enabled, then second snackbar appears when third one disappears', async () => {
		const { user } = setupWithSnackbarManager(
			<TestComponent
				args={[
					{ label: 'snackbar 1' },
					{ label: 'snackbar 2' },
					{ label: 'snackbar 3', replace: true }
				]}
			/>
		);
		await user.click(screen.getByRole('button', { name: /create/i }));
		await user.click(screen.getByRole('button', { name: /create/i }));
		await user.click(screen.getByRole('button', { name: /create/i }));
		expect(await screen.findByText(/snackbar 3/i)).toBeVisible();
		rtlAct(() => {
			vi.advanceTimersByTime(TIMERS.SNACKBAR.DEFAULT_HIDE_TIMEOUT);
		});
		expect(await screen.findByText(/snackbar 2/i)).toBeVisible();
	});

	it('should not hide snackbar after timeout if disableAutoHide is enabled', async () => {
		const { user } = setupWithSnackbarManager(
			<TestComponent args={[{ label: 'snackbar', disableAutoHide: true }]} />
		);
		await user.click(screen.getByRole('button', { name: /create/i }));
		vi.advanceTimersByTime(TIMERS.SNACKBAR.DEFAULT_HIDE_TIMEOUT);
		expect(screen.getByText(/snackbar/i)).toBeVisible();
	});

	it('should hide snackbar after the timeout set on the manager', async () => {
		const { user } = setupWithSnackbarManager(<TestComponent args={[{ label: 'snackbar' }]} />, {
			snackbarManagerProps: { autoHideDefaultTimeout: 2000 }
		});
		await user.click(screen.getByRole('button', { name: /create/i }));
		rtlAct(() => {
			vi.advanceTimersByTime(2000);
		});
		expect(screen.queryByText(/snackbar/i)).not.toBeInTheDocument();
	});

	it('should hide snackbar after the timeout set on the snackbar', async () => {
		const { user } = setupWithSnackbarManager(
			<TestComponent args={[{ label: 'snackbar', autoHideTimeout: 3000 }]} />,
			{
				snackbarManagerProps: { autoHideDefaultTimeout: 2000 }
			}
		);
		await user.click(screen.getByRole('button', { name: /create/i }));
		vi.advanceTimersByTime(2000);
		expect(screen.getByText(/snackbar/i)).toBeVisible();
		rtlAct(() => {
			vi.advanceTimersByTime(1000);
		});
		expect(screen.queryByText(/snackbar/i)).not.toBeInTheDocument();
	});

	it('should show second snackbar after first one is manually close when disableAutoHide is enabled', async () => {
		const { user } = setupWithSnackbarManager(
			<TestComponent
				args={[
					{ label: 'snackbar 1', actionLabel: 'close s1', disableAutoHide: true },
					{ label: 'snackbar 2' }
				]}
			/>
		);
		await user.click(screen.getByRole('button', { name: /create/i }));
		await user.click(screen.getByRole('button', { name: /create/i }));
		vi.advanceTimersByTime(TIMERS.SNACKBAR.DEFAULT_HIDE_TIMEOUT);
		expect(screen.getByText(/snackbar 1/i)).toBeVisible();
		expect(screen.queryByText(/snackbar 2/i)).not.toBeInTheDocument();
		await user.click(screen.getByRole('button', { name: /close s1/i }));
		expect(await screen.findByText(/snackbar 2/i)).toBeVisible();
	});

	it('should hide snackbar when callback returned by create is invoked', async () => {
		const TestCloseComponent = (): React.JSX.Element => {
			const createSnackbar = useSnackbar();
			const closeSnackbarRef = useRef<CloseSnackbarFn>();
			return (
				<>
					<Button
						onClick={() => {
							closeSnackbarRef.current = createSnackbar({
								key: `key-1`,
								label: 'snackbar',
								disableAutoHide: true
							});
						}}
						label={'create'}
					/>
					<Button
						onClick={() => {
							closeSnackbarRef.current?.();
						}}
						label={'close'}
					/>
				</>
			);
		};

		const { user } = setupWithSnackbarManager(<TestCloseComponent />);
		await user.click(screen.getByRole('button', { name: /create/i }));
		await user.click(screen.getByRole('button', { name: /close/i }));
		expect(screen.queryByText('snackbar')).not.toBeInTheDocument();
	});

	it('should call onClose when action is clicked if onActionClick is not set', async () => {
		const onClose = vi.fn();
		const { user } = setupWithSnackbarManager(
			<TestComponent args={[{ label: 'snackbar', onClose }]} />
		);
		await user.click(screen.getByRole('button', { name: /create/i }));
		await user.click(screen.getByRole('button', { name: /ok/i }));
		expect(onClose).toHaveBeenCalled();
	});

	it('should call only onActionClick when action is clicked if set', async () => {
		const onClose = vi.fn();
		const onActionClick = vi.fn();
		const { user } = setupWithSnackbarManager(
			<TestComponent args={[{ label: 'snackbar', onClose, onActionClick }]} />
		);
		await user.click(screen.getByRole('button', { name: /create/i }));
		await user.click(screen.getByRole('button', { name: /ok/i }));
		expect(onActionClick).toHaveBeenCalled();
		expect(onClose).not.toHaveBeenCalled();
	});

	it('should call onClose when snackbar disappears', async () => {
		const onClose = vi.fn();
		const { user } = setupWithSnackbarManager(
			<TestComponent args={[{ label: 'snackbar', onClose }]} />
		);
		await user.click(screen.getByRole('button', { name: /create/i }));
		rtlAct(() => {
			vi.advanceTimersByTime(TIMERS.SNACKBAR.DEFAULT_HIDE_TIMEOUT);
		});
		expect(onClose).toHaveBeenCalled();
	});
});
