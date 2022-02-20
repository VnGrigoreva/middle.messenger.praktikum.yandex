export const trim = (s: string, char?: string) => {
  const removedStr = char || '\\s';
  const findStrStart = `^[${removedStr}]*`;
  const regexpStart = new RegExp(findStrStart, 'g');
  const clearStart = s.replace(regexpStart, '');
  const findStrEnd = `[${removedStr}]*$`;
  const regexpEnd = new RegExp(findStrEnd, 'g');
  return clearStart.replace(regexpEnd, '');
};

export const trimSlashes = (s: string) => trim(s, '/');
