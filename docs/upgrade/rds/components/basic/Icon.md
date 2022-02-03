### Props
#### Changed
* **size**: added two new variants, _extrasmall_ and _extralarge_. Previous _large_ dimensions correspond to the new _extralarge_,
so in order to keep previous dimension, all _size="large"_ usage must be changed in _size="extralarge"_

#### Removed
* **customColor**: use _color_ instead
* **onClick**: icon as it is, is not an interactive element. Use an IconButton instead.
* **disabled**: since disabled is only used to set a color, its setting is left to the consumer

#### Added
None

### Implementation notes
Main difference is that style rules are now set through a styled component instead of setting in inline style.
This allows easier customization with css and overrides with styled components.
