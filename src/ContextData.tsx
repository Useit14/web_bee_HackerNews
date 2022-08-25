import React from "react";
import { ContextComment } from "./types/types";

export const ContextComments = React.createContext<ContextComment>({
  comment: {},
  setComment: function (par) {
    this.comment = par;
  },
});
