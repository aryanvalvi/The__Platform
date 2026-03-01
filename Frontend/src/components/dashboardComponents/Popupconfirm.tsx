"use client"
import React, {useEffect, useRef} from "react"
import "./dashboardComponents.scss"

interface PopupConfirmProps {
  setpopupClicked: React.Dispatch<React.SetStateAction<boolean>>
  handleunsave: () => void
}

const Popupconfirm = ({setpopupClicked, handleunsave}: PopupConfirmProps) => {
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setpopupClicked(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [setpopupClicked])

  return (
    <div className="modal3">
      <div className="modal-conten2" ref={popupRef}>
        <div className="PopupconfirmCenter">
          <p>Are you sure?</p>
          <div className="popupbuttonContainer">
            <button
              onClick={() => {
                handleunsave()
                setpopupClicked(false)
              }}
            >
              Yes
            </button>
            <button onClick={() => setpopupClicked(false)}>No</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Popupconfirm
