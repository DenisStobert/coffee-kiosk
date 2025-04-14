import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { emulator } from "../components/Emulator";
import { products } from "../data/products";
import successDrink from "../assets/successDrink.png";
import warningImg from "../assets/warning.png";
import './PreparationPage.css';

export default function PreparationPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(productId));

  const [secondsLeft, setSecondsLeft] = useState(30);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const [vendHandled, setVendHandled] = useState(false);

  useEffect(() => {
    let handled = false;
  
    emulator.Vend(product.id, (result) => {
      if (handled) return;
      handled = true;
  
      if (!result) {
        setError(true);
      } else {
        const timer = setInterval(() => {
          setSecondsLeft((prev) => {
            if (prev === 1) {
              clearInterval(timer);
              setDone(true);
            }
            return prev - 1;
          });
        }, 1000);
  
        return () => clearInterval(timer);
      }
    });
  }, [product.id]);

  useEffect(() => {
    if (done) {
      const timeout = setTimeout(() => navigate("/"), 5000);
      return () => clearTimeout(timeout);
    }
  }, [done, navigate]);

  const formatTime = (s) => `00:${s < 10 ? "0" + s : s}`;

  if (!product) return <p>Напиток не найден</p>;

  if (error) {
    return (
      <div className="prep-container warning-bg">
        <div className="done-block">
          <img src={warningImg} alt="warning" className="drink-image" />
          <p className="prep-done-text">Данного напитка нет в наличии</p>
          <button className="cancel-button" onClick={() => navigate("/")}>
            Вернуться на главную
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`prep-container ${done ? "done-bg" : ""}`}>
      {!done ? (
        <div className="circle-timer">
          <svg className="progress-ring" viewBox="0 0 420 420">
            <g className="spinner-group">
              <circle className="ring-progress" cx="210" cy="210" r="200" />
              <circle
                className="ring-dot"
                cx="210"
                cy="10"
                r="10"
                transform="rotate(180 210 210)"
              />
            </g>
          </svg>
          <div className="time-text">{formatTime(secondsLeft)}</div>
          <div className="label-text">Приготовление напитка</div>
        </div>
      ) : (
        <div className="done-block">
          <img src={successDrink} alt="done" className="drink-image" />
          <p className="prep-done-text">Напиток готов!</p>
          <p className="prep-subtext">Вы можете забрать его</p>
        </div>
      )}
      <p className="key-instruction">
        Нажмите <kbd>Y</kbd> для успешной выдачи или <kbd>X</kbd> для ошибки
      </p>
    </div>
  );
}
