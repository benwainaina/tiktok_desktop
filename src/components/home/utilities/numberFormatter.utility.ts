export const numberFormatterUtility2 = (value: number): string => {
  if (value < 1000) {
    return value.toString();
  } else if (value < 1000000) {
    const [whole, decimal = ''] = (value / 1000).toString().split('.');
    return `${whole}${decimal !== '' ? `.${decimal.charAt(0)}` : ''}k`;
  }
  // return in range of millions
  const [whole, decimal] = (value / 1000000).toString().split('.');
  const millionth = decimal ? decimal.charAt(0) : '0';
  return `${whole}${millionth !== '0' ? `.${millionth}` : ''}m`;
};

export const numberFormatterUtility = (value: number): string => {
  return value.toLocaleString();
};
