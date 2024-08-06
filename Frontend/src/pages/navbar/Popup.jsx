import React, { useContext } from "react";
import { Homecontext } from "../../Context/Home";

const Popup = () => {
  const homecontext = useContext(Homecontext);
  console.log(homecontext.HomeState.popup);
  const closePop = () => {
    homecontext.HomeDispatch({ type: "PopUp" });
  };
  return (
    <>
      {homecontext.HomeState.popup && (
        <div className="popup-backdrop">
          <div className="popup2">
            <h1>hello</h1>
            <button onClick={closePop}>close</button>
            <p>Get in touch</p>
            <p>Available for work</p>
            <p>follow</p>
            <p>link</p>
            <p>About him</p>
            <p>Skill</p>
          </div>
        </div>
      )}
      <button className="CloseButtonWobbbly button" onClick={closePop}>
        Edit Your Profile
      </button>
    </>
  );
};

export default Popup;
