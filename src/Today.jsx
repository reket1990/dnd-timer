import React, { useState } from 'react';

function Today({ gameCode = '', gameData = {}, setPageType = () => {}, saveGameData = () => {} }) {
  const [tab, setTab] = useState('Summary');

  const styles = {
    title: {
      fontSize: '36px',
    },
    contentContainer: {
      minHeight: '452px', // 500 - restContainer (38 + 10)
    },
    day: {
      marginBottom: '10px',
    },
    time: {
      fontSize: '24px',
    },
    subtitle: {
      cursor: 'pointer',
      marginBottom: '10px',
      marginTop: '10px',
    },
    entryContainer: {
      display: 'flex',
    },
    entryTime: {
      marginRight: '20px',
    },
    restContainer: {
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'space-evenly',
      marginBottom: '10px',
      maxWidth: '360px',
      width: '100%',
    },
    restButton: {
      borderRadius: '19px',
      fontSize: '12px',
      padding: '10px',
      width: '110px',
    },
    footer: {
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'space-between',
      maxWidth: '360px',
      width: '100%',
    },
    footerButton: {
      borderRadius: '5px',
      fontSize: '12px',
      minHeight: '52px',
      padding: '10px',
      width: '110px',
    },
  };

  const addEvent = (name, duration) => {
    const newGameData = gameData;
    newGameData.events.push({ name, duration });
    saveGameData(newGameData);
  }

  // Calculate current time
  let totalTime = 0;
  if (gameData.events) {
    gameData.events.map((event) => {
      totalTime += event.duration;
      return event;
    });
  }
  const hour = 6 + Math.floor(totalTime / 60);
  const minute = totalTime % 60;

  return (
    <>
      <div>
        Game Code: { gameCode }
      </div>
      <div style={styles.title}>
        Today
      </div>
      <div style={styles.contentContainer}>
        <div style={styles.day}>
          Day 1
        </div>

        <div style={styles.time}>
          Current Time: { hour }:{ minute < 10 ? '0' : ''}{ minute }
        </div>
        
        <div style={styles.subtitle} onClick={() => setTab('Summary')}>
          Summary &nbsp;&nbsp; ▼
        </div>

        { gameData.events && tab === 'Summary' &&
          gameData.events.map((event) => {
            const hour = Math.floor(event.duration / 60);
            const minute = event.duration % 60;
            return (
              <div style={styles.entryContainer}>
                <div style={styles.entryTime}>
                  { hour }:{ minute < 10 ? '0' : ''}{ minute }
                </div>
                <div>
                  { event.name }
                </div>
              </div>
            );
          })
        }
        <div style={styles.subtitle} onClick={() => setTab('Timers')}>
          Timers &nbsp;&nbsp; { tab === 'Summary' ? '▼' : '▲' }
        </div>
      </div>


      <div style={styles.restContainer}>
        <button
          style={{
            ...styles.restButton,
            backgroundColor: '#92D7DC',
          }}
          onClick={() => addEvent('Short Rest', 60)}
        >
          Short Rest
        </button>
        <button
          style={{
            ...styles.restButton,
            backgroundColor: '#6AA3A5',
          }}
          onClick={() => addEvent('Long Rest', 480)}
        >
          Long Rest
        </button>
      </div>


      <div style={styles.footer}>
        <button
          style={{
            ...styles.footerButton,
            backgroundColor: '#837666',
          }}
          onClick={() => setPageType('Calendar')}
        >
          Calendar
        </button>
        <button
          style={{
            ...styles.footerButton,
            backgroundColor: '#D2A1A4',
          }}
          onClick={() => setPageType('Encounter')}
        >
          Start Encounter
        </button>
        <button
          style={{
            ...styles.footerButton,
            backgroundColor: '#AEC6AE',
          }}
          onClick={() => setPageType('Travel')}
        >
          Travel Calculator
        </button>
      </div>
    </>
  );
}

export default Today;
