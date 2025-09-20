const getLocalDateString = (date) => {
  const d = date || new Date();
  const offset = d.getTimezoneOffset();
  const localTime = new Date(d.getTime() - (offset * 60 * 1000));
  return localTime.toISOString().split('T')[0];
};

export default getLocalDateString;

getLocalDateString();