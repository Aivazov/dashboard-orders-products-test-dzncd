const formatDate = (
  dateString: string,
  dateType: boolean,
  locale: string = 'en-US',
) => {
  const date = new Date(dateString);
  if (dateType) {
    return date.toLocaleDateString(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
  return date.toLocaleString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatTime = (date: Date, locale: string = 'en-US') => {
  return date.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export { formatDate, formatTime };
