import React from 'react';

function Calendar({ gameCode = '', gameData = {}, setPageType = () => {}, saveGameData = () => {} }) {
  const styles = {
    title: {
      fontSize: '36px',
    },
    contentContainer: {
      minHeight: '500px',
    },
    footer: {
      alignItems: 'center',
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'center',
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
        Calendar
      </div>
      <div style={styles.contentContainer}>

      </div>
      <div style={styles.footer}>
        <button
          style={{
            ...styles.footerButton,
            backgroundColor: '#C4BAAE',
          }}
          onClick={() => setPageType('Today')}
        >
          Back to Today
        </button>
      </div>
    </>
  );
}

export default Calendar;
