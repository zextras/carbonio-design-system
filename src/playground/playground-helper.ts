/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

const jsx = `() => {
    const [count, setCount] = React.useState(0);
    const incrementByOne = () => setCount(prev => prev + 1);
    const decrementByOne = () => setCount(prev => prev - 1);
    
    return (
      <Container mainAlignment="flex-start" crossAlignment="center" orientation="horizontal" gap="1rem">
        <Button icon="Minus" onClick={decrementByOne} />
        <Text>{count}</Text>
        <Button icon="Plus" onClick={incrementByOne} />
      </Container>
    )
}`;

const css = `* {
    margin: 0;
    padding: 0;
}`;

export default { jsx, css };
