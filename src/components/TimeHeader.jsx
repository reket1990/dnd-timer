import React from 'react';
import PropTypes from 'prop-types';
import { getDate, getHourAndMinutes } from '../utils';

function TimeHeader({ currentTime }) {
  const styles = {
    day: {
      marginBottom: '10px',
    },
    time: {
      fontSize: '24px',
    },
  };

  return (
    <>
      <div style={styles.day}>
        Current Date: &nbsp;
        { getDate(currentTime) }
      </div>

      <div style={styles.time}>
        Current Time: &nbsp;
        { getHourAndMinutes(currentTime) }
      </div>
    </>
  );
}

TimeHeader.propTypes = {
  currentTime: PropTypes.number.isRequired,
};

export default TimeHeader;
