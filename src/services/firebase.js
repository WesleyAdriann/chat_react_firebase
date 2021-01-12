import firebaseLib from 'firebase/app';
import 'firebase/database';

import { firebaseConfig } from '../config/firebase';

const firebase = {
    db: null
}

const app = firebaseLib.initializeApp(firebaseConfig);
firebase.db = app.database().ref('chat');

export default firebase;