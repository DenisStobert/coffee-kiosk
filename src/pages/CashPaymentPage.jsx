import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { emulator } from "../components/Emulator";
import successCard from "../assets/successCard.png";
import moneyIcon from "../assets/money.png"; // <–– добавь иконку
import './CashPaymentPage.css';

const products = [
  { id: 0, name: "Эспрессо", price: 79 },
  { id: 1, name: "Эспрессо", price: 109 },
  { id: 2, name: "Американо", price: 119 },
  { id: 3, name: "Латте", price: 129 },
  { id: 4, name: "Капучино", price: 129 },
  { id: 5, name: "Макиато", price: 129 },
];

export default function CashPaymentPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(productId));

  const [totalInserted, setTotalInserted] = useState(0);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emulator.StartCashin((amount) => {
      setTotalInserted((prev) => prev + amount);
    });

    return () => {
      emulator.StopCashin();
    };
  }, []);

  useEffect(() => {
    if (totalInserted >= product.price) {
      emulator.StopCashin();
      setSuccess(true);

      setTimeout(() => {
        navigate(`/prepare/${product.id}`);
      }, 2000);
    }
  }, [totalInserted]);

  if (!product) return <p>Напиток не найден</p>;

  return (
    <div className={`cash-page ${success ? "success-bg" : ""}`}>
      {success ? (
        <div className="card-content">
          <img src={successCard} alt="success" className="card-img" />
          <p className="card-instruction text-white">Оплата прошла успешно!</p>
        </div>
      ) : (
        <>
          <div className="cash-center-content">
            <img src={moneyIcon} alt="money" className="cash-icon" />
            <h1 className="cash-title">Оплатите наличными</h1>

            <div className="cash-options">
              <div className="cash-option">1 — 10₽</div>
              <div className="cash-option">2 — 50₽</div>
              <div className="cash-option">3 — 100₽</div>
            </div>

            <p className="cash-info">Сумма к оплате: <strong>{product.price} ₽</strong></p>
            <p className="cash-info">Внесено: <strong>{totalInserted} ₽</strong></p>
          </div>

          <button
            className="cancel-button"
            onClick={() => {
              emulator.StopCashin();
              navigate(-1);
            }}
          >
            Отмена
          </button>
        </>
      )}
    </div>
  );
}
