import {ResultsPage} from "@/components/ResultsPage.jsx";
import {HashRouter, Route, Routes} from "react-router-dom";

export const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<ResultsPage />} />
        <Route path="/:searchParam" element={<ResultsPage />} />
      </Routes>
    </HashRouter>
  )
}