import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { emulator } from "../components/Emulator";
import cardImg from "../assets/card.png";
import failedCard from "../assets/failedCard.png";
import successCard from "../assets/successCard.png";
import { products } from "../data/products";
import './CardPaymentPage.css';

export default function CardPaymentPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(productId));
  const selectedSize = 300;
  const price = product?.sizes?.find(s => s.ml === selectedSize)?.price;

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);
  const [statusMessages, setStatusMessages] = useState([]);

  useEffect(() => {
    const handleKey = (e) => {
      if (isProcessing || paymentResult !== null) return;

      const key = e.key.toLowerCase();
      if (key === "x" || key === "ч") {
        startEmulatorPayment(true);
      }
      if (key === "y" || key === "н") {
        startEmulatorPayment(false);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isProcessing, paymentResult]);

  const startEmulatorPayment = (isSuccess) => {
    setIsProcessing(true);
    setStatusMessages([]);
    setPaymentResult(null);

    emulator.BankCardPurchase(
      price,
      (result) => {
        setPaymentResult(result);
        setIsProcessing(false);
        if (result) {
          setTimeout(() => navigate(`/prepare/${product.id}`), 2000);
        }
      },
      (message) => {
        setStatusMessages((prev) => [...prev, message]);
      },
      isSuccess // ← передаём флаг результата
    );
  };

  const handleCancel = () => {
    emulator.BankCardCancel();
    setStatusMessages((prev) => [...prev, "Операция отменена"]);
    setTimeout(() => navigate(-1), 2000);
  };

  const handleRetry = () => {
    setStatusMessages([]);
    setPaymentResult(null);
    setIsProcessing(false);
  };

  if (!product || !price) return <p>Напиток не найден</p>;

  const isError = paymentResult === false;
  const isSuccess = paymentResult === true;

  return (
    <div className={`card-payment-page ${isError ? "error-bg" : ""} ${isSuccess ? "success-bg" : ""}`}>
      <div className="card-content">
        <img
          src={isError ? failedCard : isSuccess ? successCard : cardImg}
          alt="card"
          className="card-img"
        />
        <p className={`card-instruction ${(isError || isSuccess) ? "text-white" : ""}`}>
          {isError
            ? "Оплата не прошла"
            : isSuccess
            ? "Оплата прошла успешно!"
            : "Приложите карту к терминалу"}
        </p>
  
        <div className="card-status">
          {isError ? (
            <p className="text-white">Ошибка оплаты</p>
          ) : isSuccess ? null : (
            statusMessages.map((msg, i) => (
              <p key={i}>{msg}</p>
            ))
          )}
        </div>
  
        {/* Показываем инструкцию только до результата */}
        {!isSuccess && !isError && (
          <p className="key-instruction">
            Нажмите <kbd>X</kbd> для успешной оплаты или <kbd>Y</kbd> для ошибки
          </p>
        )}
  
        {isError && (
          <button className="retry-button" onClick={handleRetry}>
            Попробовать ещё раз
          </button>
        )}
      </div>
  
      {!isSuccess && (
        <button
          className={`cancel-button ${isError ? "cancel-transparent text-white" : ""}`}
          onClick={handleCancel}
        >
          Отмена
        </button>
      )}
    </div>
  );  
}
