import axios from "axios";
import { Item } from "../types/types";

export const getItem = async function (idComment: number) {
  const response = await axios.get<Item>(
    `https://api.hnpwa.com/v0/item/${idComment}.json`
  );
  return response.data;
};
