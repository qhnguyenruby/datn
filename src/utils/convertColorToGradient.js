import { increaseBrightness } from "./increaseBrightness";

const PERCENT_BRIGHTNESS = 20;

export const convertColorToGradient = (hex) => {
  const newColor = increaseBrightness(hex, PERCENT_BRIGHTNESS);
  return `linear-gradient(180deg, ${newColor} 0%, ${hex} 100%)`;
};
