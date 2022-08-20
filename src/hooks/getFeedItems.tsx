import { FeedItem } from "../types/types";
import axios from "axios";
import { compare } from "../functions/compare";

export const getFeedItems = async function () {
  let arr: FeedItem[] = [];

  for (let i = 1; arr.length < 100; i++) {
    const response = await axios.get<FeedItem[]>(
      `https://api.hnpwa.com/v0/news/${i}.json`
    );
    arr = arr.concat(response.data);
  }
  arr.sort(compare);
  return arr;
};
