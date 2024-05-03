import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getHourAndMinutes } from './shared/utils';

function Today({
  gameData, setPageType, saveGameData,
}) {
  const [tab, setTab] = useState('Summary');
  const [formDuration, setFormDuration] = useState(0);
  const [formDescription, setFormDescription] = useState('');

  const styles = {
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

  return (
    <>
      <div style={tab === 'Summary' ? styles.shortContentContainer : styles.contentContainer}>
        <div style={styles.subtitle} onClick={() => setTab(tab === 'Summary' ? 'Timers' : 'Summary')}>
          Summary &nbsp; ▼
        </div>

        { tab === 'Summary' && gameData.events.length === 0 && (
          <div style={styles.noEntry}>
            No events yet! Add below!
          </div>
        )}

        { tab === 'Summary'
          && gameData.events.filter((event) => event.type === 'event').map((event, index) => (
            <div style={styles.entryContainer} key={`event-${index}`}>
              <div style={styles.entryTime}>
                { getHourAndMinutes(event.startTime) }
                &nbsp;→&nbsp;
                { getHourAndMinutes(event.duration) }
              </div>
              <div>
                { event.name }
                &nbsp;
                {
                  event.startTime - gameData.currentTime + event.duration > 0
                    ? `(${getHourAndMinutes(event.startTime - gameData.currentTime + event.duration > 0)} left)`
                    : ''
                }
              </div>
            </div>
          ))}

        <div style={styles.subtitle} onClick={() => setTab(tab === 'Summary' ? 'Timers' : 'Summary')}>
          Timers &nbsp;
          {' '}
          { tab === 'Summary' ? '▼' : '▲' }
        </div>

        { tab === 'Timers' && gameData.events.length === 0 && (
          <div style={styles.noEntry}>
            No timers yet! Add below!
          </div>
        )}
        { tab === 'Timers'
          && gameData.events.filter((event) => event.type === 'event').map((event, index) => (
            <div style={styles.entryContainer} key={`timer-${index}`}>
              <div style={styles.entryTime}>
                { getHourAndMinutes(event.startTime) }
                &nbsp;→&nbsp;
                { getHourAndMinutes(event.duration) }
              </div>
              <div>
                { event.name }
                &nbsp;
                {
                  event.startTime - gameData.currentTime + event.duration > 0
                    ? `(${getHourAndMinutes(event.startTime - gameData.currentTime + event.duration > 0)} left)`
                    : '(expired)'
                }
              </div>
            </div>
          ))}
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
