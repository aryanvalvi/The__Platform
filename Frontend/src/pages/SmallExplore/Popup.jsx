import React, { useState } from "react";
import { LuIndianRupee } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";

const Popup = ({ setopenPopup, data }) => {
  console.log(data);
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
            <div className="connect">
              <img src={data.UserProfileImage} className="profile2" alt="" />
              <p>Connect With {data.creator.username}</p>
            </div>
            <h1>Project Detail</h1>
            <textarea
              type="text"
              placeholder="Please describe your project , including any specific design , timelines and goals"
            />

            <h1>Project Budget</h1>
            <span className="Rupeecontainer">
              <input type="number" />
              <LuIndianRupee className="Rupee" />
            </span>
            <div className="btnSend">
              <button className="btn4">Send Message</button>
            </div>

            <span className="close-modal" onClick={toggleModal}>
              <RxCross2 size={30} className="btn5" />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
