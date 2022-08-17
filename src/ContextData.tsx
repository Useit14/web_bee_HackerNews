import React from "react";
import { FeedItem } from "./types/types";

export const ContextData = React.createContext<FeedItem[]>([]);
