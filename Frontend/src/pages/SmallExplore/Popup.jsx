import React, { useState } from "react";

const Popup = ({ setopenPopup }) => {
  const [popup, SetPopup] = useState(true);
  const toggleModal = () => {
    // SetPopup(!popup);
    setopenPopup(false);
  };

  return (
    <div>
      {popup && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h1></h1>

            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
