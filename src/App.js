import React, { useState, useEffect } from 'react';

import firebase from './services/firebase';

function App() {
  const [rooms, setRooms] = useState([]);
  // const [room, setRoom] = useState('')
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


  return (
    <div className="App">
      <button onClick={() => createRoom('teste')}>Create</button>
      {
        rooms.map((room) => (
          <p key={room.id}>{room.name}</p>
        ))
      }
    </div>
  );
}

export default App;
