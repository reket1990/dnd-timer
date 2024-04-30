import React, { useState } from 'react';

function Today({ gameCode = '', gameData = {}, setPageType = () => {}, saveGameData = () => {} }) {
  const [code, setCode] = useState('');

  const styles = {
    title: {
      fontSize: '36px',
    },
    contentContainer: {
      minHeight: '300px',
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
      padding: '10px',
      width: '110px',
    },
  };

  const onSubmitClick = (event) => {
    window.location.href = `/?code=${code}`;
  };

  const onInputChange = (event) => {
    setCode(event.target.value);
  }

  return (
    <>
      <div style={styles.name}>
        Game Code: { gameCode }
      </div>
      <div style={styles.title}>
        Today
      </div>
      <div style={styles.name}>
        Day 1
      </div>
      <div style={styles.contentContainer}>
        Summary
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
