import React from "react";
import { FeedItem, ContextComment, ContextFeedItem } from "./types/types";

export const ContextData = React.createContext<ContextFeedItem>({
  data: [],
  setData: function (par: FeedItem[]) {
    this.data = par;
  },
});
export const ContextComments = React.createContext<ContextComment>({
  comment: {},
  setComment: function (par) {
    this.comment = par;
  },
});
