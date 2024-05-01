import React, { useState } from 'react';

function Today({ gameCode = '', gameData = {}, setPageType = () => {}, saveGameData = () => {} }) {
  const [tab, setTab] = useState('Summary');
  const [formDuration, setFormDuration] = useState(0);
  const [formDescription, setFormDescription] = useState('');

  const styles = {
    title: {
      fontSize: '36px',
    },
    shortContentContainer: {
      height: '413px', // 500 - restContainer (38 + 10) - form (29 + 10)
      marginBottom: '10px',
      overflowY: 'auto',
      scrollbarWidth: 'none',
    },
    contentContainer: {
      height: '461px', // 500 - form (29 + 10)
      overflowY: 'auto',
      marginBottom: '10px',
    },
    day: {
      marginBottom: '10px',
    },
    time: {
      fontSize: '24px',
    },
    subtitle: {
      color: '#F7F5A9',
      cursor: 'pointer',
      marginBottom: '10px',
      marginTop: '10px',
      userSelect: 'none',
    },
    entryContainer: {
      display: 'flex',
    },
    entryTime: {
      marginRight: '20px',
    },
    formContainer: {
      marginBottom: '10px',
    },
    formDurationInput: {
      marginRight: '10px',
      padding: '5px 0px',
      textAlign: 'center',
      width: '50px',
    },
    formDescriptionInput: {
      marginRight: '10px',
      padding: '5px 10px',
    },
    formButton: {
      height: '29px',
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

  // Calculate current time
  let currentTime = 0;
  if (gameData.events) {
    gameData.events.map((event) => {
      currentTime += event.duration;
      return event;
    });
  }
  const hour = 6 + Math.floor(currentTime / 60);
  const minute = currentTime % 60;

  const addEvent = (name, duration) => {
    const newGameData = gameData;
    newGameData.events.push({ name, duration });
    saveGameData(newGameData);
  }

  const addTimer = (name, duration, currentTime) => {
    const newGameData = gameData;
    newGameData.timers.push({ name, duration, startTime: currentTime });
    saveGameData(newGameData);
  }

  const onFormDurationChange = (event) => {
    setFormDuration(event.target.value);
  }

  const onFormDescriptionChange = (event) => {
    setFormDescription(event.target.value);
  }

  const onSubmitClick = () => {
    if (tab === 'Summary') {
      addEvent(formDescription, formDuration);
    } else {
      addTimer(formDescription, formDuration, currentTime);
    }
  }

  return (
    <>
      <div>
        Game Code: { gameCode }
      </div>
      <div style={styles.title}>
        Today
      </div>
      <div style={tab === 'Summary' ? styles.shortContentContainer : styles.contentContainer}>
        <div style={styles.day}>
          Day 1
        </div>

        <div style={styles.time}>
          Current Time: { hour }:{ minute < 10 ? '0' : ''}{ minute }
        </div>
        
        <div style={styles.subtitle} onClick={() => setTab(tab === 'Summary' ? 'Timers' : 'Summary')}>
          Summary &nbsp; ▼
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
        <div style={styles.subtitle} onClick={() => setTab(tab === 'Summary' ? 'Timers' : 'Summary')}>
          Timers &nbsp; { tab === 'Summary' ? '▼' : '▲' }
        </div>
      </div>


      <div style={styles.formContainer}>
        <input
          id="code"
          style={styles.formDurationInput}
          type="number"
          value={formDuration}
          onChange={onFormDurationChange}
        />
        <input
          id="code"
          style={styles.formDescriptionInput}
          type="text"
          placeholder={ tab === 'Summary' ? 'Event Name' : 'Timer Name' }
          value={formDescription}
          onChange={onFormDescriptionChange}
        />
        <button
          style={styles.formButton}
          onClick={onSubmitClick}
        >
          Submit
        </button>
      </div>


      { tab === 'Summary' && (
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
      )}


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
