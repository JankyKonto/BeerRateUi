export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = padToTwoDigits(date.getMonth() + 1);
  const day = padToTwoDigits(date.getDate());

  return `${day}.${month}.${year}`;
};

export const formatDateAndTime = (date: Date): string => {
  const hours = padToTwoDigits(date.getHours());
  const minutes = padToTwoDigits(date.getMinutes());

  return `${formatDate(date)} ${hours}:${minutes}`;
};

const padToTwoDigits = (num: number) => {
  return num.toString().padStart(2, "0");
};
