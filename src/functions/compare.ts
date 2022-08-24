import { ICompare } from "../types/types";

export const compare: ICompare = (a, b) => {
  let compareHour = parseInt(a["time_ago"]);
  let compareHour1 = parseInt(b["time_ago"]);
  if (isNaN(compareHour)) {
    compareHour = 1;
  }
  if (isNaN(compareHour1)) {
    compareHour1 = 1;
  }
  const compareWord = a["time_ago"].split(" ")[1];
  const compareWord1 = b["time_ago"].split(" ")[1];
  if (compareWord[0] === compareWord1[0]) {
    if (compareHour < compareHour1) {
      return -1;
    } else if (compareHour > compareHour1) {
      return 1;
    } else {
      return 0;
    }
  } else if (compareHour !== compareHour1) {
    if (compareWord < compareWord1) {
      return 1;
    } else if (compareWord > compareWord1) {
      return -1;
    } else {
      return 0;
    }
  }
  return 0;
};
