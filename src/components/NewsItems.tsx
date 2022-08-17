import React, { FC, useContext } from "react";
import NewsItem from "./NewsItem";
import { ContextData } from "../ContextData";

const NewsItems: FC = () => {
  const data = useContext(ContextData);

  return (
    <div>
      {data.map((item, index) => (
        <NewsItem
          key={item.index}
          index={index + 1}
          comments_count={item.comments_count}
          domain={item.domain}
          points={item.points}
          time={item.time}
          time_ago={item.time_ago}
          url={item.url}
          user={item.user}
          title={item.title}
          id={item.id}
        />
      ))}
    </div>
  );
};

export default NewsItems;
