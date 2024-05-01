import React from 'react';

function Encounter({ gameCode = '', gameData = {}, setPageType = () => {}, saveGameData = () => {} }) {
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
        Encounter
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

export default Encounter;
