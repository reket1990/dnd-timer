import React, { useState } from 'react';

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

function Travel({ gameCode = '', day = 1, gameData = {}, setPageType = () => {}, saveGameData = () => {} }) {
  const [formDuration, setFormDuration] = useState(0);
  const [formDistance, setFormDistance] = useState(0);
  const [selectedTravel, setSelectedTravel] = useState(travelData[0]);

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
    day: {
      marginBottom: '10px',
    },
    time: {
      fontSize: '24px',
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

  // Calculate current time
  let currentTime = 360; // Days start at 6am
  if (gameData.events) {
    gameData.events.map((event) => {
      currentTime += event.duration;
      return event;
    });
  }
  const hour = Math.floor(currentTime / 60);
  const minute = currentTime % 60;

  const addEvent = (name, duration) => {
    const newGameData = gameData;
    newGameData.events.push({ name, duration });
    saveGameData(newGameData);
  }

  const handleRadioChange = (event) => {
    const selectedTravelIndex = travelData.findIndex(
      (travel) => travel.name === event.target.value
    );
    setSelectedTravel(travelData[selectedTravelIndex]);
  };

  const onFormDurationChange = (event) => {
    setFormDuration(event.target.value);
    setFormDistance(Number(event.target.value) / 60 * selectedTravel.speed);
  }

  const onFormDistanceChange = (event) => {
    setFormDistance(event.target.value);
    setFormDuration(Number(event.target.value) / selectedTravel.speed * 60);
  }

  const onSubmitClick = () => {
    const formDescription = `${selectedTravel.name} (${selectedTravel.speed}mph) - ${Number(formDistance).toFixed(1)} miles`
    addEvent(formDescription, Math.floor(Number(formDuration)));
    setFormDuration(0);
    setFormDistance(0);
  }

  return (
    <>
      <div>
        Game Code: { gameCode }
      </div>
      <div style={styles.title}>
        Travel Calculator
      </div>

      <div style={styles.contentContainer}>
        <div style={styles.day}>
          Day { day }
        </div>

        <div style={styles.time}>
          Current Time: { hour }:{ minute < 10 ? '0' : ''}{ minute }
        </div>

        <h2>Choose your travel method:</h2>
        {travelData.map((travelOption) => (
          <label style={styles.travelOptionContainer} key={travelOption.name}>
            <input
              style={styles.travelOptionBubble}
              type="radio"
              value={travelOption.name}
              checked={selectedTravel.name === travelOption.name}
              onChange={handleRadioChange}
            />
            {travelOption.name} &nbsp; ({travelOption.speed}mph)
          </label>
        ))}
        <p>You selected: {selectedTravel.name} (speed: {selectedTravel.speed}mph)</p>


        <div style={styles.formContainer}>
          <input
            id="code"
            style={styles.formInput}
            type="number"
            value={formDuration}
            onChange={onFormDurationChange}
          />
          minutes or &nbsp;
          <input
            id="code"
            style={styles.formInput}
            type="number"
            value={formDistance}
            onChange={onFormDistanceChange}
          />
          miles
        </div>
        <button
            style={styles.formButton}
            onClick={onSubmitClick}
          >
            Submit
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

export default Travel;
