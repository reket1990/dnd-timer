/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import {
  getFirestore, doc, setDoc, onSnapshot,
} from 'firebase/firestore';
import './App.css';
import fog from './assets/fog.mp4';
import Header from './shared/Header';
import GetCode from './GetCode';
import Today from './Today';
import Calendar from './Calendar';
import Encounter from './Encounter';
import Travel from './Travel';

const firebaseConfig = {
  apiKey: 'AIzaSyD5lDqvlr9v7Xakdhb6faGznTDzD_bfwFA',
  authDomain: 'dnd-timer-96d5b.firebaseapp.com',
  projectId: 'dnd-timer-96d5b',
  storageBucket: 'dnd-timer-96d5b.appspot.com',
  messagingSenderId: '256275649175',
  appId: '1:256275649175:web:a305c3b4801c4828f1cfd2',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const styles = {
    video: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  };

  const [queryParameters] = useSearchParams();
  const [gameData, setGameData] = useState({ currentTime: 0, events: [] });
  const [pageType, setPageType] = useState('Today');
  const code = queryParameters.get('code');

  // Function that saves the game data
  const saveGameData = React.useCallback((newGameData) => {
    const docRef = doc(db, 'games', code);
    return setDoc(docRef, newGameData);
  }, [code]);

  const setCurrentTime = React.useCallback((newTime) => {
    const newGameData = { ...gameData };
    newGameData.time = newTime;
    saveGameData(newGameData);
  }, [gameData, saveGameData]);

  const addEvent = (type, name, startTime, duration, callback = () => {}) => {
    const newGameData = gameData;
    newGameData.events.push({
      type, name, startTime, duration,
    });

    // Check if we should change current time
    if (type === 'event' && startTime + duration >= gameData.currentTime) {
      newGameData.currentTime = startTime + duration;
    }

    saveGameData(newGameData).then(() => {
      callback();
    });
  };

  // Load the game data from the db
  useEffect(() => {
    if (code) {
      onSnapshot(doc(db, 'games', code), (gameDoc) => {
        // Initialize game object
        if (gameDoc.data() === undefined) {
          saveGameData({
            currentTime: 0,
            events: [],
          });
        } else {
          setGameData(gameDoc.data());
        }
      });
    }
  }, [code, setGameData, saveGameData]);

  let contents;
  let title;
  if (code === null) {
    // Load Get Code form if no code
    return (
      <div className="App">
        <video src={fog} style={styles.video} autoPlay loop muted />
        <GetCode />
      </div>
    );
  }

  if (pageType === 'Today') {
    title = 'Today';
    contents = (
      <Today
        addEvent={addEvent}
        gameData={gameData}
        setPageType={setPageType}
        saveGameData={saveGameData}
      />
    );
  } else if (pageType === 'Calendar') {
    title = 'Calendar';
    contents = (
      <Calendar
        gameData={gameData}
        setPageType={setPageType}
        setCurrentTime={setCurrentTime}
      />
    );
  } else if (pageType === 'Encounter') {
    title = 'Encounter';
    contents = (
      <Encounter
        gameData={gameData}
        setPageType={setPageType}
        saveGameData={saveGameData}
      />
    );
  } else if (pageType === 'Travel') {
    title = 'Travel';
    contents = (
      <Travel
        addEvent={addEvent}
        gameData={gameData}
        setPageType={setPageType}
      />
    );
  }

  return (
    <div className="App">
      <Header gameCode={code} currentTime={gameData.currentTime} title={title} />
      { contents }
    </div>
  );
}

export default App;
