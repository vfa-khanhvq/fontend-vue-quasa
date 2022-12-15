import moment from 'moment';

export const convertThreeDigitMonth = (month) => {
  return moment(month, 'MM').format('MMM');
};

export const convertTwoDigit = (number) => {
  if (number.toString().length < 2) return '0' + number;
  return number;
};
