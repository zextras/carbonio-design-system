## New concepts and future developments guidelines
In order to talk the same language between UX/UI and devs, we tried to define a common vocabulary
regarding the key concepts frequently used in every component.

### Component statuses
A component can have different statuses. Some are related to pseudo classes, some are related to the UI.
* Regular
* Hover
* Focus
* Active
* Activated
* Selected
* Disabled

#### Regular
The component is in its default state. User is not interacting with the component.

#### Hover
See the
[HTML specification](https://html.spec.whatwg.org/multipage/semantics-other.html#selector-hover)
for more details.

#### Focus
See the [HTML specification](https://html.spec.whatwg.org/multipage/semantics-other.html#selector-focus)
for more details.

#### Active
Active status follows the HTML specification. It is set by the browser only on HTML elements that support
this status.
See the [HTML specification](https://html.spec.whatwg.org/multipage/semantics-other.html#selector-focus)
for more details.

#### Activated
Activated status is a UX/UI status. It should be set on interactive components when the component
determines or is related to what user is seeing.

This status applies to all components that somehow are connected to what user is seeing.

##### Activated vs Active
Activated might differ from active status in its meaning. For a button these two statuses might trigger the
same effect on the UI, for example when a button trigger the opening of a dropdown, the button could be rendered
in its activated status, which is styled exactly like the active pseudo classes.
On the other hand, an accordion item inside a navigation panel treats the two statuses differently, since
they have different meaning: the active status keeps the HTML specification meaning, so it is triggered
when user clicks on the item, and until the action starts or the user ends the click, while the activated
status is triggered when the data related to that specific item are shown; so in this example we can say
the activated status follows the active one in a sequence of statuses.

#### Selected
Selected is a UX/UI status. It should be set on components that provide a "check/uncheck" concept.
It differs from the activated status since it is not related to what user is seeing.

#### Disabled
Disabled status covers both the [HTML specification](https://html.spec.whatwg.org/multipage/semantics-other.html#selector-disabled)
and the UX/UI need of representing an interactive component as not interactive in a specific situation.
