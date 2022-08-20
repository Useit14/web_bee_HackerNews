import axios from "axios";
import { Item } from "../types/types";

export const getItem = async function (loc: string) {
  const hrefArr = loc.split("/");
  const response = await axios.get<Item>(
    `https://api.hnpwa.com/v0/item/${parseInt(
      hrefArr[hrefArr.length - 1]
    )}.json`
  );
  return response.data;
};
