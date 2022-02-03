Button is now the main component for every type of button. Every other type of button makes reference (and has to reference) 
this component to be created.
### Props
#### Changed
* **size**: size was previously one of _fit_ or _fill_. These are moved in the **width** prop.
  Size now set the size variant of the Button and accept the variant key between _extrasmall_, _small_, _medium_, _large_
* **type**: _default_ type is now named _filled_

#### Removed
* **iconPlacement**: replaced with _iconPosition_
* **isSmall**: removed, can be replicated with _size="small"_
* **forceActive**: replaced with _activated_ in order to follow DS specification

#### Added
* **width**: previously _size_
* **activated**: previously _forceActive_
