/*
 * SPDX-FileCopyrightText: 2025 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
export const withAttrs = <T extends object>(
  Component: React.ComponentType<T>,
  defaultProps: T | ((props: T) => Partial<T>)
) => {
  if (typeof defaultProps === 'function') {
    const originalRender = Component.prototype?.render;
    Component.defaultProps = {
      ...Component.defaultProps,
      ...(defaultProps({} as T)),
    };
  } else {
    Component.defaultProps = {
      ...Component.defaultProps,
      ...defaultProps,
    };
  }
  return Component;
};

// export const withAttrs = <T extends object>(
//   Component: React.ComponentType<T>,
//   defaultProps: T) => {

//     Component.defaultProps = {
//       ...Component.defaultProps,
//       ...defaultProps,
//     };

//   return Component;
// };