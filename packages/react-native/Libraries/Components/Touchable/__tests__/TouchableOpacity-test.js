/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import * as React from 'react';

const TouchableOpacity = require('../TouchableOpacity').default;
const {
  create,
  unmount,
  update,
} = require('@react-native/jest-preset/jest/renderer');

describe('TouchableOpacity native disabled state', () => {
  it.each([undefined, null])(
    're-enables the native view when disabled changes from true to %s',
    async disabled => {
      const renderer = await create(<TouchableOpacity disabled={true} />);

      expect(renderer.toJSON()?.props.accessibilityState.disabled).toBe(true);

      await update(renderer, <TouchableOpacity disabled={disabled} />);

      expect(renderer.toJSON()?.props.accessibilityState.disabled).toBe(false);
      await unmount(renderer);
    },
  );

  it('preserves accessibility disabled state when the disabled prop is removed', async () => {
    const renderer = await create(<TouchableOpacity disabled={true} />);

    await update(
      renderer,
      <TouchableOpacity accessibilityState={{disabled: true}} />,
    );
    expect(renderer.toJSON()?.props.accessibilityState.disabled).toBe(true);

    await update(renderer, <TouchableOpacity aria-disabled={true} />);
    expect(renderer.toJSON()?.props.accessibilityState.disabled).toBe(true);

    await update(
      renderer,
      <TouchableOpacity disabled={false} aria-disabled={true} />,
    );
    expect(renderer.toJSON()?.props.accessibilityState.disabled).toBe(false);
    await unmount(renderer);
  });
});
