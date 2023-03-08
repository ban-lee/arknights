/**
 * From https://awik.io/determine-color-bright-dark-using-javascript/
 * @param colour
 * @returns True if the colour is light
 */
export function isLight(colour: string): boolean {
  // Variables for red, green, blue values
  let r = 0;
  let g = 0;
  let b = 0;

  // Check the format of the color
  if (colour.match(/^rgb/)) {
    // If RGB --> store the red, green, blue values in separate variables
    let rgb = colour.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/) ?? [];

    r = parseInt(rgb[1]);
    g = parseInt(rgb[2]);
    b = parseInt(rgb[3]);
  } else {
    // If hex --> Convert it to RGB: http://gist.github.com/983661
    let rgb = +('0x' + colour.slice(1).replace(colour.length > 4 ? '' : /./g, '$&$&'));

    r = rgb >> 16;
    g = (rgb >> 8) & 255;
    b = rgb & 255;
  }

  // HSP equation from http://alienryderflex.com/hsp.html
  let hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  // Using the HSP value, determine whether the color is light or dark
  return hsp > 127.5;
}
