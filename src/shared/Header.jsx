import React from 'react';
import PropTypes from 'prop-types';
import { getDateFromUnix, getHourAndMinutesFromUnix } from './utils';

function Header({ currentTime, gameCode, title }) {
  const styles = {
    title: {
      fontSize: '36px',
    },
    day: {
      marginBottom: '10px',
    },
    time: {
      fontSize: '24px',
    },
  };

  return (
    <>
      <div>
        Game Code: &nbsp;
        { gameCode }
      </div>
      <div style={styles.title}>
        { title }
      </div>

      <div style={styles.day}>
        Current Date: &nbsp;
        { getDateFromUnix(currentTime) }
      </div>

      <div style={styles.time}>
        Current Time: &nbsp;
        { getHourAndMinutesFromUnix(currentTime) }
      </div>
    </>
  );
}

Header.propTypes = {
  currentTime: PropTypes.number.isRequired,
  gameCode: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
