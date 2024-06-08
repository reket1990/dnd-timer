import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Encounter({
  addEvent, gameData, setPageType, saveGameData, // eslint-disable-line no-unused-vars
}) {
  const [round, setRound] = useState(1);

  const styles = {
    contentContainer: {
      height: '500px',
      marginBottom: '10px',
      overflowY: 'auto',
      scrollbarWidth: 'none',
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
      <div style={styles.contentContainer} />

      {round}

      <div style={styles.restContainer}>
        <button
          type="button"
          style={{
            ...styles.restButton,
            backgroundColor: '#92D7DC',
          }}
          onClick={() => setRound(round + 1)}
        >
          Next Round
        </button>
      </div>

      <div style={styles.restContainer}>
        <button
          type="button"
          style={{
            ...styles.restButton,
            backgroundColor: '#92D7DC',
          }}
          onClick={() => addEvent('event', 'Encounter', gameData.currentTime, Math.ceil((round * 6) / 60) * 60)} // add to Today's events
        >
          Add Event
        </button>
      </div>

      <div style={styles.footer}>
        <button
          type="button"
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

Encounter.propTypes = {
  addEvent: PropTypes.func.isRequired,
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

export default Encounter;
