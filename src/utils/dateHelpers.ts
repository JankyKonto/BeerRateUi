export const formatDate = (date: Date): string => {
  const year = date.getUTCFullYear();
  const month = padToTwoDigits(date.getUTCMonth() + 1);
  const day = padToTwoDigits(date.getUTCDate());

  return `${day}.${month}.${year}`;
};

export const formatDateAndTime = (date: Date): string => {
  const hours = padToTwoDigits(date.getUTCHours());
  const minutes = padToTwoDigits(date.getUTCMinutes());

  return `${formatDate(date)} ${hours}:${minutes}`;
};

const padToTwoDigits = (num: number) => {
  return num.toString().padStart(2, "0");
};
