export function formatSeconds(seconds) {
  if (seconds <= 9) return `00:0${seconds}`;
  if (seconds > 9 && seconds < 60) return `00:${seconds}`;
  if (seconds >= 60)
    return `0${Math.floor(seconds / 60)}:${
      seconds % 60 < 9 ? "0" + (seconds % 60) : seconds % 60
    }`;
}
