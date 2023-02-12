const getToday = () => {
  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(-1);

  return today;
};

export default getToday;
