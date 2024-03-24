// HEX generation formula source => https://stackoverflow.com/questions/5092808/how-do-i-randomly-generate-html-hex-color-codes-using-javascript
// eslint-disable-next-line no-bitwise
export const generateHex = () => ('#000000'.replace(/0/g, () => (~~(Math.random() * 16)).toString(16)));

// Source: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
export const convertHexToRGB = (hex: string) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const newHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(newHex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
};

// Source: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
export const componentToHex = (c: number) => {
  const hex = c.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
};
export const convertRGBtoHex = (r: number, g: number, b: number) => `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;

// Source: https://stackoverflow.com/questions/9733288/how-to-programmatically-calculate-the-contrast-ratio-between-two-colors
export const luminance = (r: number, g: number, b: number) => {
  const a = [r, g, b].map((val) => {
    const v = val / 255;
    return v <= 0.03928
      ? v / 12.92
      : ((v + 0.055) / 1.055) ** 2.4;
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

// Source: https://stackoverflow.com/questions/9733288/how-to-programmatically-calculate-the-contrast-ratio-between-two-colors
export const calculateContrast = (
  rgb1: [number, number, number],
  rgb2: [number, number, number],
) => {
  const lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
  const lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05)
    / (darkest + 0.05);
};
