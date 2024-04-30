import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import './App.css';
import GetCode from './GetCode';

const firebaseConfig = {
  apiKey: "AIzaSyD5lDqvlr9v7Xakdhb6faGznTDzD_bfwFA",
  authDomain: "dnd-timer-96d5b.firebaseapp.com",
  projectId: "dnd-timer-96d5b",
  storageBucket: "dnd-timer-96d5b.appspot.com",
  messagingSenderId: "256275649175",
  appId: "1:256275649175:web:a305c3b4801c4828f1cfd2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [queryParameters] = useSearchParams();
  const [gameData, setGameData] = useState({});
  const code = queryParameters.get('code');

  useEffect(() => {
    if (code) {
      onSnapshot(doc(db, 'games', code), (gameDoc) => {
        // Initialize game object
        if (gameDoc.data() === undefined) {
          const docRef = doc(db, 'games', code);
          setDoc(docRef, {
            name: 'New Game'
          });
        } else {
          setGameData(gameDoc.data());
        }
      });
    }
  }, [code, setGameData]);

  let contents;
  if (code === null) {
    contents = <GetCode />;
  } else {
    contents = null;
  }

  console.log(gameData);

  return (
    <div className="App">
      <header className="App-header">
        { contents }
      </header>
    </div>
  );
}

export default App;
