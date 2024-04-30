import React, { useState } from 'react';

function App() {
  const [code, setCode] = useState('');

  const styles = {
    title: {
      fontSize: '36px',
      marginBottom: '20px',
    },
    input: {
      fontSize: '24px',
      marginBottom: '20px',
      padding: '10px 20px',
    },
    button: {
      borderRadius: '5px',
      fontSize: '24px',
      padding: '10px 20px',
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
      <div style={styles.title}>
        Enter Game Code:
      </div>
      <input
        id="code"
        style={styles.input}
        type="text"
        value={code}
        onChange={onInputChange}
      />
      <button
        style={styles.button}
        onClick={onSubmitClick}
      >
        Submit
      </button>
    </>
  );
}

export default App;
