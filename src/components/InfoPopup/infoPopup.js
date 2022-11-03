import "./InfoPopup.css"
import successfully from "../../images/successfully.svg";
import loss from "../../images/loss.svg";

const InfoPopup = ({isOpen, onClose, title, isSuccess}) => {
  return (
    <div className={`infoPopup ${isOpen && "infoPopup_opened"} ${isSuccess ? "infoPopup_successfully" : "infoPopup_lose"}`}>
      <button
          className="infoPopup__close"
          aria-label="Закрыть попап"
          type="button"
          onClick={onClose}
        ></button>
        <img className="infoPopup__image"
          src={`${isSuccess ? successfully : loss}`}
          alt={`${isSuccess ? "Успешно" : "Не успешно"}`}
        />
        <h2 className="infoPopup__title">{title}</h2>
    </div>
  )
}

export default InfoPopup;