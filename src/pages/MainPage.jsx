import { useNavigate } from "react-router-dom";
import cups from "../assets/cup.png";
import bean from "../assets/bean.png";
import bean1 from "../assets/bean1.png";
import bean2 from "../assets/bean2.png";
import bean3 from "../assets/bean3.png";
import bean4 from "../assets/bean4.png";
import bgTop from "../assets/vector.png";
import bgBot from "../assets/bg-bot.png";
import shy from "../assets/shy.png";
import './MainPage.css';

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="promo-screen" onClick={() => navigate("/select")}>
      <img src={bgTop} alt="top vector" className="bg-top" />
      <img src={bgBot} alt="bottom background" className="bg-bot" />

      <div className="promo-text">
        <h1>
          ЭТО<br />
          <span className="highlight-word">ТВОЙ</span><br />
          КОФЕ
        </h1>
      </div>
      <img src={cups} alt="cups" className="cups-image" />
      <img src={shy} alt="shy" className="shy-image" />
      <img src={bean} alt="bean1" className="bean bean1" />
      <img src={bean1} alt="bean3" className="bean bean2" />
      <img src={bean2} alt="bean4" className="bean bean3" />
      <img src={bean3} alt="bean5" className="bean bean4" />
      <img src={bean4} alt="bean6" className="bean bean5" />
      <p className="touch-text">Коснитесь экрана, чтобы начать</p>
    </div>
  );
}
