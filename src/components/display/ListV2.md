This is a renewed implementation of the [List](#/Components/Data%20display/List).

The items are passed as children of the List component, and the management of the selected, active and
of the other controlled statuses are left to the external Component.

The following example are the reproduction of the ones of the List, build with the new structure.

The props **background**, **activeBackground** and **selectedBackground** are still available on the main list
with their default, but be aware that they are just passed to the children.
In other words, they represent a short way to define the background on the ListItems.

```jsx
import { faker } from '@faker-js/faker';
import React, { useState, useMemo, useCallback } from 'react';
import { Container, Avatar, Drag, Divider, Text, Row, Padding, ListItem } from '@zextras/carbonio-design-system';
import { map, range, omit, some } from 'lodash';

const ListItemContent = React.memo(({
  visible,
  item,
  selected,
  selecting,
  onClick
}) => {
  const clickHandler = useCallback(() => {
    onClick(item.id);
  }, [item.id, onClick]);

  return visible ? (
    <Drag type="item" data={item} style={{ width: "100%" }}>
      <Container
        onClick={clickHandler}
        height="4rem"
        orientation="vertical"
        mainAlignment="flex-start"
      >
        <Container padding={{ all: "small" }} orientation="horizontal" mainAlignment="flex-start">
          <Padding horizontal="small">
            <Avatar
              selecting={selecting}
              selected={selected}
              label={item.name}
              picture={item.image}
            />
          </Padding>
          <Container padding={{ left: "small" }} orientation="vertical" crossAlignment="flex-start">
            <Row height="fit" orientation="horizontal" padding={{ bottom: "small" }}>
              <Padding right="small">
                <Text weight="bold">{item.name}</Text>
              </Padding>
              <Text>{item.email}</Text>
            </Row>
            <Text>{item.text}</Text>
          </Container>
        </Container>
        <Divider />
      </Container>
    </Drag>
  ) : (
    <div style={{ height: "4rem" }} />
  );
});


const ListV2Example = () => {
    const [selected, setSelected] = useState({});
 
    const toggleSelect = useCallback((id) => {
      setSelected((selectedMap) =>
        selectedMap[id] ? omit(selectedMap, id) : ({ ...selectedMap, [id]: true })
      );
    }, []);
    
   const selecting = some(selected, (isSelected) => isSelected);
 
   const data = useMemo(
     () =>
       map(range(0, 500), (i) => ({
         id: `${i}`,
         name: faker.name.fullName(),
         email: faker.internet.email(),
         text: faker.lorem.sentence(),
         image: faker.image.avatar()
       })),
     []
   );
 
   const items = useMemo(
     () =>
       map(data, (item) => (
         <ListItem key={item.id} selected={selected[item.id]} active={item.id === '2'}>
           {(visible) => (
             <ListItemContent
               visible={visible}
               item={item}
               selected={selected[item.id]}
               selecting={selecting}
               onClick={toggleSelect}
             />
           )}
         </ListItem>
       )),
     [data, selected, selecting, toggleSelect]
   );
   
  return (
    <Container height={"750px"}>
      <ListV2>{items}</ListV2>
    </Container>
  ); 
};

<ListV2Example />
```


### List with background properties

```jsx
import { faker } from '@faker-js/faker';
import React, { useState, useMemo, useCallback } from 'react';
import { Container, Avatar, Drag, Divider, Text, Row, Padding, ListItem } from '@zextras/carbonio-design-system';
import { map, range, omit, some } from 'lodash';

const ListItemContent = React.memo(({
  visible,
  item,
  selected,
  selecting,
  onClick
}) => {
  const clickHandler = useCallback(() => {
    onClick(item.id);
  }, [item.id, onClick]);

  return visible ? (
    <Drag type="item" data={item} style={{ width: "100%" }}>
      <Container
        onClick={clickHandler}
        height="4rem"
        orientation="vertical"
        mainAlignment="flex-start"
      >
        <Container padding={{ all: "small" }} orientation="horizontal" mainAlignment="flex-start">
          <Padding horizontal="small">
            <Avatar
              selecting={selecting}
              selected={selected}
              label={item.name}
              picture={item.image}
            />
          </Padding>
          <Container padding={{ left: "small" }} orientation="vertical" crossAlignment="flex-start">
            <Row height="fit" orientation="horizontal" padding={{ bottom: "small" }}>
              <Padding right="small">
                <Text weight="bold">{item.name}</Text>
              </Padding>
              <Text>{item.email}</Text>
            </Row>
            <Text>{item.text}</Text>
          </Container>
        </Container>
        <Divider />
      </Container>
    </Drag>
  ) : (
    <div style={{ height: "4rem" }} />
  );
});


const ListV2Example = () => {
    const [selected, setSelected] = useState({});
 
    const toggleSelect = useCallback((id) => {
      setSelected((selectedMap) =>
        selectedMap[id] ? omit(selectedMap, id) : ({ ...selectedMap, [id]: true })
      );
    }, []);
    
   const selecting = some(selected, (isSelected) => isSelected);
 
   const data = useMemo(
     () =>
       map(range(0, 500), (i) => ({
         id: `${i}`,
         name: faker.name.fullName(),
         email: faker.internet.email(),
         text: faker.lorem.sentence(),
         image: faker.image.avatar()
       })),
     []
   );
 
   const items = useMemo(
     () =>
       map(data, (item) => (
         <ListItem key={item.id} selected={selected[item.id]} active={item.id === '2'}>
           {(visible) => (
             <ListItemContent
               visible={visible}
               item={item}
               selected={selected[item.id]}
               selecting={selecting}
               onClick={toggleSelect}
             />
           )}
         </ListItem>
       )),
     [data, selected, selecting, toggleSelect]
   );
   
  return (
    <Container height={"250px"}>
      <ListV2 selectedBackground="success" activeBackground="warning">
        {items}
      </ListV2>
    </Container>
  ); 
};

<ListV2Example />
```
