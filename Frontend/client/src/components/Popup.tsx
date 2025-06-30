import {useAppDispatch, useAppSelector} from "@/ReduxStore/hook/CustomHook"
import {SendproposalFunction} from "@/ReduxStore/slices/homeContentSlice"
import React, {use, useEffect, useState} from "react"
import {LuIndianRupee} from "react-icons/lu"
import {RxCross2} from "react-icons/rx"
import {MdCheckCircle} from "react-icons/md"
const Popup = ({setopenPopup, data, post}) => {
  console.log("popup got params", post)
  const [popup, Setpop] = useState(true)
  const [message, setMessage] = useState("")
  const [budget, setBudget] = useState(0)
  const [loading, setLoading] = useState(false)
  const [sendToggle, setSendToggle] = useState(false)
  const dispatch = useAppDispatch()
  const dataa = useAppSelector(state => state.SendproposalReducer.proposal)
  console.log("popup", dataa)
  const toggleModal = () => {
    // SetPopup(!popup);
    setopenPopup(false)
  }
  const SendMessage = () => {
    setLoading(true)
    setSendToggle(true)

    dispatch(SendproposalFunction({message, post, budget}))
  }
  useEffect(() => {
    if (dataa && dataa.success) {
      setLoading(false)
      // setSendToggle(false)
    } else if (!dataa.success) {
      setLoading(true)
    }
  }, [dataa])
  return (
    <div>
      {popup && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          {sendToggle ? (
            <div className="modal-content">
              {loading ? (
                <div className="loader"></div>
              ) : (
                <div className="connectt">
                  <div className="tik">
                    <MdCheckCircle
                      size={50}
                      style={{
                        backgroundColor: "white",
                        borderRadius: "50%",
                      }}
                      color="green"
                    />
                  </div>
                  Message Send
                </div>
              )}
            </div>
          ) : (
            <div className="modal-content">
              <div className="connect">
                <img src={data?.UserProfileImage} className="profile3" alt="" />
                <p>
                  Reach out to
                  <span>{data?.creator.username}</span>
                </p>
              </div>
              <h1>Message</h1>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                type="text"
                placeholder="Please describe your project , including any specific design , timelines and goals"
              />
              <span className="toggleCunt">
                <h1>Excited to connect on a project</h1>
                <label className="toggle-switch">
                  <input type="checkbox" id="toggleMode" />
                  <span className="slider"></span>
                </label>
              </span>

              <div className="btnSend">
                <button className="btn5" onClick={SendMessage} className="btn4">
                  Send Message
                </button>
              </div>

              <span className="close-modal" onClick={toggleModal}>
                <RxCross2 size={30} className="btn5" />
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Popup
