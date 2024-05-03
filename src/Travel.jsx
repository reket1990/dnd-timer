import React, { useState } from 'react';
import PropTypes from 'prop-types';

const travelData = [
  { name: 'Walk', speed: 3 },
  { name: 'Fast Walk', speed: 4 },
  { name: 'Wagon', speed: 4 },
  { name: 'Horse - walk', speed: 3 },
  { name: 'Horse - run', speed: 10 },
  { name: 'Griffon - fly', speed: 8 },
  { name: 'Dragon - fly', speed: 8 },
  { name: 'Pegasus - fly', speed: 9 },
  { name: 'Rowboat', speed: 3 },
  { name: 'Big Boat', speed: 5 },
];

function Travel({
  gameData, setPageType, saveGameData,
}) {
  const [formStartTime, setFormStartTime] = useState(gameData.currentTime);
  const [formDuration, setFormDuration] = useState(0);
  const [formDistance, setFormDistance] = useState(0);
  const [selectedTravel, setSelectedTravel] = useState(travelData[0]);

  const styles = {
    contentContainer: {
      height: '500px',
      marginBottom: '10px',
      overflowY: 'auto',
      scrollbarWidth: 'none',
    },
    travelOptionContainer: {
      display: 'block',
      textAlign: 'left',
    },
    travelOptionBubble: {
      marginRight: '10px',
    },
    formContainer: {
      marginBottom: '10px',
      marginTop: '20px',
    },
    formInput: {
      marginRight: '5px',
      padding: '5px 0px',
      textAlign: 'center',
      width: '50px',
    },
    formInputStartTime: {
      padding: '5px 0px',
      textAlign: 'center',
      width: '100px',
    },
    formButton: {
      borderRadius: '20px',
      display: 'block',
      padding: '10px 20px',
      margin: '0px auto',
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

  const addEvent = (name, startTime, duration) => {
    const newGameData = gameData;
    newGameData.events.push({
      type: 'event', name, startTime, duration,
    });
    saveGameData(newGameData);
  };

  const handleRadioChange = (event) => {
    const selectedTravelIndex = travelData.findIndex(
      (travel) => travel.name === event.target.value,
    );
    setSelectedTravel(travelData[selectedTravelIndex]);
  };

  const onFormDurationChange = (event) => {
    setFormDuration(event.target.value);
    setFormDistance(Number(event.target.value) / 60 * selectedTravel.speed); // eslint-disable-line no-mixed-operators
  };

  const onFormDistanceChange = (event) => {
    setFormDistance(event.target.value);
    setFormDuration(Number(event.target.value) / selectedTravel.speed * 60); // eslint-disable-line no-mixed-operators
  };

  const onFormStartTimeChange = (event) => {
    setFormStartTime(event.target.value);
  };

  const onSubmitClick = () => {
    const formDescription = `${selectedTravel.name} (${selectedTravel.speed}mph) - ${Number(formDistance).toFixed(1)} miles`;
    addEvent(formDescription, Math.floor(Number(formStartTime)), Math.floor(Number(formDuration)));
    setFormStartTime(gameData.currentTime);
    setFormDuration(0);
    setFormDistance(0);
  };

  return (
    <>
      <div style={styles.contentContainer}>
        <h2>Choose your travel method:</h2>
        {travelData.map((travelOption) => (
          <label style={styles.travelOptionContainer} key={travelOption.name} htmlFor="travelOption">
            <input
              id="travelOption"
              style={styles.travelOptionBubble}
              type="radio"
              value={travelOption.name}
              checked={selectedTravel.name === travelOption.name}
              onChange={handleRadioChange}
            />
            {travelOption.name}
            {' '}
&nbsp; (
            {travelOption.speed}
            mph)
          </label>
        ))}
        <p>
          You selected: &nbsp;
          {selectedTravel.name}
          &nbsp;(speed:&nbsp;
          {selectedTravel.speed}
          mph)
        </p>

        <div style={styles.formContainer}>
          <input
            id="duration"
            style={styles.formInput}
            type="number"
            value={formDuration}
            onChange={onFormDurationChange}
          />
          minutes or &nbsp;
          <input
            id="distance"
            style={styles.formInput}
            type="number"
            value={formDistance}
            onChange={onFormDistanceChange}
          />
          miles
        </div>

        <div style={styles.formContainer}>
          Start time: &nbsp;
          <input
            id="start"
            style={styles.formInputStartTime}
            type="number"
            value={formStartTime}
            onChange={onFormStartTimeChange}
          />
        </div>

        <button
          type="button"
          style={styles.formButton}
          onClick={onSubmitClick}
        >
          Submit
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

Travel.propTypes = {
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

export default Travel;
