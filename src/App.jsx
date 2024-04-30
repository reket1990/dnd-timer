import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, onSnapshot } from 'firebase/firestore';
import './App.css';
import GetCode from './GetCode';
import Today from './Today';
import Calendar from './Calendar';
import Encounter from './Encounter';
import Travel from './Travel';

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
  const [pageType, setPageType] = useState('Today');
  const code = queryParameters.get('code');

  const saveGameData = React.useCallback((gameData) => {
    const docRef = doc(db, 'games', code);
    setDoc(docRef, gameData);
  }, [code]);

  useEffect(() => {
    if (code) {
      onSnapshot(doc(db, 'games', code), (gameDoc) => {
        // Initialize game object
        if (gameDoc.data() === undefined) {
          saveGameData({
            events: [],
            timers: [],
          });
        } else {
          setGameData(gameDoc.data());
        }
      });
    }
  }, [code, setGameData, saveGameData]);

  let contents;
  if (code === null) {
    // Load Get Code form if no code
    contents = <GetCode />;
  } else if (pageType === 'Today') {
    contents = (
      <Today
        gameCode={ code }
        gameData={ gameData }
        setPageType={ setPageType }
        saveGameData={ saveGameData }
      />
    );
  } else if (pageType === 'Calendar') {
    contents = (
      <Calendar
        gameCode={ code }
        gameData={ gameData }
        setPageType={ setPageType }
        saveGameData={ saveGameData }
      />
    );
  } else if (pageType === 'Encounter') {
    contents = (
      <Encounter
        gameCode={ code }
        gameData={ gameData }
        setPageType={ setPageType }
        saveGameData={ saveGameData }
      />
    );
  } else if (pageType === 'Travel') {
    contents = (
      <Travel
        gameCode={ code }
        gameData={ gameData }
        setPageType={ setPageType }
        saveGameData={ saveGameData }
      />
    );
  }

  return (
    <div className="App">
      { contents }
    </div>
  );
}

export default App;
