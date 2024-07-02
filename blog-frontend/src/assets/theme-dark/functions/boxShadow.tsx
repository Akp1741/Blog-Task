import rgba from "assets/theme-dark/functions/rgba";
import pxToRem from "assets/theme-dark/functions/pxToRem";

// Define TypeScript types for the boxShadow function parameters
function boxShadow(
  offset: [number, number] = [0, 0], // Destructure with default value of [0, 0]
  radius: [number, number] = [0, 0], // Destructure with default value of [0, 0]
  color: string, // Expect a string for color
  opacity: number, // Expect a number for opacity
  inset: string = "" // Optional string, default to empty
): string { // Function returns a string
  const [x, y] = offset;
  const [blur, spread] = radius;

  // Construct and return the box-shadow value
  return `${inset} ${pxToRem(x)} ${pxToRem(y)} ${pxToRem(blur)} ${pxToRem(spread)} ${rgba(color, opacity)}`;
}

export default boxShadow;
