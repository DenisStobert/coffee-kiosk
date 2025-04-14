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
  const [waitingForCard, setWaitingForCard] = useState(true);

  useEffect(() => {
    emulator.BankCardPurchase(
      price,
      (result) => {
        setPaymentResult(result);
        setIsProcessing(false);
        setWaitingForCard(false);
        if (result) {
          setTimeout(() => navigate(`/prepare/${product.id}`), 2000);
        }
      },
      (msg) => {
        setStatusMessages(prev => {
          if (prev.at(-1) !== msg) {
            return [...prev, msg];
          }
          return prev;
        });
      }
    );
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (!waitingForCard || isProcessing) return;

      const key = e.key.toLowerCase();
      if (key === "a") {
        setIsProcessing(true);
        setWaitingForCard(false);
        emulator.__triggerCardRead(true);
      }
      if (key === "d") {
        setIsProcessing(true);
        setWaitingForCard(false);
        emulator.__triggerCardRead(false);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [waitingForCard, isProcessing]);

  const handleCancel = () => {
    if (waitingForCard) {
      emulator.BankCardCancel();
      setStatusMessages(prev => [...prev, "Операция отменена"]);
      setTimeout(() => navigate(-1), 1500);
    }
  };

  const handleRetry = () => {
    window.location.reload();
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

        {!isError && !isSuccess && (
          <div className="card-status">
            {statusMessages.map((msg, i) => (
              <p key={i}>{msg}</p>
            ))}
          </div>
        )}

        {!isSuccess && !isError && (
          <p className="key-instruction">
            Нажмите <kbd>A</kbd> для успешной оплаты или <kbd>D</kbd> для ошибки
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
