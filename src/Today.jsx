import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Today({
  gameCode, gameData, setPageType, saveGameData,
}) {
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
      scrollbarWidth: 'none',
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
    noEntry: {
      textAlign: 'center',
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

  const getHourAndMinutes = (unixTimestamp) => {
    // Create a new Date object from the Unix timestamp (in milliseconds)
    const date = new Date(unixTimestamp * 1000);

    // Get the hours and minutes (using zero-padding for single digits)
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Return a formatted string
    return `${hours}:${minutes}`;
  };

  const addEvent = (type, name, currentTime, duration) => {
    const newGameData = gameData;
    newGameData.timers.push({
      type, name, duration, startTime: currentTime,
    });
    saveGameData(newGameData);
  };

  const onFormDurationChange = (event) => {
    setFormDuration(event.target.value);
  };

  const onFormDescriptionChange = (event) => {
    setFormDescription(event.target.value);
  };

  const onSubmitClick = () => {
    if (tab === 'Summary') {
      addEvent('event', formDescription, Number(formDuration), gameData.currentTime); // TODO: field for current time
    } else {
      addEvent('timer', formDescription, Number(formDuration), gameData.currentTime); // TODO: field for current time
    }
    setFormDuration(0);
    setFormDescription('');
  };

  let timeElapsed = 360; // Days start at 6am

  return (
    <>
      <div>
        Game Code:
        {' '}
        { gameCode }
      </div>
      <div style={styles.title}>
        Today
      </div>
      <div style={tab === 'Summary' ? styles.shortContentContainer : styles.contentContainer}>
        <div style={styles.day}>
          Day (TODO)
          {' '}
          { gameData.currentTime }
        </div>

        <div style={styles.time}>
          Current Time:
          {getHourAndMinutes(gameData.currentTime)}
        </div>

        <div style={styles.subtitle} onClick={() => setTab(tab === 'Summary' ? 'Timers' : 'Summary')}>
          Summary &nbsp; ▼
        </div>

        { tab === 'Summary' && (!gameData.events || gameData.events.length === 0) && (
          <div style={styles.noEntry}>
            No events yet! Add below!
          </div>
        )}

        { gameData.events && tab === 'Summary'
          && gameData.events.map((event, index) => {
            const hour = Math.floor(event.duration / 60);
            const minute = event.duration % 60;
            const startHour = Math.floor(timeElapsed / 60);
            const startMinute = timeElapsed % 60;
            timeElapsed += event.duration;
            return (
              <div style={styles.entryContainer} key={`event-${index}`}>
                <div style={styles.entryTime}>
                  { startHour }
                  :
                  { startMinute < 10 ? '0' : ''}
                  { startMinute }
                  &nbsp;→&nbsp;
                  { hour }
                  :
                  { minute < 10 ? '0' : ''}
                  { minute }
                </div>
                <div>
                  { event.name }
                </div>
              </div>
            );
          })}

        <div style={styles.subtitle} onClick={() => setTab(tab === 'Summary' ? 'Timers' : 'Summary')}>
          Timers &nbsp;
          {' '}
          { tab === 'Summary' ? '▼' : '▲' }
        </div>

        { gameData.events && tab === 'Timers' && gameData.events.length === 0 && (
          <div style={styles.noEntry}>
            No timers yet! Add below!
          </div>
        )}
        { gameData.events && tab === 'Timers'
          && gameData.events.map((event, index) => {
            const hour = Math.floor(event.duration / 60);
            const minute = event.duration % 60;
            const startHour = Math.floor(event.startTime / 60);
            const startMinute = event.startTime % 60;
            const remainingTime = event.startTime - gameData.currentTime + event.duration;
            const remainingHour = Math.floor(remainingTime / 60);
            const remainingMinute = remainingTime % 60;
            let remainingText = 'expired';
            if ((remainingTime) > 0) {
              remainingText = `${remainingHour}:${remainingMinute < 10 ? '0' : ''}${remainingMinute} left`;
            }
            return (
              <div style={styles.entryContainer} key={`timer-${index}`}>
                <div style={styles.entryTime}>
                  { startHour }
                  :
                  { startMinute < 10 ? '0' : ''}
                  { startMinute }
                  &nbsp;→&nbsp;
                  { hour }
                  :
                  { minute < 10 ? '0' : ''}
                  { minute }
                </div>
                <div>
                  { event.name }
                  {' '}
                  (
                  {remainingText}
                  )
                </div>
              </div>
            );
          })}
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
          placeholder={tab === 'Summary' ? 'New Event Name' : 'New Timer Name'}
          value={formDescription}
          onChange={onFormDescriptionChange}
        />
        <button
          type="button"
          style={styles.formButton}
          onClick={onSubmitClick}
        >
          Submit
        </button>
      </div>

      { tab === 'Summary' && (
        <div style={styles.restContainer}>
          <button
            type="button"
            style={{
              ...styles.restButton,
              backgroundColor: '#92D7DC',
            }}
            onClick={() => addEvent('Short Rest', 60)}
          >
            Short Rest
          </button>
          <button
            type="button"
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
          type="button"
          style={{
            ...styles.footerButton,
            backgroundColor: '#837666',
          }}
          onClick={() => setPageType('Calendar')}
        >
          Calendar
        </button>
        <button
          type="button"
          style={{
            ...styles.footerButton,
            backgroundColor: '#D2A1A4',
          }}
          onClick={() => setPageType('Encounter')}
        >
          Start Encounter
        </button>
        <button
          type="button"
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

Today.propTypes = {
  gameCode: PropTypes.string.isRequired,
  gameData: PropTypes.shape({
    currentTime: PropTypes.number.isRequired,
    events: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      duration: PropTypes.number,
      startTime: PropTypes.number,
      type: PropTypes.string,
    })).isRequired,
  }).isRequired,
  setPageType: PropTypes.func.isRequired,
  saveGameData: PropTypes.func.isRequired,
};

export default Today;
