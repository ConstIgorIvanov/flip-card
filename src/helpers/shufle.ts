import { card } from '../features/card/cardSlice';

export function shufleArr(arr: card[]) {
  let res = arr;
  for (let i = arr.length - 1; i > 0; i--) {
    let randomNum = Math.floor(Math.random() * (i + 1));
    let t = arr[randomNum];
    arr[randomNum] = arr[i];
    arr[i] = t;
  }
  return res;
}
