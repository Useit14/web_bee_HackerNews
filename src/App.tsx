import React, { useEffect, useState, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import { FeedItem, ICompare } from "./types/types";
import { ContextData } from "./ContextData";
import SingleNewsPage from "./pages/SingleNewsPage";
const Header = React.lazy(() => import("./components/Header"));
const Home = React.lazy(() => import("./pages/Home"));

function App() {
  const [data, setData] = useState<FeedItem[]>([]);
  const [count, setCount] = useState(1);
  let idInterval: NodeJS.Timer;

  useEffect(() => {
    clearInterval(idInterval);
    getFeedItems();
    idInterval = setInterval(() => {
      setData([]);
      getFeedItems();
    }, 60000);
  }, []);

  async function getFeedItems() {
    try {
      let arr: FeedItem[] = [];

      const compare: ICompare = (a, b) => {
        let compareHour = parseInt(a["time_ago"]);
        let compareHour1 = parseInt(b["time_ago"]);
        if (isNaN(compareHour)) {
          compareHour = 1;
        }
        if (isNaN(compareHour1)) {
          compareHour1 = 1;
        }
        let compareWord = a["time_ago"].split(" ")[1];
        let compareWord1 = b["time_ago"].split(" ")[1];
        if (compareWord[0] == compareWord1[0]) {
          if (compareHour < compareHour1) {
            return -1;
          } else if (compareHour > compareHour1) {
            return 1;
          } else {
            return 0;
          }
        } else if (compareHour != compareHour1) {
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

      for (let i = 1; arr.length < 100; i++) {
        const response = await axios.get<FeedItem[]>(
          `https://api.hnpwa.com/v0/news/${i}.json`
        );
        arr = arr.concat(response.data);
      }
      arr.sort(compare);
      setData(arr);
    } catch (e) {
      alert(e);
    }
  }
  return (
    <ContextData.Provider value={data}>
      <Suspense fallback={<div>Загрузка...</div>}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route path="/item/:id" element={<SingleNewsPage />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ContextData.Provider>
  );
}

export default App;
