# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.0.0](https://github.com/Zextras/carbonio-design-system/compare/v1.2.0...v2.0.0) (2023-04-17)


### ⚠ BREAKING CHANGES

* in Dropdown Component, items prop elements must replace click with onClick
* in Breadcrumbs component, crumbs prop elements must replace click with onClick
* **Button:** set main ref to external grid container and add buttonRef prop
to receive the ref for the main button element, in order to make events fire also on
disabled element if registered on the main ref.

### Bug Fixes

* **Button:** change ref destination to make events fire on disabled button ([0499e78](https://github.com/Zextras/carbonio-design-system/commit/0499e78e154341a4a3c090d6a46a435dd63fc3d7)), closes [#173](https://github.com/Zextras/carbonio-design-system/issues/173)
* update default colors for input components ([03cc6a5](https://github.com/Zextras/carbonio-design-system/commit/03cc6a512fc9327969be6be5c7e1da9ffab94e17)), closes [#180](https://github.com/Zextras/carbonio-design-system/issues/180)
* wrap button to a new line to keep text readable ([b9ab57a](https://github.com/Zextras/carbonio-design-system/commit/b9ab57aef08420b253398802d24a4c90cb06f191)), closes [#179](https://github.com/Zextras/carbonio-design-system/issues/179)


* remove deprecated click prop in favor of onClick in DropdownItem ([b8fadc6](https://github.com/Zextras/carbonio-design-system/commit/b8fadc6a6a2b68b0ec6315d466f29f107f2f4a9c)), closes [#172](https://github.com/Zextras/carbonio-design-system/issues/172)

## [1.2.0](https://github.com/Zextras/carbonio-design-system/compare/v1.1.0...v1.2.0) (2023-02-28)


### Features

* **icons:** update icons ([ffc0078](https://github.com/Zextras/carbonio-design-system/commit/ffc0078e0c0e35cdd67803c57f1c20e0394b761d)), closes [#169](https://github.com/Zextras/carbonio-design-system/issues/169)
* **Modal:** add a prop to specify the container window ([1ce58e4](https://github.com/Zextras/carbonio-design-system/commit/1ce58e4a309fee68e4a96b0f685629204ecb1fa1)), closes [#171](https://github.com/Zextras/carbonio-design-system/issues/171)
* **TextArea:** create TextArea component ([1215455](https://github.com/Zextras/carbonio-design-system/commit/12154559fa9737a98f3c7a4248c5e54d3233a691)), closes [#174](https://github.com/Zextras/carbonio-design-system/issues/174)


### Bug Fixes

* **Button:** avoid accents to be cut off ([8864376](https://github.com/Zextras/carbonio-design-system/commit/88643761c9607d9e1c843412dee875ef22c4246f)), closes [#175](https://github.com/Zextras/carbonio-design-system/issues/175)

## [1.1.0](https://github.com/Zextras/carbonio-design-system/compare/v1.0.1...v1.1.0) (2023-02-01)


### Features

* **ListV2:** create ListV2 component ([3ded46b](https://github.com/Zextras/carbonio-design-system/commit/3ded46b7b3ef3faf0712d7cbc3033802a60506be)), closes [#165](https://github.com/Zextras/carbonio-design-system/issues/165)
* **Table:** allow setting a custom index for the rows  ([4a4dff5](https://github.com/Zextras/carbonio-design-system/commit/4a4dff557aaa868bf3938ddb554c288813ece4b6)), closes [#163](https://github.com/Zextras/carbonio-design-system/issues/163)

### [1.0.1](https://github.com/Zextras/carbonio-design-system/compare/v1.0.0...v1.0.1) (2023-01-27)


### Bug Fixes

* change algorithm to generate disabled variant of the color set ([2e41b71](https://github.com/Zextras/carbonio-design-system/commit/2e41b71ded3779d709fa450c4bad1f69426a6a6d)), closes [#160](https://github.com/Zextras/carbonio-design-system/issues/160)
* change how the fonts are imported and bundled ([458519c](https://github.com/Zextras/carbonio-design-system/commit/458519cbd9572d8a514c840b9206109055e905ec)), closes [#159](https://github.com/Zextras/carbonio-design-system/issues/159)
* force isActive to false when chips limit is reached ([49de2a1](https://github.com/Zextras/carbonio-design-system/commit/49de2a1dbfdf728a0216b1c580542de109de9318)), closes [#161](https://github.com/Zextras/carbonio-design-system/issues/161)
* **Select:** mutual exclusive props for controlled and uncontrolled mode ([80d53d0](https://github.com/Zextras/carbonio-design-system/commit/80d53d0e7622799d6f8766ed6a1cde90ad8a1601)), closes [#153](https://github.com/Zextras/carbonio-design-system/issues/153)

## [1.0.0](https://github.com/Zextras/carbonio-design-system/compare/v0.5.3...v1.0.0) (2023-01-04)


### Features

* generate highlight set of theme from primary color set ([a69cb93](https://github.com/Zextras/carbonio-design-system/commit/a69cb933784fb10984f228b298aadc9410eb125a)), closes [#154](https://github.com/Zextras/carbonio-design-system/issues/154)


### Bug Fixes

* **RadioGroup:** trigger onChange in controlled mode only if radioGro… ([#152](https://github.com/Zextras/carbonio-design-system/issues/152)) ([c62124f](https://github.com/Zextras/carbonio-design-system/commit/c62124f79976498566653cb352bd7d554a14f608))

### [0.5.3](https://github.com/Zextras/carbonio-design-system/compare/v0.5.2...v0.5.3) (2022-12-20)


### Features

* **CollapsingActions:** improve configuration through props ([c2ac490](https://github.com/Zextras/carbonio-design-system/commit/c2ac4905e31b05b6ab9d56cc1c1df0f61063fb5c)), closes [#148](https://github.com/Zextras/carbonio-design-system/issues/148)
* **DateTimePicker:** allow localization of DateTimePicker with global functions  ([d91405c](https://github.com/Zextras/carbonio-design-system/commit/d91405cde33f93b587336984207a0c1b56e2525a))

### [0.5.2](https://github.com/Zextras/carbonio-design-system/compare/v0.5.1...v0.5.2) (2022-11-22)


### Features

* **Slider:** create Slider component ([975cc91](https://github.com/Zextras/carbonio-design-system/commit/975cc91b4dd4554fed1eb9c3a03a6022c08dc052)), closes [#143](https://github.com/Zextras/carbonio-design-system/issues/143)


### Bug Fixes

* **icons:** update icon set to use new module icons ([e8e455c](https://github.com/Zextras/carbonio-design-system/commit/e8e455cb7d8ad3c36bdabda06923b69417b833b1)), closes [#144](https://github.com/Zextras/carbonio-design-system/issues/144)

### [0.5.1](https://github.com/Zextras/carbonio-design-system/compare/v0.5.0...v0.5.1) (2022-11-10)


### Features

* convert px to rem ([67e898f](https://github.com/Zextras/carbonio-design-system/commit/67e898f40d4cc40452d75cb33e91a2f3050f3984)), closes [#134](https://github.com/Zextras/carbonio-design-system/issues/134)
* **icons:** migrate icons to ts and update icon set ([b7660e9](https://github.com/Zextras/carbonio-design-system/commit/b7660e97cd0580487e6b606c6e5ca717ffe0cba5)), closes [#135](https://github.com/Zextras/carbonio-design-system/issues/135) [#139](https://github.com/Zextras/carbonio-design-system/issues/139)


### Bug Fixes

* apply right conversion to modal medium size ([83a4a8b](https://github.com/Zextras/carbonio-design-system/commit/83a4a8bb22c7bc167c577bda73e140beb4cc8e4c)), closes [#140](https://github.com/Zextras/carbonio-design-system/issues/140)
* **ModalContent:** remove default for min-height ([dfd7e37](https://github.com/Zextras/carbonio-design-system/commit/dfd7e376817f44bdf041aca51960aafffde015d7)), closes [#138](https://github.com/Zextras/carbonio-design-system/issues/138)

## [0.5.0](https://github.com/Zextras/carbonio-design-system/compare/v0.4.1...v0.5.0) (2022-10-14)


### ⚠ BREAKING CHANGES

* **TabBar:** removed onItemClick and defaultSelected props

### Features

* **Modal,CustomModal:** export modal components and add onClick on content ([090ef33](https://github.com/Zextras/carbonio-design-system/commit/090ef337e9902ae790ed2eeb52fdebb59bb36c1e)), closes [#130](https://github.com/Zextras/carbonio-design-system/issues/130)


### Bug Fixes

* **Dropdown:** close dropdown of type contextMenu when click is on trigger component ([3367540](https://github.com/Zextras/carbonio-design-system/commit/33675405f55aac9cc966a5a000b0ba12a4f528cc)), closes [#128](https://github.com/Zextras/carbonio-design-system/issues/128)


* **TabBar:** remove TabBar uncontrolled mode ([f69777e](https://github.com/Zextras/carbonio-design-system/commit/f69777e758a1b3a1db8c3e0c26db5d6960c80c0e)), closes [#126](https://github.com/Zextras/carbonio-design-system/issues/126)

### [0.4.1](https://github.com/Zextras/carbonio-design-system/compare/v0.4.0...v0.4.1) (2022-09-27)


### Features

* **Dropdown:** add tooltip on disabled items ([4dce432](https://github.com/Zextras/carbonio-design-system/commit/4dce43254a6221e8c6e93be9aaab53ae4aa3f83b)), closes [#124](https://github.com/Zextras/carbonio-design-system/issues/124)


### Bug Fixes

* **ChipInput:** hide scrollbar when not in overflow ([2da4ea6](https://github.com/Zextras/carbonio-design-system/commit/2da4ea6b18f7cd124a4dcb84d2ec9f28adf23965))
* **Dropdown:** align content to flex-start when item has subitems ([6d755a5](https://github.com/Zextras/carbonio-design-system/commit/6d755a5d681f8f715908ebf59118a3ad2149662c))
* **Dropdown:** prevent dropdown from closing before calling click callback of nested items ([e8cea00](https://github.com/Zextras/carbonio-design-system/commit/e8cea004d7cf64a542dac0bce774201244801c97))
* **Modal:** avoid button text overflow, if is it possible, when optionalFooter is provided ([3a10888](https://github.com/Zextras/carbonio-design-system/commit/3a10888e9597801a0dc04cbfa3f156b6a11b3377))

## [0.4.0](https://github.com/Zextras/carbonio-design-system/compare/v0.3.10...v0.4.0) (2022-09-02)


### ⚠ BREAKING CHANGES

* **Button:** rename old "size" prop in "width"
* **Button:** remove "isSmall" prop in favor of new "size" prop to set button size
* **Button:** set medium as default size
refs: CDS-39
* **ChipInput:** fix typo in singleSelection prop name
* **ChipInput:** remove dropdownTopBorderColor from props since it was not used
refs: CDS-14
* **Modal:** move showCloseIcon default to true
* **Modal:** add onClose default (noop)

refs: CDS-13

### Features

* add action to useKeyboard ([adf37e7](https://github.com/Zextras/carbonio-design-system/commit/adf37e7f564b8f5d9825fdbe6a7cbbf5b5f0ac3f)), closes [#73](https://github.com/Zextras/carbonio-design-system/issues/73)
* add disabled in pseudo classes generator utility ([6d7bc9a](https://github.com/Zextras/carbonio-design-system/commit/6d7bc9a1735ece2a898d43de4a8b6cd7d9383083))
* added disableTransition prop to Accordion ([89ef4fc](https://github.com/Zextras/carbonio-design-system/commit/89ef4fc3b10a6e9f2a1b0e5d26e0605b6667ef80)), closes [#93](https://github.com/Zextras/carbonio-design-system/issues/93)
* added maxHeight and vertical scroll in chip Input ([ffc478b](https://github.com/Zextras/carbonio-design-system/commit/ffc478b7ec6ea7f06a23d6e8b593d0ff90608fea)), closes [#70](https://github.com/Zextras/carbonio-design-system/issues/70)
* added repeat exception icon  ([b90439e](https://github.com/Zextras/carbonio-design-system/commit/b90439ea2b792944a3dffeb7019c42ad65701962)), closes [#97](https://github.com/Zextras/carbonio-design-system/issues/97)
* added tooltip props to TextWithTooltip ([8aa324f](https://github.com/Zextras/carbonio-design-system/commit/8aa324f5a82656651b2ace49f1e97733c4290b43))
* **Button:** allow set of ref for secondary action button ([64cb468](https://github.com/Zextras/carbonio-design-system/commit/64cb468c07412c9bb7d05cbcf970259291a76031))
* **Button:** update style and add support to IconButton and MultiButton ([89dbb0b](https://github.com/Zextras/carbonio-design-system/commit/89dbb0b1bf688ff1e234bb073c52ac52edbe8fad))
* **Chip:** allow different placement for tooltips ([8909f65](https://github.com/Zextras/carbonio-design-system/commit/8909f657f73b52c2d6ff6ca70785e41770f85415))
* **ChipInput:** add prop to wrap chips instead of enabling horizontal scroll ([30018cf](https://github.com/Zextras/carbonio-design-system/commit/30018cfe75fd9ca1640ecd4104c201f01ba1802f))
* **CollapsingActions:** add new CollapsingAction component ([bd7bbad](https://github.com/Zextras/carbonio-design-system/commit/bd7bbadc792050f101b35bd695bdd759f70426aa))
* dynamic tooltip & textWithTooltip display time with 0,5s fallback ([501b371](https://github.com/Zextras/carbonio-design-system/commit/501b371c53dc21d5fe8a34d7111454a84d51f009))
* export ButtonOld to make migration easier ([ec7d6ee](https://github.com/Zextras/carbonio-design-system/commit/ec7d6ee97429e1f346f8e3e40c208f3c30d461ed))
* generic item type for List component ([7edab28](https://github.com/Zextras/carbonio-design-system/commit/7edab289716ed92e79dbd7b3aee4ce44340f48e5))
* improve Link props and export LabelFactory for Select ([025fa48](https://github.com/Zextras/carbonio-design-system/commit/025fa481917854d06852092b3b5d898570bba28c)), closes [#98](https://github.com/Zextras/carbonio-design-system/issues/98)
* **Input:** add optional description on Input ([7dd9365](https://github.com/Zextras/carbonio-design-system/commit/7dd9365b68ea97940e3e743f8feec83e6f6039d1))
* propagate inner component props in multibutton ([3e39346](https://github.com/Zextras/carbonio-design-system/commit/3e393468e5eedbb7829163d2549ee4ac20d22b30)), closes [#61](https://github.com/Zextras/carbonio-design-system/issues/61)
* scrollbars restyling ([6794a8c](https://github.com/Zextras/carbonio-design-system/commit/6794a8ce2fc0653c83342ca9881dfdea7904274a))
* **useSplitVisibility:** add optional max number of visibile items ([13769e0](https://github.com/Zextras/carbonio-design-system/commit/13769e01fccbf07a6f9b879d5c540ac316e829c8))


### Bug Fixes

* add missing exports of types ([3d39993](https://github.com/Zextras/carbonio-design-system/commit/3d399937f9e8151924186f704601f597f4f7b3c1))
* added value prop on SelectComponentProps ([6bf834e](https://github.com/Zextras/carbonio-design-system/commit/6bf834e0e559cbe9750820d434a35ef6d9b1701e))
* **Avatar:** avoid to propagate size prop to Icon component ([c66d1a0](https://github.com/Zextras/carbonio-design-system/commit/c66d1a06bc5c2cd1e1af726cbf7b6c215ea624a3))
* **Avatar:** make shape prop optional ([2159eb9](https://github.com/Zextras/carbonio-design-system/commit/2159eb9ea3d002bf75ba88ef8f626790174215b5))
* avoid contents inside modal to lose focus on change of active node ([fe07401](https://github.com/Zextras/carbonio-design-system/commit/fe07401fed33fdde3c0ddefa502eef118a74f85f))
* **Button:** set max-width to make text ellipse on overflow ([59ca4f2](https://github.com/Zextras/carbonio-design-system/commit/59ca4f2dccc9a61dd59b643dce943da97abba013))
* **Checkbox:** align items at the top ([2db26e9](https://github.com/Zextras/carbonio-design-system/commit/2db26e94de8cc8aa707d625b71047f1593eb9fcc))
* chip content width when avatar is not shown ([5927545](https://github.com/Zextras/carbonio-design-system/commit/5927545a79c57cc18ee859a261cbf9cc8b0436e6)), closes [#109](https://github.com/Zextras/carbonio-design-system/issues/109)
* **Chip:** avoid to collapse text if chip has no max width ([f8dae36](https://github.com/Zextras/carbonio-design-system/commit/f8dae36ec4fc2f32af1ff8bc1256da241803fef1))
* **ChipInput:** fix typing ([0f56a30](https://github.com/Zextras/carbonio-design-system/commit/0f56a30f4307266003504e7a79cc760af88aff7a))
* **ChipInput:** force space for description only if description is set ([84b2d20](https://github.com/Zextras/carbonio-design-system/commit/84b2d2090b6dc44b497425d88dbc3079a2f7d28d))
* **ChipInput:** make description area always visible with min-height ([e07f041](https://github.com/Zextras/carbonio-design-system/commit/e07f041d7e6623d9b9ecef30b01cbb877ff710b9))
* **ChipInput:** simplify management of disabled on input to handle click ([5d5c6a7](https://github.com/Zextras/carbonio-design-system/commit/5d5c6a7ce468c811ed39d28982191a6f1ccb1e26))
* **Chip:** remove tabIndex from action button ([c2e7c30](https://github.com/Zextras/carbonio-design-system/commit/c2e7c3082ac87c1d6bb7f3946f9300b771fb82a0))
* cleanup timeouts on component unmount ([c11934b](https://github.com/Zextras/carbonio-design-system/commit/c11934bab016205dd12049985b0aa1f6ee48e508)), closes [#113](https://github.com/Zextras/carbonio-design-system/issues/113)
* clear popper listener register on unmount ([7c8facd](https://github.com/Zextras/carbonio-design-system/commit/7c8facdc4fc166c0c5b7841375be90dc1cc7f7d8)), closes [#95](https://github.com/Zextras/carbonio-design-system/issues/95)
* click on trigger component should close the popper if currently open ([7fc387e](https://github.com/Zextras/carbonio-design-system/commit/7fc387e86183c31583baccb82355a1d625899256))
* **Container:** add children prop ([c5d2642](https://github.com/Zextras/carbonio-design-system/commit/c5d2642e5e3d2c9f0588a50213ced8cc33a5fd72))
* **Dropdown:** propagate disable to text inside dropdown item ([4c89dc5](https://github.com/Zextras/carbonio-design-system/commit/4c89dc5ccc3cfa6d436ed4db0936b27188c7090b))
* **Dropdown:** respect forceOpen when closing dropdown ([4490c21](https://github.com/Zextras/carbonio-design-system/commit/4490c219dce4a5913dd373fb88bc9af760d2e4de))
* emailComposerInput change callback param ([d733ad8](https://github.com/Zextras/carbonio-design-system/commit/d733ad8bb8e5828d35d8b0e99e205af8fe784e64))
* hide portal if show is false even when portal is disabled ([8e47a62](https://github.com/Zextras/carbonio-design-system/commit/8e47a62bf57e5138fb94efb9c5cd0f0d6a85ec38))
* **IconButton:** avoid IconButton to collapse in width ([5e23a5c](https://github.com/Zextras/carbonio-design-system/commit/5e23a5c8a29f7479c41385c0ba0b62d1a8cfe06a))
* **Input:** force space for description only if description is set ([9c26dcc](https://github.com/Zextras/carbonio-design-system/commit/9c26dcc93b8fecc6dc7a9c896376e65a5d64b981))
* **Input:** reserve area for description and hide native placeholder ([84fbddd](https://github.com/Zextras/carbonio-design-system/commit/84fbddd7598dc51c5761fd9683d5f18de81fd86b))
* make modifier optional in keyboard preset ([d07fe5f](https://github.com/Zextras/carbonio-design-system/commit/d07fe5f0ea779b5c6c284586a3ec1d2eac21faa7))
* **MultiButton:** make multibutton respect width prop ([ec2990d](https://github.com/Zextras/carbonio-design-system/commit/ec2990d031e45eb1d68484b9cbcfcb83456a9a8a))
* on SelectComponentProps set defaultSelection as optional ([eaab7b8](https://github.com/Zextras/carbonio-design-system/commit/eaab7b8e6f2499565b9ff8302d39ca19e2dbaff4))
* propagate rest props on Button component ([33119db](https://github.com/Zextras/carbonio-design-system/commit/33119dbf59b6e7593530d9551a94c820397e4a80))
* toggle open accordion status only on chevron click ([fc59ab5](https://github.com/Zextras/carbonio-design-system/commit/fc59ab56c440ad6c86781ff3caf68cd1ab9b1240)), closes [#82](https://github.com/Zextras/carbonio-design-system/issues/82)
* **Tooltip:** update sizes and change defaults ([c17ef12](https://github.com/Zextras/carbonio-design-system/commit/c17ef127d245b383297e169be546d5ef582977c1))
* update import/export to named and to fix build of types ([c3dbc1f](https://github.com/Zextras/carbonio-design-system/commit/c3dbc1f9b6ebafd1797101d4a2d5895265b6bcb3))


* **Button:** change sizes and spaces ([51ac92a](https://github.com/Zextras/carbonio-design-system/commit/51ac92ae04f1c5c7c9a7bfd244341eeb927e4fad))
* **ChipInput:** move to typescript and refactor spaces ([16679ff](https://github.com/Zextras/carbonio-design-system/commit/16679ff4557770b1f0b11319a570e886f9d0fc48))
* **Modal:** modify props default ([a681d88](https://github.com/Zextras/carbonio-design-system/commit/a681d887d2df4588fd4c5c33b2cddaafce475fad))

### [0.3.10](https://github.com/Zextras/carbonio-design-system/compare/v0.3.9...v0.3.10) (2022-08-31)


### Bug Fixes

* **ChipInput:** hide scrollbar when not in overflow ([75cfd51](https://github.com/Zextras/carbonio-design-system/commit/75cfd511e3c7390fff5aafd3b8ce626f468b17b6))

### [0.3.9](https://github.com/Zextras/carbonio-design-system/compare/v0.3.8...v0.3.9) (2022-08-24)

### [0.3.8](https://github.com/Zextras/carbonio-design-system/compare/v0.3.7...v0.3.8) (2022-07-25)


### Features

* added disableTransition prop to Accordion ([5811d4b](https://github.com/Zextras/carbonio-design-system/commit/5811d4b4af56b07533a8a810e4ae57926b4a480d))
* added repeat exception icon ([346f6c8](https://github.com/Zextras/carbonio-design-system/commit/346f6c80652f084656bb9fbd6699dd3535eff88f)), closes [#96](https://github.com/Zextras/carbonio-design-system/issues/96)
* added repeat exception icon ([b2da7ca](https://github.com/Zextras/carbonio-design-system/commit/b2da7ca7dc9e08a3bc547e5f161ee666cdbe5f92))


### Bug Fixes

* clear popper listener register on unmount ([06b5856](https://github.com/Zextras/carbonio-design-system/commit/06b58560109b441abcba027034cb6aa571aea0af))

### [0.3.7](https://github.com/Zextras/carbonio-design-system/compare/v0.3.6...v0.3.7) (2022-07-21)


### Features

* change badge maximum number shown ([4bbc924](https://github.com/Zextras/carbonio-design-system/commit/4bbc92420d7f7c62f71ba5db32e2f610efad2ff9)), closes [#85](https://github.com/Zextras/carbonio-design-system/issues/85)


### Bug Fixes

* avoid contents inside modal to lose focus on change of active node ([0f6ae04](https://github.com/Zextras/carbonio-design-system/commit/0f6ae045e43c62b8e4839d256ba40ccdca978dfb))
* toggle open accordion status only on chevron click ([9a776d6](https://github.com/Zextras/carbonio-design-system/commit/9a776d60c56a86dbabdcccc06f755009a0e02e59))

### [0.3.6](https://github.com/Zextras/carbonio-design-system/compare/v0.3.5...v0.3.6) (2022-07-05)


### Features

* add prop to wrap chips instead of enabling horizontal scroll ([4e6e1b0](https://github.com/Zextras/carbonio-design-system/commit/4e6e1b056d86950d733db19e6b7bc24766c48b61)), closes [#69](https://github.com/Zextras/carbonio-design-system/issues/69)

### [0.3.5](https://github.com/Zextras/carbonio-design-system/compare/v0.3.4...v0.3.5) (2022-06-08)


### Features

* added navigation on List ([ccb9b46](https://github.com/Zextras/carbonio-design-system/commit/ccb9b46ac634dcd8f9aed17af90e806f69ccf293))
* dynamic tooltip & textWithTooltip display time with 0,5s fallback ([#56](https://github.com/Zextras/carbonio-design-system/issues/56)) ([4d3cba2](https://github.com/Zextras/carbonio-design-system/commit/4d3cba2e55891b1a6a274befcd12192ce9858005))

### [0.3.4](https://github.com/Zextras/carbonio-design-system/compare/v0.3.3...v0.3.4) (2022-05-24)


### Bug Fixes

* accordion height reduced ([19dc04f](https://github.com/Zextras/carbonio-design-system/commit/19dc04f8f0076b62cf05518e18de1f3a0efc320f))

### [0.3.3](https://github.com/Zextras/carbonio-design-system/compare/v0.3.2...v0.3.3) (2022-05-20)


### Bug Fixes

* app icons change ([b700116](https://github.com/Zextras/carbonio-design-system/commit/b70011699dce1be451694cd5cf8910ee3cd54f63))
* updated Chats icon ([30ed91a](https://github.com/Zextras/carbonio-design-system/commit/30ed91ac7e9291f27b68bcbb7d24d66588ba4ee6))

### [0.3.2](https://github.com/Zextras/carbonio-design-system/compare/v0.3.1...v0.3.2) (2022-05-11)


### Bug Fixes

* cannot read properties of undefined in getScrollBarSize ([0c6d90c](https://github.com/Zextras/carbonio-design-system/commit/0c6d90c5c86293c913fc36a7adbdba13828e530f))

### [0.3.1](https://github.com/Zextras/carbonio-design-system/compare/v0.3.0...v0.3.1) (2022-05-11)


### Bug Fixes

* accordion padding and onOpen callback ([4243e35](https://github.com/Zextras/carbonio-design-system/commit/4243e35b9ae9337f01ae0a004808d24c92887564))

## [0.3.0](https://github.com/Zextras/carbonio-design-system/compare/v0.2.2...v0.3.0) (2022-04-22)


### ⚠ BREAKING CHANGES

* the RichTextEditor and Logo components are no longer exported by this library

### Features

* activeId flag on accordion ([1c347f3](https://github.com/Zextras/carbonio-design-system/commit/1c347f3f872f7714dc5fe5281268a7f23990dab2))
* added Bucket icons, reviewed icon set ([4eae144](https://github.com/Zextras/carbonio-design-system/commit/4eae1442cadf5a95397d1d8e3154610cbee867a6))
* create chips by pasting text ([#45](https://github.com/Zextras/carbonio-design-system/issues/45)) ([38f144d](https://github.com/Zextras/carbonio-design-system/commit/38f144dfd349a09db0a23030c812bfb5e914f0cb))
* new icons ([fea626b](https://github.com/Zextras/carbonio-design-system/commit/fea626b3e805485487ac0bb04f6e35c63ec7d511))
* openIds parameter on accordion ([ba91e60](https://github.com/Zextras/carbonio-design-system/commit/ba91e604345890dc10082bee849a89d82b10e895))


### Bug Fixes

* unsupported overflow value on firefox ([77a08e0](https://github.com/Zextras/carbonio-design-system/commit/77a08e024899c233c3b93534b78980f153c37314))


* removed RichTextEditor and Logo components ([1473146](https://github.com/Zextras/carbonio-design-system/commit/14731466348ca13df396261c413f984a425900a2))

### [0.2.2](https://github.com/Zextras/carbonio-design-system/compare/v0.2.1...v0.2.2) (2022-04-12)


### Bug Fixes

* custom modal crash on opening ([658516a](https://github.com/Zextras/carbonio-design-system/commit/658516aab7ba09c3265d863db0f638eccb015772))

### [0.2.1](https://github.com/Zextras/carbonio-design-system/compare/v0.2.0...v0.2.1) (2022-04-12)


### Bug Fixes

* select value loop ([6527738](https://github.com/Zextras/carbonio-design-system/commit/6527738ddd35ba515c4320c82fef5caf95c99c5a))

## [0.2.0](https://github.com/Zextras/carbonio-design-system/compare/v0.1.5...v0.2.0) (2022-04-12)


### ⚠ BREAKING CHANGES

* `window` is used as default reference for events and portals instead of window.top

### Features

* added windowObj key to the theme ([#29](https://github.com/Zextras/carbonio-design-system/issues/29)) ([e923bd0](https://github.com/Zextras/carbonio-design-system/commit/e923bd0c02df276bd33774f872e101be507fa7cf))

### 0.1.5 (2022-03-18)


### Features

* add enter key handler on input ([378752f](https://github.com/Zextras/carbonio-design-system/commit/378752f0a61725a5a8d7a634cae20b21bcb12f34))
* first commit ([4fc1510](https://github.com/Zextras/carbonio-design-system/commit/4fc151062de4c19e324261ab5fb611523a8a3119))
* updated icon set with new icons ([450e626](https://github.com/Zextras/carbonio-design-system/commit/450e62653477c1e362463ab71e7c045e58bc0454))


### Bug Fixes

* dark mode ([cd2a99e](https://github.com/Zextras/carbonio-design-system/commit/cd2a99e9d40422e1261ca49b1795d149fbfea5b9))
* dropdown close behaviour issue fixed ([d64bc61](https://github.com/Zextras/carbonio-design-system/commit/d64bc612f3c3f36e93cf3cceb037752b78cf4fbb))

### [0.1.2-beta.3](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.2-beta.2...v0.1.2-beta.3) (2021-12-29)


### Bug Fixes

* chipinput object value handled on trimmed ([ebbe559](https://bitbucket.org/zextras/zapp-ui/commit/ebbe55955f04e5368d80e228848fa46be3f34baf))

### [0.1.2-beta.2](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.2-beta.1...v0.1.2-beta.2) (2021-12-20)

### [0.1.2-beta.1](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.42...v0.1.2-beta.1) (2021-12-20)


### Features

* add missing tooltip placements ([4f2f77b](https://bitbucket.org/zextras/zapp-ui/commit/4f2f77ba95d05e68390c6df6b91d9c2b5cfd5e36))
* add support for custom props propagation for Breadcrumb and Dropdown items ([145aef6](https://bitbucket.org/zextras/zapp-ui/commit/145aef6f393c1e9372b5376e5ec25593d4265eae))
* added overflowTooltip opt-in prop on Text ([2d15ac6](https://bitbucket.org/zextras/zapp-ui/commit/2d15ac67dde91a3caaed3be0fd96a299eb56ab2d))
* added overflowTooltip to Text ([296d0a2](https://bitbucket.org/zextras/zapp-ui/commit/296d0a238856813d11cb550024b120c279707829))
* added show checkbox prop ([b2bbaac](https://bitbucket.org/zextras/zapp-ui/commit/b2bbaace090d9e77af9ffa7a3bc5fd6615564dc1))
* expone dropdown list container ref for external usage ([ed0570b](https://bitbucket.org/zextras/zapp-ui/commit/ed0570b3fcdad75a26131c6b3fc027cf6167dcba))
* unique chips prop added to chipinput ([98019a5](https://bitbucket.org/zextras/zapp-ui/commit/98019a5233cc503eec0f60f411af65a7b46f1019))


### Bug Fixes

* cc-nc licenses for image assets ([4605640](https://bitbucket.org/zextras/zapp-ui/commit/46056402911efa2d0475e0e2034f0bdb9680153d))
* corrected name in dep5 file ([977dde0](https://bitbucket.org/zextras/zapp-ui/commit/977dde0ac6753140672fd600d5e71abaac6a5e48))
* make split visibility calc container width before dom printing ([8ddc312](https://bitbucket.org/zextras/zapp-ui/commit/8ddc3123b965c3ccb9989efb7d7f33e349253910))
* removed the failing login request from CI, replaced with auth token ([b3bd5ac](https://bitbucket.org/zextras/zapp-ui/commit/b3bd5acd3723b71e7344b7d5cd68787489b5151f))
* used icon instead of iconbutton to fix layout problems ([b3e0513](https://bitbucket.org/zextras/zapp-ui/commit/b3e051347f1fc7797ef756895782a1f568ca3d77))

### [0.1.2-beta.0](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.42...v0.1.2-beta.0) (2021-12-20)


### Features

* add missing tooltip placements ([4f2f77b](https://bitbucket.org/zextras/zapp-ui/commit/4f2f77ba95d05e68390c6df6b91d9c2b5cfd5e36))
* add support for custom props propagation for Breadcrumb and Dropdown items ([145aef6](https://bitbucket.org/zextras/zapp-ui/commit/145aef6f393c1e9372b5376e5ec25593d4265eae))
* added overflowTooltip opt-in prop on Text ([2d15ac6](https://bitbucket.org/zextras/zapp-ui/commit/2d15ac67dde91a3caaed3be0fd96a299eb56ab2d))
* added overflowTooltip to Text ([296d0a2](https://bitbucket.org/zextras/zapp-ui/commit/296d0a238856813d11cb550024b120c279707829))
* added show checkbox prop ([b2bbaac](https://bitbucket.org/zextras/zapp-ui/commit/b2bbaace090d9e77af9ffa7a3bc5fd6615564dc1))
* expone dropdown list container ref for external usage ([ed0570b](https://bitbucket.org/zextras/zapp-ui/commit/ed0570b3fcdad75a26131c6b3fc027cf6167dcba))
* unique chips prop added to chipinput ([98019a5](https://bitbucket.org/zextras/zapp-ui/commit/98019a5233cc503eec0f60f411af65a7b46f1019))


### Bug Fixes

* corrected name in dep5 file ([977dde0](https://bitbucket.org/zextras/zapp-ui/commit/977dde0ac6753140672fd600d5e71abaac6a5e48))
* make split visibility calc container width before dom printing ([8ddc312](https://bitbucket.org/zextras/zapp-ui/commit/8ddc3123b965c3ccb9989efb7d7f33e349253910))
* removed the failing login request from CI, replaced with auth token ([b3bd5ac](https://bitbucket.org/zextras/zapp-ui/commit/b3bd5acd3723b71e7344b7d5cd68787489b5151f))
* used icon instead of iconbutton to fix layout problems ([b3e0513](https://bitbucket.org/zextras/zapp-ui/commit/b3e051347f1fc7797ef756895782a1f568ca3d77))

## [0.1.0-beta.45](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.42...v0.1.0-beta.45) (2021-11-29)


### Features

* add support for custom props propagation for Breadcrumb and Dropdown items ([145aef6](https://bitbucket.org/zextras/zapp-ui/commit/145aef6f393c1e9372b5376e5ec25593d4265eae))
* added overflowTooltip opt-in prop on Text ([2d15ac6](https://bitbucket.org/zextras/zapp-ui/commit/2d15ac67dde91a3caaed3be0fd96a299eb56ab2d))
* added overflowTooltip to Text ([296d0a2](https://bitbucket.org/zextras/zapp-ui/commit/296d0a238856813d11cb550024b120c279707829))
* expone dropdown list container ref for external usage ([ed0570b](https://bitbucket.org/zextras/zapp-ui/commit/ed0570b3fcdad75a26131c6b3fc027cf6167dcba))
* unique chips prop added to chipinput ([98019a5](https://bitbucket.org/zextras/zapp-ui/commit/98019a5233cc503eec0f60f411af65a7b46f1019))


### Bug Fixes

* make split visibility calc container width before dom printing ([8ddc312](https://bitbucket.org/zextras/zapp-ui/commit/8ddc3123b965c3ccb9989efb7d7f33e349253910))
* used icon instead of iconbutton to fix layout problems ([b3e0513](https://bitbucket.org/zextras/zapp-ui/commit/b3e051347f1fc7797ef756895782a1f568ca3d77))

## [0.1.0-beta.43](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.42...v0.1.0-beta.43) (2021-11-29)


### Features

* add support for custom props propagation for Breadcrumb and Dropdown items ([145aef6](https://bitbucket.org/zextras/zapp-ui/commit/145aef6f393c1e9372b5376e5ec25593d4265eae))
* added overflowTooltip opt-in prop on Text ([2d15ac6](https://bitbucket.org/zextras/zapp-ui/commit/2d15ac67dde91a3caaed3be0fd96a299eb56ab2d))
* added overflowTooltip to Text ([296d0a2](https://bitbucket.org/zextras/zapp-ui/commit/296d0a238856813d11cb550024b120c279707829))
* expone dropdown list container ref for external usage ([ed0570b](https://bitbucket.org/zextras/zapp-ui/commit/ed0570b3fcdad75a26131c6b3fc027cf6167dcba))
* unique chips prop added to chipinput ([98019a5](https://bitbucket.org/zextras/zapp-ui/commit/98019a5233cc503eec0f60f411af65a7b46f1019))


### Bug Fixes

* make split visibility calc container width before dom printing ([8ddc312](https://bitbucket.org/zextras/zapp-ui/commit/8ddc3123b965c3ccb9989efb7d7f33e349253910))
* used icon instead of iconbutton to fix layout problems ([b3e0513](https://bitbucket.org/zextras/zapp-ui/commit/b3e051347f1fc7797ef756895782a1f568ca3d77))

## [0.1.0-beta.42](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.41...v0.1.0-beta.42) (2021-10-29)


### Features

* add forceActive prop to Button ([a41c39b](https://bitbucket.org/zextras/zapp-ui/commit/a41c39ba3303227589dd34668a4a1c417c325433))


### Bug Fixes

* change font size of accordionItem ([4a9a90b](https://bitbucket.org/zextras/zapp-ui/commit/4a9a90b13a967336e2bef1b0888cc871d3bd5a5f))

## [0.1.0-beta.41](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.40...v0.1.0-beta.41) (2021-10-26)


### Bug Fixes

* change font size of accordionItem ([4a9a90b](https://bitbucket.org/zextras/zapp-ui/commit/4a9a90b13a967336e2bef1b0888cc871d3bd5a5f))
* default value updated on change in value ([19e88c0](https://bitbucket.org/zextras/zapp-ui/commit/19e88c08559c67f312ee9fecde70e55490b5ab42))

## [0.1.0-beta.40](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.39...v0.1.0-beta.40) (2021-10-22)


### Features

* added opt out on list keyboard actions ([2384c89](https://bitbucket.org/zextras/zapp-ui/commit/2384c89905cdeb7246c450e68fa7e6613d7e9fc8))
* graphical improvements ([5375418](https://bitbucket.org/zextras/zapp-ui/commit/5375418cf64d050eeb06b96beb4ad7a8de5867e4))


### Bug Fixes

* accordion levels and divider ([d9d2722](https://bitbucket.org/zextras/zapp-ui/commit/d9d27221262f1a5c5b4df4c28a3085ba1dfffee1))
* npm registry url ([e3f7e88](https://bitbucket.org/zextras/zapp-ui/commit/e3f7e88b61fc9e7f12a8455f6e2e9e01a951374e))

## [0.1.0-beta.39](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.38...v0.1.0-beta.39) (2021-10-04)


### Features

* support custom components as tabbar label ([dab47e8](https://bitbucket.org/zextras/zapp-ui/commit/dab47e8a7d9ec90652448c28c0accf60e7f1ac5a))


### Bug Fixes

* add key to chips inside chipinput ([b95e446](https://bitbucket.org/zextras/zapp-ui/commit/b95e4467895316438e00c8e1caf5369d45e75bb1))
* change font weight for chip key and label ([b95bcb5](https://bitbucket.org/zextras/zapp-ui/commit/b95bcb521d57da7043cc54056a18d3ebbc9cf71e))
* icons coloring ([0d23664](https://bitbucket.org/zextras/zapp-ui/commit/0d2366429b34e66c72610932ef20161de3691c46))
* increase chip min-height to include button padding ([865a486](https://bitbucket.org/zextras/zapp-ui/commit/865a4863e6725e4959dd7754e01698c71b1a2821))
* prevent default for chip and chip actions click events ([3d5cad6](https://bitbucket.org/zextras/zapp-ui/commit/3d5cad60c3ea2331b0bbef08cfae298748f39605))
* remove backgroundColor from icon (unsupported prop) ([6d3e8ca](https://bitbucket.org/zextras/zapp-ui/commit/6d3e8ca846857369293dadc5d9af9e0bbf2c43f6))
* remove invalid props from custom modal in modal manager ([3215bcd](https://bitbucket.org/zextras/zapp-ui/commit/3215bcdd65e96808949f3857336d82057d3e17ad))
* set chip action type prop as required ([0864f12](https://bitbucket.org/zextras/zapp-ui/commit/0864f12e87d3a8a90eba0c412e095db0f008e48f))

## [0.1.0-beta.38](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.37...v0.1.0-beta.38) (2021-09-27)


### Features

* added base url prop to the RTE component ([1a2a9d5](https://bitbucket.org/zextras/zapp-ui/commit/1a2a9d53508eeaccbfe1eb6e6a944200824c1bd6))

## [0.1.0-beta.37](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.36...v0.1.0-beta.37) (2021-09-20)


### Bug Fixes

* checked list item icon reduced in size ([39d5b88](https://bitbucket.org/zextras/zapp-ui/commit/39d5b8892b5abd37b15816c13e474baeb4986ef3))

## [0.1.0-beta.36](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.35...v0.1.0-beta.36) (2021-09-20)


### Bug Fixes

* inhreit cursor type if onClick not specified ([1a39bc9](https://bitbucket.org/zextras/zapp-ui/commit/1a39bc99dbe91575d86c8914ffd6b22c52ce5a22))

## [0.1.0-beta.35](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.34...v0.1.0-beta.35) (2021-09-20)


### Features

* added bottom border on chipinput dropdown ([eda249f](https://bitbucket.org/zextras/zapp-ui/commit/eda249f81ce3a74c342b45c6ca0d0057a070fe1f))

## [0.1.0-beta.34](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.33...v0.1.0-beta.34) (2021-09-17)

## [0.1.0-beta.33](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.32...v0.1.0-beta.33) (2021-09-15)


### ⚠ BREAKING CHANGES

* refactor of Chip props
- "hasError" is replaced by "error"
- "picture" is replaced by "avatarPicture"
- "icon" is replaced by "avatarIcon"
- "iconBackground" is replaced by "avatarBackground"
- "closable" define whether the close action is disabled or not.
- "onClose" value define if the action is visible (if valued) or hidden (if undefined)
- default chip background is now gray3 instead of gray4
- default chip color is inherited from every component color instead of being "secondary"
- "closable" is true by default, while "onClose" remains undefined

- add chip actions
- add chip shape
- add max width to force label value ellipsis
- add label key
- add size
- make label optional
- allow label to be a node for highly customizable text
- handle pseudo statuses for chip background
- add tooltip to show error or disabled messages
- show tooltip for cropped label even for chips with disabled or error status
- hide actions tooltips when chip is disabled
- avoid tooltips to overlap each other
- prefix props for avatar customization with "avatar"
- give avatarLabel priority over label to customize capitals of the avatar in the chip
- update chip documentation
- update tests

refs: IRIS-1766

### Features

* add disabled prop on Avatar to use disabled variant in icon color and background ([0fd6221](https://bitbucket.org/zextras/zapp-ui/commit/0fd6221a9d669d29c2b95907450fa62744ce620d))
* add flexShrink prop in Row and set max width as default prop instead of fixed style rule ([e70f755](https://bitbucket.org/zextras/zapp-ui/commit/e70f755544e8b9d30e348c66dceb655bcda71fe1))
* added keyboard shortcuts ([754f76d](https://bitbucket.org/zextras/zapp-ui/commit/754f76dd0c0e8873485ee22567e8541f32258d8f))
* added more keyboard actions ([f46d189](https://bitbucket.org/zextras/zapp-ui/commit/f46d189a77eca5e8a7a8d2e2858f18376bbac16a))
* added shortcuts ([97d2f4d](https://bitbucket.org/zextras/zapp-ui/commit/97d2f4db56fb4ad19263a9f5f91d419239f9a992))
* chip refactor with new features ([649a72b](https://bitbucket.org/zextras/zapp-ui/commit/649a72bbe718e4da1750594e2a25d594ec99ec6e))
* color selection through getColor utilities in Icon and Text components ([b6f4e5d](https://bitbucket.org/zextras/zapp-ui/commit/b6f4e5db025ac08b166448791bc76d161397251e))


### Bug Fixes

* avoid to create popper if tooltip is not show ([d2314f9](https://bitbucket.org/zextras/zapp-ui/commit/d2314f93650bb82c963684302fd1e3a2dbbb8db4))
* fix Avatar shape prop definition and add documentation ([dbe5fb8](https://bitbucket.org/zextras/zapp-ui/commit/dbe5fb8f016c32e497174c749dce2b12acf41630))
* remove grab cursor from icon ([11391b4](https://bitbucket.org/zextras/zapp-ui/commit/11391b41d4d587f0ecfb96f7f76dc29d25afff7c))

## [0.1.0-beta.32](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.31...v0.1.0-beta.32) (2021-09-15)


### Features

* added errorBackgroundColor ([0b7bdfe](https://bitbucket.org/zextras/zapp-ui/commit/0b7bdfea6ea18e9c0221db340140babf5cd0f86a))

## [0.1.0-beta.31](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.30...v0.1.0-beta.31) (2021-09-03)


### Features

* avatar sizes update ([8bf844b](https://bitbucket.org/zextras/zapp-ui/commit/8bf844b460ab3b1e867b8393508ef5af371b39a9))
* datetime picker implemented ([4828f55](https://bitbucket.org/zextras/zapp-ui/commit/4828f554980940b622e3960d636c87d47efa2283))
* updated icons set ([1960439](https://bitbucket.org/zextras/zapp-ui/commit/1960439c54fd278785895b7bd1abcfc2471a55af))

## [0.1.0-beta.30](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.29...v0.1.0-beta.30) (2021-08-30)


### Features

* customize Dropdown item background color ([bfb4814](https://bitbucket.org/zextras/zapp-ui/commit/bfb4814e1686cf63aa35991ef3874d5971fef512))


### Bug Fixes

* avoid TypeError item.click is not a function if click is not defined ([db6f8f8](https://bitbucket.org/zextras/zapp-ui/commit/db6f8f81c43c70883c4ca76a6e3975287ced1ab6))
* propagate props to nested dropdown, parameterized item icon text and padding size ([d9e11f2](https://bitbucket.org/zextras/zapp-ui/commit/d9e11f221f53efe52d8b385baf8a3de2efc1e9db))

## [0.1.0-beta.29](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.28...v0.1.0-beta.29) (2021-08-23)


### Features

* icon and icon background added to chip ([051ead6](https://bitbucket.org/zextras/zapp-ui/commit/051ead6d8b18689eb13631164465094e0d9cccb0))
* improved list component and documentation ([6611dd0](https://bitbucket.org/zextras/zapp-ui/commit/6611dd09f42016aa5612099e0388cf2b340d3a36))


### Bug Fixes

* use dropdown for selecting chips ([9d8ca72](https://bitbucket.org/zextras/zapp-ui/commit/9d8ca723241093dc870a03b27f4420adeed95c8e))

## [0.1.0-beta.28](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.27...v0.1.0-beta.28) (2021-08-20)


### Features

* avatar selectability and list focusing ([482a4c4](https://bitbucket.org/zextras/zapp-ui/commit/482a4c48c5555eb7e1eed9847e61b9c301fcbc69))
* max chips and error display implemented ([aa28d8c](https://bitbucket.org/zextras/zapp-ui/commit/aa28d8c03da3d40d3b7a7f289dd6098ada9855d6))

## [0.1.0-beta.27](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.26...v0.1.0-beta.27) (2021-08-13)


### Features

* added wrapping prop to chipInput ([0d61e0c](https://bitbucket.org/zextras/zapp-ui/commit/0d61e0c7ead4dec9d7ce6c6b3b017945788e6f5c))
* made the new behavior default ([635281d](https://bitbucket.org/zextras/zapp-ui/commit/635281d1c4325b4879ecc5776416ad6ffa8154f3))


### Bug Fixes

* omitted call of onInputType if the prop is missing ([4d9b8ac](https://bitbucket.org/zextras/zapp-ui/commit/4d9b8ac7ceaf37dcb01472f70b0bd86e72e25323))

## [0.1.0-beta.26](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.25...v0.1.0-beta.26) (2021-08-09)

## [0.1.0-beta.25](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.24...v0.1.0-beta.25) (2021-08-05)


### Features

* added itemProps proxy prop ([ec57104](https://bitbucket.org/zextras/zapp-ui/commit/ec571049d7591234a7902c7938c530c13d1e2d9a))
* restored List component ([b558be0](https://bitbucket.org/zextras/zapp-ui/commit/b558be0d44914641352bb863c8b8e9322ececa1c))


### Bug Fixes

* accordion divder position corrected ([235f3c8](https://bitbucket.org/zextras/zapp-ui/commit/235f3c8d1c4149250c2250c89f2f6a32a8ad5e43))
* added missing changes to List ([ced5395](https://bitbucket.org/zextras/zapp-ui/commit/ced5395bd9883c10f7a5319217f1acc486edc1b1))
* disabled hover effects on items that don't have a callback ([b02bbc2](https://bitbucket.org/zextras/zapp-ui/commit/b02bbc272915ce46a8e5656e64903360662f8889))
* optimize dropdown close callback ([fb8e758](https://bitbucket.org/zextras/zapp-ui/commit/fb8e7580851c7ce79ba79a40c47518a32ec9f44f))

## [0.1.0-beta.24](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.23...v0.1.0-beta.24) (2021-07-26)


### Features

* drag drop feature first draft version ([c4debca](https://bitbucket.org/zextras/zapp-ui/commit/c4debcaed079f1dcd0b81a591b596636428b78a7))
* rework of small buttons option ([cee38d0](https://bitbucket.org/zextras/zapp-ui/commit/cee38d0d604f544fdaf50ae2832e5b44b615b13d))

## [0.1.0-beta.23](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.22...v0.1.0-beta.23) (2021-07-26)


### Bug Fixes

* event propogation on modals stopped ([412a2c6](https://bitbucket.org/zextras/zapp-ui/commit/412a2c686eba4718dc384e860b435f0eb400f53c))

## [0.1.0-beta.22](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.21...v0.1.0-beta.22) (2021-07-26)

## [0.1.0-beta.21](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.20...v0.1.0-beta.21) (2021-07-23)


### Bug Fixes

* confirmChipOnBlur ([e5cf370](https://bitbucket.org/zextras/zapp-ui/commit/e5cf3709d921a9ba7b75d005eef1235517969302))

## [0.1.0-beta.20](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.19...v0.1.0-beta.20) (2021-07-23)


### Features

* added confirmChipOnSpace and separators props ([516dad0](https://bitbucket.org/zextras/zapp-ui/commit/516dad0a450b7e8fe4da7caad4ebf03ab3b19e42))
* shimmer components ([58bda72](https://bitbucket.org/zextras/zapp-ui/commit/58bda727102b3aab76ed4b021868ebca206a8059))
* updated package fields, small changes ([7750345](https://bitbucket.org/zextras/zapp-ui/commit/775034580a1989b993364215b66524ac98e1b917))


### Bug Fixes

* fixed index.test ([99d0d1d](https://bitbucket.org/zextras/zapp-ui/commit/99d0d1d631ae7ad69ccbfaa1e7a320c2863dbd5e))
* fixed minor bug ([1f3c074](https://bitbucket.org/zextras/zapp-ui/commit/1f3c074c53b1723fc9c5d4a5147d9e30bea9803a))
* fixed minor bug ([b68de9b](https://bitbucket.org/zextras/zapp-ui/commit/b68de9b1de1d5462c083e5aca7ede47fa7443570))

## [0.1.0-beta.19](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.18...v0.1.0-beta.19) (2021-07-12)


### ⚠ BREAKING CHANGES

* dropped 'valueKey' and 'getChipLabel' props.

Now the logic of how to render the chip is delegated to 'onAdd' callback.

Added utilities functions (getPadding, getParsedPadding) to get padding in styled-components.
Added background and color props to Chip component.

* refactored some of ChipInput logic ([6ea61bc](https://bitbucket.org/zextras/zapp-ui/commit/6ea61bc57f98bfad5fa183ebb5fc14257a186885))

## [0.1.0-beta.18](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.17...v0.1.0-beta.18) (2021-06-24)


### Features

* added hasError prop to Chip component ([09cf2bb](https://bitbucket.org/zextras/zapp-ui/commit/09cf2bbeadc99101327f632e5f57056d26e392b3))
* updated icon-set ([012cec6](https://bitbucket.org/zextras/zapp-ui/commit/012cec6cc132d97d93293c07501fec5a71232016))

## [0.1.0-beta.17](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.16...v0.1.0-beta.17) (2021-06-11)


### Bug Fixes

* increased accordion children's padding ([628105a](https://bitbucket.org/zextras/zapp-ui/commit/628105af088c3b0d4f2e50b388d82febb1606c7f))

## [0.1.0-beta.16](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.15...v0.1.0-beta.16) (2021-06-11)


### Features

* snackbar multiline ([c5b2b2e](https://bitbucket.org/zextras/zapp-ui/commit/c5b2b2e1d4f049ba73994a4dd2938d7ff3f989ed))

## [0.1.0-beta.15](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.14...v0.1.0-beta.15) (2021-06-01)


### Features

* added CustomIcon on Input component and refactored Password to use Input in its implementation ([e47cc68](https://bitbucket.org/zextras/zapp-ui/commit/e47cc68ed304dd5fab5814eeaf5e2da0063b673a))
* added disabled prop to Tooltip ([7b229cb](https://bitbucket.org/zextras/zapp-ui/commit/7b229cb13ca05dd621db6a2eab4726742817aa98))
* added radio and radiogroup components ([c6786c0](https://bitbucket.org/zextras/zapp-ui/commit/c6786c0bd25e9c0d5949adf02b8b8501e812ad65))
* input accepts react components as prop ([8f1e4c5](https://bitbucket.org/zextras/zapp-ui/commit/8f1e4c55a88cf7e5bb3e2f0c6e58e78a361ee57b))

## [0.1.0-beta.14](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.13...v0.1.0-beta.14) (2021-05-27)


### Features

* added MultiButton and extended Dropdown ([9a66f2f](https://bitbucket.org/zextras/zapp-ui/commit/9a66f2fb788c1f28ffe0b3ba6e740c45ef1b8966))
* added option to hide checkboxes and make labels bold ([de06e32](https://bitbucket.org/zextras/zapp-ui/commit/de06e3217c9fee844044dd4f299706ebcc918460))
* label of select in header is also alignable on the right and left ([974669d](https://bitbucket.org/zextras/zapp-ui/commit/974669d78e5eb2359853cf135a82e159f9fc5afc))
* labels of select in header are now alignable, table rows selectable on click ([816476d](https://bitbucket.org/zextras/zapp-ui/commit/816476df4e062c1ad5cc7ef63be67e6f2002d3a0))


### Bug Fixes

* disabled buttons changing color when forcing hover/active/focus state ([bcbf95d](https://bitbucket.org/zextras/zapp-ui/commit/bcbf95d32a328e1b0f13443c4b5be35e96927a04))

## [0.1.0-beta.13](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.12...v0.1.0-beta.13) (2021-05-12)


### Features

* added width and height props to Padding component ([46f10d9](https://bitbucket.org/zextras/zapp-ui/commit/46f10d905ab8dbced9ef3c3224077d56c5b55469))
* updated crown icon ([10173dd](https://bitbucket.org/zextras/zapp-ui/commit/10173dd1e8597747bac37e5ecbfadc2faee032f6))


### Bug Fixes

* fixed Input and Password placeholder label that was overlaping its content ([8512660](https://bitbucket.org/zextras/zapp-ui/commit/8512660d516a8ee8a25c1d48ac4e55e031741f33))

## [0.1.0-beta.12](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.11...v0.1.0-beta.12) (2021-04-22)


### Features

* added the possibility for Icon component to accept custom svg icons ([f461dc6](https://bitbucket.org/zextras/zapp-ui/commit/f461dc615a822eb7da58284421b71db993388121))
* updated icon set ([0fe6c3d](https://bitbucket.org/zextras/zapp-ui/commit/0fe6c3df0b3c2133ee531e54aad77b167c710a85))


### Bug Fixes

* fixed Input and Password label position that was bugged sometimes in browser autocompletition ([b305417](https://bitbucket.org/zextras/zapp-ui/commit/b3054176ef9e78368f088467848d5f045e333c38))
* fixed Unpin3 icon ([af11284](https://bitbucket.org/zextras/zapp-ui/commit/af11284be7bd0e65465f18cbea3804f252f2a333))
* force viewbox to 24x24 for icons ([a31d102](https://bitbucket.org/zextras/zapp-ui/commit/a31d10251954d842cf90f444ad7256940b1458dc))
* removed redundant and bugged icon ([fd481eb](https://bitbucket.org/zextras/zapp-ui/commit/fd481eb5c8a7314cdfe65a3602e2a30ccb10f6f1))

## [0.1.0-beta.11](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.10...v0.1.0-beta.11) (2021-04-06)


### Features

* created FormSection, FormSubSection and FormRow components ([301a8fe](https://bitbucket.org/zextras/zapp-ui/commit/301a8fedaaa384fd909ef31f7cb1165ac1afc7a4))

## [0.1.0-beta.10](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.9...v0.1.0-beta.10) (2021-03-29)

## [0.1.0-beta.9](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.8...v0.1.0-beta.9) (2021-03-19)


### Bug Fixes

* rolled back to webpack 5.4.0 ([5920782](https://bitbucket.org/zextras/zapp-ui/commit/5920782ef3f667ba5d2eebffabbb20679aada874))

## [0.1.0-beta.8](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.7...v0.1.0-beta.8) (2021-03-19)


### Bug Fixes

* process is undefined ([1c62947](https://bitbucket.org/zextras/zapp-ui/commit/1c6294760b3578a31366bd0b2e1eac81a2beeff4))

## [0.1.0-beta.7](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.6...v0.1.0-beta.7) (2021-03-17)


### Features

* general dependencies update, reorder and cleanup ([4cc086b](https://bitbucket.org/zextras/zapp-ui/commit/4cc086b240bc9085026af1c35b7fd24502f7a2fe))


### Bug Fixes

* duplicated peerDeps as devDeps for CI purposes, should not impact final bundle size ([cdbe631](https://bitbucket.org/zextras/zapp-ui/commit/cdbe63115a87c677cf4f976e2b0947cf22390bb4))

## [0.1.0-beta.6](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.5...v0.1.0-beta.6) (2021-03-16)


### ⚠ BREAKING CHANGES

* refer to the docs for the change in the provider API

### Features

* general theming overhaul ([68638e3](https://bitbucket.org/zextras/zapp-ui/commit/68638e36e69519ab4fe15c8b36c19c3e1cffe7a8))


### Bug Fixes

* fixed wrong assets url ([ebad096](https://bitbucket.org/zextras/zapp-ui/commit/ebad096aefc05d3f27f2cc38b36cdb8a3b44598e))

## [0.1.0-beta.5](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.4...v0.1.0-beta.5) (2021-03-09)


### Bug Fixes

* fix tentative to window.matchMedia not working on safari ([2cb0156](https://bitbucket.org/zextras/zapp-ui/commit/2cb0156ac4d2d60e5e8f90167482976151bdde15))
* readded babelrc file needed when using DS as a submodule ([1df8c2c](https://bitbucket.org/zextras/zapp-ui/commit/1df8c2cf0adedc69e70b9eac958f00d1ef19c546))

## [0.1.0-beta.4](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.3...v0.1.0-beta.4) (2021-03-02)


### Bug Fixes

* fixed multiple appearance of contextmenus ([b1bed38](https://bitbucket.org/zextras/zapp-ui/commit/b1bed38eaaff57b4bb1c3285611da88204811bf8))

## [0.1.0-beta.3](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.2...v0.1.0-beta.3) (2021-03-02)


### Features

* open dropdown at cursor position  on context menu ([fdcfef6](https://bitbucket.org/zextras/zapp-ui/commit/fdcfef677bfe3563a2e026fc181a3de530a554a1))


### Bug Fixes

* fixed a regex in Padding component that was breaking safari ([bef2abc](https://bitbucket.org/zextras/zapp-ui/commit/bef2abcf1d5cf02357bf343c644313aaf8a154d1))
* fixed disabled select visualization ([dc8423f](https://bitbucket.org/zextras/zapp-ui/commit/dc8423fd930c8f5245e8e8a417217cd105c38a23))

## [0.1.0-beta.2](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.1...v0.1.0-beta.2) (2021-02-18)


### Bug Fixes

* added missing background prop to accordion items ([c9edb83](https://bitbucket.org/zextras/zapp-ui/commit/c9edb83f8acdeff971404c666866976d88956fdb))

## [0.1.0-beta.1](https://bitbucket.org/zextras/zapp-ui/compare/v0.1.0-beta.0...v0.1.0-beta.1) (2021-02-15)


### Features

* added `background` prop and `open` item property to the Accordion component ([a5d8ddd](https://bitbucket.org/zextras/zapp-ui/commit/a5d8ddd37ed4e1ef1361c2f36987c58a30dc84af))
* added preventDefault prop to Dropdown ([969d9a2](https://bitbucket.org/zextras/zapp-ui/commit/969d9a2b2dae6b7601d4fe476fdf649420de470f))
* added ZimbraClassicThemeContextProvider ([1352124](https://bitbucket.org/zextras/zapp-ui/commit/135212406f1763bd509c02387ab813cf89243c88))
* updated icon set ([3be58fa](https://bitbucket.org/zextras/zapp-ui/commit/3be58fadc69bf5482017eeab6e161110aafa84b8))


### Bug Fixes

* added forwardRef to DefaultTabBarItem ([ec00bb9](https://bitbucket.org/zextras/zapp-ui/commit/ec00bb9e1eae59c1768a08fb7a7a5b0d7dbb1f68))
* added tests to Catcher and Responsive components ([f87758d](https://bitbucket.org/zextras/zapp-ui/commit/f87758dd09ee6503f303a4e6ae80c8596c765e11))

## [0.1.0-beta.0](https://bitbucket.org/zextras/zapp-ui/compare/v0.0.64-beta.14...v0.1.0-beta.0) (2021-02-10)


### ⚠ BREAKING CHANGES

* create a theme require to use new react-based APIs

### Features

* added cobertura coverage report implementation, fixed few tests ([a84bcd3](https://bitbucket.org/zextras/zapp-ui/commit/a84bcd36e7ae77d084552c03acf8cbf7b5f35b03))
* added jenkinsfile config and cobertura coverage ([1aeba41](https://bitbucket.org/zextras/zapp-ui/commit/1aeba41365ce4587a48f011567350b4500586093))


* refactor of the theme management ([56c693b](https://bitbucket.org/zextras/zapp-ui/commit/56c693bfd5ace4c27db0fff49d5e092648b932f9))

### [0.0.64-beta.14](https://bitbucket.org/zextras/zapp-ui/compare/v0.0.64-beta.13...v0.0.64-beta.14) (2021-02-01)


### Features

* added background prop to the Avatar component to enable themed coloring ([9cc7972](https://bitbucket.org/zextras/zapp-ui/commit/9cc79726c997bc871fae09332a889759cbfe5786))
* updated accordion structure and props to simplify development and component usage ([6e927c6](https://bitbucket.org/zextras/zapp-ui/commit/6e927c6fa5be61e53a575a690503f70fe0c5e2e4))


### Bug Fixes

* changed divider implementation to avoid weird sizing phenomena ([1f378f9](https://bitbucket.org/zextras/zapp-ui/commit/1f378f9e96fac37cd07acab05a03a820a9c5ce66))

### [0.0.64-beta.13](https://bitbucket.org/zextras/zapp-ui/compare/v0.0.64-beta.12...v0.0.64-beta.13) (2021-01-26)


### Bug Fixes

* fixed CustomModal doc that was using the vanilla modal ([a153631](https://bitbucket.org/zextras/zapp-ui/commit/a153631ce5580fa9a772515674856c73e1513bb7))
* fixed mis-named prop forwarding for the accordion root click event ([cd47ae9](https://bitbucket.org/zextras/zapp-ui/commit/cd47ae94ffdcca3699a019a7ab7907240dcd2460))

### [0.0.64-beta.12](https://bitbucket.org/zextras/zapp-ui/compare/v0.0.64-beta.11...v0.0.64-beta.12) (2021-01-25)


### Features

* added CustomModal component ([aded18d](https://bitbucket.org/zextras/zapp-ui/commit/aded18d472b382703239ac9a1ef9845752bae8bf))


### Bug Fixes

* fixed control mode  error for the input component ([e460028](https://bitbucket.org/zextras/zapp-ui/commit/e460028ddd55757cc073a8d185c74e10b7e6216d))
* fixed incorrect prop forwarding for the customized accordion elements ([1a6d452](https://bitbucket.org/zextras/zapp-ui/commit/1a6d4522c3aaf9d5418e11665ddf96a94461fa07))
* modalmanager restores the default overflow style after a modal is closed ([0f10a4a](https://bitbucket.org/zextras/zapp-ui/commit/0f10a4a79f95a1c0187395ad64346df477262e2b))

### [0.0.64-beta.11](https://bitbucket.org/zextras/zapp-ui/compare/v0.0.64-beta.10...v0.0.64-beta.11) (2021-01-18)


### Bug Fixes

* recreated the icon index files ([afe275e](https://bitbucket.org/zextras/zapp-ui/commit/afe275e7be275191c51eefa541cbb33e9da320f2))

### [0.0.64-beta.10](https://bitbucket.org/zextras/zapp-ui/compare/v0.0.64-beta.9...v0.0.64-beta.10) (2021-01-15)


### Features

* accordion component customizability ([bb173b5](https://bitbucket.org/zextras/zapp-ui/commit/bb173b56bca6a7154cd51abd08695630a40babbb))
* changed the dropdown width prop to allow custom values ([24e9bdf](https://bitbucket.org/zextras/zapp-ui/commit/24e9bdf368151407e43deb8dce57e87466824b6f))
* created modal manager ([2e10988](https://bitbucket.org/zextras/zapp-ui/commit/2e10988e3bc4c07c5626028b74130eca84a59fee))
* updated icon pack ([100820b](https://bitbucket.org/zextras/zapp-ui/commit/100820bb673526c53c40332db4439a6dc96efaea))

### [0.0.64-beta.9](https://bitbucket.org/zextras/zapp-ui/compare/v0.0.64-beta.8...v0.0.64-beta.9) (2020-12-23)


### Features

* added light weight to fonts properties in Theme object ([6d8cf88](https://bitbucket.org/zextras/zapp-ui/commit/6d8cf8833a7ed66bc75c7d3e144b34cb6d632407))
* added the option to load the default font directly from the DS ([2704909](https://bitbucket.org/zextras/zapp-ui/commit/2704909e4c2e32f8db0f88d1eb4c2c027bf598c8))


### Bug Fixes

* _postinstall replaced with postinstall in package.json ([ad11bf9](https://bitbucket.org/zextras/zapp-ui/commit/ad11bf959c31bf66c9d38fbd9d04363a145fe65b))
* custom title component added ([1c96eab](https://bitbucket.org/zextras/zapp-ui/commit/1c96eabc35a49252254412053b12afad44128681))

### [0.0.64-beta.8](https://bitbucket.org/zextras/zapp-ui/compare/v0.0.64-beta.7...v0.0.64-beta.8) (2020-12-21)


### Features

* added Switch component and useCheckbox hook ([9d2d168](https://bitbucket.org/zextras/zapp-ui/commit/9d2d168854ccac5e61e6c857c3eccb2473c421f8))


### Bug Fixes

* fixed List component ([ebfa152](https://bitbucket.org/zextras/zapp-ui/commit/ebfa152d234a4df8ccd02f558d185ce4397cc97a))

### [0.0.64-beta.7](https://bitbucket.org/zextras/zapp-ui/compare/v0.0.64-beta.6...v0.0.64-beta.7) (2020-12-21)

### [0.0.64-beta.6](https://bitbucket.org/zextras/zapp-ui/compare/v0.0.64-beta.5...v0.0.64-beta.6) (2020-12-14)


### Bug Fixes

* fixed disableAutoFocus not working correctly ([96036e6](https://bitbucket.org/zextras/zapp-ui/commit/96036e6b250c074e790821634d98055e05663ec5))

### [0.0.64-beta.5](https://bitbucket.org/zextras/zapp-ui/compare/v0.0.64-beta.4...v0.0.64-beta.5) (2020-12-11)


### Bug Fixes

* inputRef is correctly assigned ([38d64e5](https://bitbucket.org/zextras/zapp-ui/commit/38d64e5ddf19e40ad5254b246ce7d266de56a8b5))

### [0.0.64-beta.4](https://bitbucket.org/zextras/zapp-ui/compare/v0.0.64-beta.3...v0.0.64-beta.4) (2020-12-11)


### Bug Fixes

* propTypes error on chipInput ([a203f33](https://bitbucket.org/zextras/zapp-ui/commit/a203f337077d9c9ceeebeacc3e14bdcb682beeb0))

### [0.0.64-beta.3](https://bitbucket.org/zextras/zapp-ui/compare/v0.0.64-beta.2...v0.0.64-beta.3) (2020-12-11)


### Features

* added maxHeight and disableAutoFocus to Dropdown, inputRef and confirmChipOnBlur to ChipInput ([8e428fc](https://bitbucket.org/zextras/zapp-ui/commit/8e428fc3187c56e411596f58b4374b86fce38611))

### [0.0.64-beta.2](https://bitbucket.org/zextras/zapp-ui/compare/v0.0.64-beta.1...v0.0.64-beta.2) (2020-12-10)

### [0.0.64-beta.1](https://bitbucket.org/zextras/zapp-ui/compare/v0.0.64-beta.0...v0.0.64-beta.1) (2020-12-10)


### Features

* added external state control of the Dropdown opening/closing ([0810c85](https://bitbucket.org/zextras/zapp-ui/commit/0810c854bd4e98345a4f2f47c871504e4854518e))
* added onInputType callback prop to handle typing events on ChipInput ([c0423d3](https://bitbucket.org/zextras/zapp-ui/commit/c0423d36c12b3b2fcbfe4a679028e00dc2601b39))


### Bug Fixes

* added prop check on onInputType callback call ([3f07caf](https://bitbucket.org/zextras/zapp-ui/commit/3f07caf055cf6fe031345991b2d8cb0968ff92a7))

### [0.0.64-beta.0](https://bitbucket.org/zextras/zapp-ui/compare/v0.0.63...v0.0.64-beta.0) (2020-12-09)


### Bug Fixes

* **development:** fixed jenkins pipeline ([b480d36](https://bitbucket.org/zextras/zapp-ui/commit/b480d36ad7c1074be1ac1a5cbc78136fe06496ca))
* **development:** fixed jenkins pipeline ([40d2871](https://bitbucket.org/zextras/zapp-ui/commit/40d2871666bcf0f25232588dc2f7e661f576cc25))

### [0.0.63](https://bitbucket.org/zextras/zapp-ui/compare/v0.0.62...v0.0.63) (2020-12-09)


### Bug Fixes

* **development:** fixed jenkins pipeline ([f5fa875](https://bitbucket.org/zextras/zapp-ui/commit/f5fa87556a77d3390b6bbf51125a0c62aba0bcb1))

### [0.0.62](https://bitbucket.org/zextras/zapp-ui/compare/v0.0.61...v0.0.62) (2020-12-09)


### Bug Fixes

* **development:** fixed jenkins pipeline ([07ebb83](https://bitbucket.org/zextras/zapp-ui/commit/07ebb83b8fd750d9052133fc1006925521fdda0a))

### [0.0.61](https://bitbucket.org/zextras/zapp-ui/compare/v0.0.60...v0.0.61) (2020-12-09)


### Bug Fixes

* **development:** fixed jenkins pipeline ([00b4aad](https://bitbucket.org/zextras/zapp-ui/commit/00b4aad9363037e9ee1d4ab993cd35c7da1e8df1))

### [0.0.60](https://bitbucket.org/zextras/zapp-ui/compare/v0.0.59...v0.0.60) (2020-12-09)


### Bug Fixes

* **development:** fixed jenkins pipeline ([90c05de](https://bitbucket.org/zextras/zapp-ui/commit/90c05dea78b63c21fe7a3e377ac8010e1bea2ec4))

### [0.0.59](https://bitbucket.org/zextras/zapp-ui/compare/v0.0.58...v0.0.59) (2020-12-09)


### Bug Fixes

* **development:** fixed jenkins pipeline ([68b8702](https://bitbucket.org/zextras/zapp-ui/commit/68b870203141df3b99f780a87446a7ba4e0b5e8a))

### [0.0.58](https://bitbucket.org/zextras/zapp-ui/compare/v0.0.57...v0.0.58) (2020-12-09)


### Bug Fixes

* **development:** fixed jenkins pipeline ([77265af](https://bitbucket.org/zextras/zapp-ui/commit/77265af452f0756151d6f18937b2d7f190d840c2))
* **development:** fixed jenkins pipeline ([65063ff](https://bitbucket.org/zextras/zapp-ui/commit/65063ff9b2f857fd94a1066fb507d34cb0f66704))
* **development:** fixed jenkins pipeline ([6d6597f](https://bitbucket.org/zextras/zapp-ui/commit/6d6597f3cd02c442b2441f49d78139de67746a9a))
* **development:** fixed jenkins pipeline ([b38282e](https://bitbucket.org/zextras/zapp-ui/commit/b38282e2c6f6472512a9009427ac2159f54230f9))
* **development:** fixed jenkins pipeline ([eae7318](https://bitbucket.org/zextras/zapp-ui/commit/eae7318c74d9bb39867c62dd64fb1fcc9aa7252c))

### [0.0.57](https://bitbucket.org/zextras/zapp-ui/compare/v0.0.56...v0.0.57) (2020-12-09)


### Bug Fixes

* **development:** fixed `postinstall` npm script ([873be39](https://bitbucket.org/zextras/zapp-ui/commit/873be39c4061c3fb10fdf4a08393e34488a91188))

### [0.0.56](https://bitbucket.org/zextras/zapp-ui/compare/v0.0.55...v0.0.56) (2020-12-09)


### Bug Fixes

* **development:** working to jenkins pipeline ([02f211f](https://bitbucket.org/zextras/zapp-ui/commit/02f211f5279d619ade1e28700139415fd205f40c))
* **development:** working to jenkins pipeline ([3586e03](https://bitbucket.org/zextras/zapp-ui/commit/3586e03f9e47f7279c9e3dd674279d6be7f6c8ac))
* **development:** working to jenkins pipeline ([c975352](https://bitbucket.org/zextras/zapp-ui/commit/c975352e60891ca980d98384e5a6e58cf227fd55))

### 0.0.55 (2020-12-09)

### 0.0.54 (2020-12-09)

### 0.0.53 (2020-12-04)

### 0.0.52 (2020-12-04)
