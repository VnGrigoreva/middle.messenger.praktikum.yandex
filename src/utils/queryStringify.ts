export default function (data: {[key: string]: string} | undefined): string {
  if (!data || typeof data !== 'object') {
    return '';
  }
  const keys = Object.keys(data);
  const result = keys.reduce((agr, item, ind) => {
    return agr + item + '=' + data[item] + (ind < keys.length - 1 ? '&' : '');
  }, '?');
  return result;
}
