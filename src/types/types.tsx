export interface FeedItem {
  index?: number;
  id: number;
  title: string;
  url: string;
  domain: string;
  points: number;
  user: string;
  time: number;
  time_ago: string;
  comments_count: number;
}

export interface Item {
  id: number;
  title: string;
  points: number | null;
  user: string | null;
  time: number;
  time_ago: string;
  content: string;
  deleted?: boolean;
  dead?: boolean;
  type: string;
  url?: string;
  domain?: string;
  comments: Item[]; // Comments are items too
  level: number;
  comments_count: number;
}

export interface IObjCompare {
  time_ago: string;
}

export interface ICompare {
  (a: IObjCompare, b: IObjCompare): number;
}
