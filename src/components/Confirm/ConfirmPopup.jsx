import "./ConfirmPopup.scss";

function ConfirmPopup({ closeModel, title, btnYes, btnNo, confirm }) {
  return (
    <div className="popup">
      <div className="confirm-container">
        <h3>Thông báo</h3>
        <p>{title}</p>
        <div className="confirm-button">
          <button type="submit" className="btn" onClick={() => confirm(true)}>
            {btnYes}
          </button>
          <button
            type="button"
            className="btn cancel"
            onClick={() => {
              confirm(false);
              closeModel(false);
            }}
          >
            {btnNo}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPopup;
