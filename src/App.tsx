import React, { useEffect, useState, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { FeedItem } from "./types/types";
import { ContextData } from "./ContextData";
import SingleNewsPage from "./pages/SingleNewsPage";
import { getFeedItems } from "./hooks/getFeedItems";
const Header = React.lazy(() => import("./components/Header"));
const Home = React.lazy(() => import("./pages/Home"));

function App() {
  const [data, setData] = useState<FeedItem[]>([]);

  useEffect(() => {
    getFeedItems().then((e) => setData(e));
    setInterval(() => {
      setData([]);
      getFeedItems().then((e) => setData(e));
    }, 60000);
  }, []);

  return (
    <ContextData.Provider value={{ data, setData }}>
      <Suspense fallback={<div>Загрузка...</div>}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/item/:id" element={<SingleNewsPage />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ContextData.Provider>
  );
}

export default App;
