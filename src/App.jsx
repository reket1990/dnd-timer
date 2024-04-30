import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import logo from './logo.svg';
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

// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}

function App() {
  const [queryParameters] = useSearchParams();
  const code = queryParameters.get('code');

  useEffect(() => {
    const fetchData = async ()=> {
      const data = await getCities(db);
      return data;
    }
    fetchData().then((res) => console.log(res));
  }, []);

  let contents;
  if (code === null) {
    contents = <GetCode />;
  } else {
    contents = null;
  }

  return (
    <div className="App">
      <header className="App-header">
        { contents }
      </header>
    </div>
  );
}

export default App;
