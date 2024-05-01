import React from 'react';

function Calendar({ gameCode = '', setPageType = () => {}, numDays = 1, createNewDay = () => {} }) {
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
        Game Code: { gameCode }
      </div>
      <div style={styles.title}>
        Calendar
      </div>


      <div style={styles.contentContainer}>
        {Array(numDays).fill(null).map((_, index) => (
          <a
            style={styles.dayLink}
            key={`dayLink-${index}`}
            href={`/?code=${gameCode}&day=${index + 1}`}
          >
            Day {index + 1}
          </a>
        ))}


          <button
            style={styles.dayDayButton}
            onClick={createNewDay}
          >
            + Add Day
          </button>
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
