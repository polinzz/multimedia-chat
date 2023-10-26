export function timeNormalize(updatedAt, entity) {
  const stringToTimestamp = Date.parse(updatedAt)
  const date = new Date(stringToTimestamp)
  return entity === 'conv' ? formatConvTime(date) : formatMessageTime(date);
}

function formatConvTime(messageDate) {
  const currentDate = new Date();
  const oneDay = 24 * 60 * 60 * 1000;

  if (isToday(messageDate, currentDate)) {
    const hours = messageDate.getHours().toString().padStart(2, '0');
    const minutes = messageDate.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  } else if (isYesterday(messageDate, currentDate, oneDay)) {
    return 'Hier';
  } else {
    return messageDate.toLocaleDateString();
  }
}

function formatMessageTime(messageDate) {
  const currentDate = new Date();
  const oneDay = 24 * 60 * 60 * 1000;

  if (isToday(messageDate, currentDate)) {
    const hours = messageDate.getHours().toString().padStart(2, '0');
    const minutes = messageDate.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  } else if (isYesterday(messageDate, currentDate, oneDay)) {
    const hours = messageDate.getHours().toString().padStart(2, '0');
    const minutes = messageDate.getMinutes().toString().padStart(2, '0');
    return `Hier, ${hours}:${minutes}`;
  } else {
    return messageDate.toLocaleDateString();
  }
}

function isYesterday(messageDate, currentDate, oneDay) {
  const yesterday = new Date(currentDate.getTime() - oneDay);
  return (
    messageDate.getDate() === yesterday.getDate() &&
    messageDate.getMonth() === yesterday.getMonth() &&
    messageDate.getFullYear() === yesterday.getFullYear()
  );
}

function isToday(messageDate, currentDate) {
  return (
    messageDate.getDate() === currentDate.getDate() &&
    messageDate.getMonth() === currentDate.getMonth() &&
    messageDate.getFullYear() === currentDate.getFullYear()
  );
}
