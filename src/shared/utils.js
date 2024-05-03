const getDateFromUnix = (unixTimestamp) => {
  // Create a new Date object from the Unix timestamp (in milliseconds)
  const date = new Date(unixTimestamp * 1000);

  // Get year, month, and day components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Zero-pad month
  const day = String(date.getDate()).padStart(2, '0'); // Zero-pad day

  // Return formatted date string (YYYY-MM-DD)
  return `${month}-${day}-${year}`;
};

const getHourAndMinutes = (seconds) => {
  // Ensure seconds is a positive number
  seconds = Math.max(0, seconds); // eslint-disable-line no-param-reassign

  // Calculate hours using integer division
  const hours = Math.floor(seconds / 3600);

  // Calculate remaining minutes
  const remainingMinutes = seconds % 3600;
  const minutes = Math.floor(remainingMinutes / 60);

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

const getHourAndMinutesFromUnix = (unixTimestamp) => {
  // Create a new Date object from the Unix timestamp (in milliseconds)
  const date = new Date(unixTimestamp * 1000);

  // Get the hours and minutes (using zero-padding for single digits)
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  // Return a formatted string
  return `${hours}:${minutes}`;
};

export {
  getDateFromUnix,
  getHourAndMinutes,
  getHourAndMinutesFromUnix,
};
