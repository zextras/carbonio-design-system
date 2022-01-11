<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

``` js

<MultiButton background="primary" label="Hello" onClick={console.log} items={[
  {
    id: "activity-1",
    icon: "Activity",
    label: "Some Item",
    click: () => console.log("click1"),
  },
  {
    id: "activity-2",
    icon: "Plus",
    label: "Some Other Item",
    click: () => console.log("click2"),
    disabled: true,
  }]} />

```