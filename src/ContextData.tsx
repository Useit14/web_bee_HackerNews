import React from "react";
import { FeedItem, IContextComment, IContextFeedItem } from "./types/types";

export const ContextData = React.createContext<IContextFeedItem>({
  data: [],
  setData: function (par: FeedItem[]) {
    this.data = par;
  },
});
export const ContextComments = React.createContext<IContextComment>({
  comment: {},
  setComment: function (par) {
    this.comment = par;
  },
});
