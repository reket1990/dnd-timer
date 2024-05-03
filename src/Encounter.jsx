import React from 'react';
import PropTypes from 'prop-types';

function Encounter({
  gameData, setPageType, saveGameData, // eslint-disable-line no-unused-vars
}) {
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
