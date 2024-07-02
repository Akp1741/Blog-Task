import rgba from "assets/theme/functions/rgba";
import pxToRem from "assets/theme/functions/pxToRem";

function boxShadow(
  offset: [number, number] = [0, 0],
  radius: [number, number] = [0, 0],
  color: string,
  opacity: number,
  inset: string = ""
): string {
  const [x, y] = offset;
  const [blur, spread] = radius;
  return `${inset} ${pxToRem(x)} ${pxToRem(y)} ${pxToRem(blur)} ${pxToRem(spread)} ${rgba(
    color,
    opacity
  )}`;
}

export default boxShadow;

