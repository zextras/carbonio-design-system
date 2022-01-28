## Button
Button is now the main component for Button. Every other type of button reference (and has to use) this component to be created.
### Props
#### Changed
* **size**: size was previously one of _fit_ or _fill_. These are moved in the **width** prop.
  Size now set the size variant of the Button and accept the variant key between _extrasmall_, _small_, _medium_, _large_
* **type**: _default_ is now _filled_

#### Removed
* **iconPlacement**: replaced with _iconPosition_
* **isSmall**: removed, can be replicated with _size="small"_

#### Added
* **width**: the old size prop
