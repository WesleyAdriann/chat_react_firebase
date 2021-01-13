import React from 'react';

import {  ListItem, ListItemText } from '@material-ui/core';


import {
  Container,
  RoomsWrapper,
  CreateRoomButton,
} from './style';

const RoomsList = ({rooms}) => (
  <Container>
    <RoomsWrapper>
      {
        rooms.map((room) => (
        <ListItem button key={room.id}>
          <ListItemText primary={room.name} />
        </ListItem>
        ))
      }
    </RoomsWrapper>

    <CreateRoomButton variant="contained" color="primary">Criar Sala</CreateRoomButton>
  </Container>
);

export default RoomsList;