import { BrowserRouter, Routes, Route } from "react-router-dom";
import OnePageLayout from "./components/OnePageLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OnePageLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
