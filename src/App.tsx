import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingleNewsPage from "./pages/SingleNewsPage";
const Header = React.lazy(() => import("./components/Header"));
const Home = React.lazy(() => import("./pages/Home"));

function App() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item/:id" element={<SingleNewsPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
