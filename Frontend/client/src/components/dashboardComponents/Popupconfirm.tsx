"use client"
import React, {useEffect, useRef} from "react"
import "./dashboardComponents.scss"
const Popupconfirm = ({setpopupClicked, handleunsave}) => {
  const popupRef = useRef(null)
  useEffect(() => {
    const handleClickOutside = event => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setpopupClicked(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
  return (
    <div className="modal2">
      <div className="modal-conten2" ref={popupRef}>
        <div className="PopupconfirmCenter">
          <p>are u sure</p>
          <div className="popupbuttonContainer">
            <button
              onClick={() => {
                handleunsave(), setpopupClicked(false)
              }}
            >
              Yes
            </button>
            <button onClick={() => setpopupClicked(false)}>NO</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Popupconfirm
