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
  const [fullGameData, setFullGameData] = useState({ days: [{}] });
  const [pageType, setPageType] = useState('Today');
  const code = queryParameters.get('code');
  let day = Number(queryParameters.get('day'));

  // Function that saves the full game data (all days)
  const saveFullGameData = React.useCallback((newFullGameData) => {
    const docRef = doc(db, 'games', code);
    return setDoc(docRef, newFullGameData);
  }, [code]);

  // Load the game data from the db
  useEffect(() => {
    if (code) {
      onSnapshot(doc(db, 'games', code), (gameDoc) => {
        // Initialize game object
        if (gameDoc.data() === undefined) {
          saveFullGameData({
            days: [{
              events: [],
              timers: [],
            }]
          }).then(() => {
            // New game, go to the first day
            if (day !== '1') {
              window.location.href = `/?code=${code}&day=1`;
            }
          });
        } else {
          // If no day is set, go to the most recent day
          if (!day || day > gameDoc.data().days.length) {
            window.location.href = `/?code=${code}&day=${gameDoc.data().days.length}`;
          }

          setFullGameData(gameDoc.data());
        }
      });
    }
  }, [code, day, setFullGameData, saveFullGameData]);

  const gameData = fullGameData.days[day - 1];

  const saveGameData = React.useCallback((newGameData) => {
    const newFullGameData = {...fullGameData};
    newFullGameData.days[day - 1] = newGameData;
    saveFullGameData(newFullGameData);
  }, [day, fullGameData, saveFullGameData]);

  const createNewDay = React.useCallback(() => {
    const newFullGameData = {...fullGameData};
    newFullGameData.days.push({
      events: [],
      timers: [],
    });
    saveFullGameData(newFullGameData);
  }, [fullGameData, saveFullGameData]);

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
        setPageType={ setPageType }
        numDays={ fullGameData.days.length }
        createNewDay={ createNewDay }
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
