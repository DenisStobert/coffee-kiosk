// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import PaymentPage from "./pages/PaymentPage";
import CashPaymentPage from "./pages/CashPaymentPage";
import CardPaymentPage from "./pages/CardPaymentPage";
import PreparationPage from "./pages/PreparationPage";
import DrinkSelectionPage from "./pages/DrinkSelectionPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/select" element={<DrinkSelectionPage />} />
        <Route path="/payment/:productId" element={<PaymentPage />} />
        <Route path="/payment/:productId/cash" element={<CashPaymentPage />} />
        <Route path="/payment/:productId/card" element={<CardPaymentPage />} />
        <Route path="/prepare/:productId" element={<PreparationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
