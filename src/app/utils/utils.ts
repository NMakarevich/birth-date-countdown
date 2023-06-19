export default function toISOStringWithTZ(date: Date) {
  const timezoneOffset = date.getTimezoneOffset() * 60 * 1000;
  const time = date.getTime();
  return new Date(time - timezoneOffset).toISOString().slice(0, 16);
}
