import React from 'react';

function Today({ gameCode = '', gameData = {}, setPageType = () => {}, saveGameData = () => {} }) {
  const styles = {
    title: {
      fontSize: '36px',
    },
    contentContainer: {
      minHeight: '500px',
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

  return (
    <>
      <div style={styles.name}>
        Game Code: { gameCode }
      </div>
      <div style={styles.title}>
        Today
      </div>
      <div style={styles.contentContainer}>
        <div style={styles.name}>
          Day 1
        </div>
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
