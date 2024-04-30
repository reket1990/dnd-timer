import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

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

// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}

function App() {
  useEffect(() => {
    const fetchData = async ()=> {
      const data = await getCities(db);
      return data;
    }
    const cities = fetchData();
    console.log(cities);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
