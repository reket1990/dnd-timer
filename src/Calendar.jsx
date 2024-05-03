import React from 'react';
import PropTypes from 'prop-types';

function Calendar({
  gameCode, gameData, setPageType, setCurrentTime, // eslint-disable-line no-unused-vars
}) {
  const styles = {
    title: {
      fontSize: '36px',
    },
    contentContainer: {
      height: '500px',
      marginBottom: '10px',
      overflowY: 'auto',
      scrollbarWidth: 'none',
    },
    dayLink: {
      border: '1px solid white',
      color: 'lightblue',
      display: 'inline-block',
      margin: '10px',
      padding: '20px',
    },
    dayDayButton: {
      backgroundColor: 'lightblue',
      borderRadius: '3px',
      display: 'block',
      margin: '20px auto',
      padding: '20px',
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
      <div>
        Game Code:
        {' '}
        { gameCode }
      </div>
      <div style={styles.title}>
        Calendar
      </div>

      <div style={styles.contentContainer}>
        {/* TODO
         {Array(numDays).fill(null).map((_, index) => (
          <a
            style={styles.dayLink}
            key={`dayLink-${index}`}
            href={`/?code=${gameCode}&day=${index + 1}`}
          >
            Day
            {' '}
            {index + 1}
          </a>
        ))} */}
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

Calendar.propTypes = {
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
  setCurrentTime: PropTypes.func.isRequired,
};

export default Calendar;
