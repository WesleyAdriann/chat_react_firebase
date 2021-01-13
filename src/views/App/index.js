import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';

import firebase from '../../services/firebase';

import RoomsList from '../../components/RoomsList';

import {
  Container
} from './style';

function App() {
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState({});
  // const [messages, setMessages] = useState([]);

  useEffect(() => {
    let roomsRef = null;

    firebase.db.once('value')
      .then((snap) => {
        if(!snap.child('rooms').exists()) createRoom('main');
        const roomsChild = snap.child('rooms');
 
        roomsChild.ref.once('value')
          .then((snapshot) => {

            let remoteRooms = [];
            if(snapshot.val()) 
              remoteRooms = Object.entries(snapshot.val()).map(([id, name]) => ({id, name}));
            
            setRooms(remoteRooms);
          })
        
        roomsRef = roomsChild.ref;
        
        // roomsRef.on('value', (snapshot) => {
        //   console.log(snapshot.val())
        // })

        roomsRef.on('child_added', (snapshot) => {
          setRooms((prevRooms) => [...prevRooms, {id: snapshot.key, name: snapshot.val()}]);
        })

        roomsRef.on('child_removed', (snapshot) => {
          console.log(snapshot.val());
        })

        roomsRef.on('child_changed', (snapshot) => {
          console.log(snapshot.val());
        })
      })

    return roomsRef?.off
  }, [])

  const createRoom = (roomName) => {
    const roomRef = firebase.db.child('rooms').push(roomName);
    firebase.db.child('roomsMessages').child(roomRef.key).push({user: 'admin', message: 'initial'});
  }

  const selectRoom = (selectedRoom) => setRoom(selectedRoom);

  return (
    <Container>
      <AppBar position="sticky">
        <Toolbar variant="dense" />
      </AppBar>
      <RoomsList rooms={rooms} />
    </Container>
  );
}

export default App;
