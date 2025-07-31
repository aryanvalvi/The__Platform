import {useAppDispatch, useAppSelector} from "@/ReduxStore/hook/CustomHook"
import React, {useEffect, useState} from "react"
import {RxCross2} from "react-icons/rx"
import {MdCheckCircle} from "react-icons/md"
import {sendMessage} from "@/ReduxStore/slices/MessageSlice"
interface HomeContent {
  _id: string
  title: string
  description: string
  UserProfileImage: string
  creator: {
    _id: string
    googleID: string
    username: string
    userImage: string
    following: string[]
  }
  comments: any[]
  createdAt: string
  downloads: number
  externalLinks: string[]
  images: string[]
  likes: string[]
  saves: string[]
  sideImages: string[]
  tags: string[]
  tools: string[]
  video: string | null
  views: number
  visibility: string
  __v: number
}

interface PopupProps {
  openPopup: boolean
  setopenPopup: React.Dispatch<React.SetStateAction<boolean>>
  mainDesign: HomeContent | null
  data?: {UserProfileImage?: string; creator?: {username?: string}}
  post: unknown
  conversationid: string
}
// import "../app/detailInfo/[id]/Moreinfo.scss"
const Popup = ({
  openPopup,
  setopenPopup,
  mainDesign,
  post,
  conversationid,
}: PopupProps) => {
  console.log("popup got params", post)
  console.log("conversation id", conversationid)

  const [message, setMessage] = useState("")
  console.log(message)

  const [loading, setLoading] = useState(false)
  const [sendToggle, setSendToggle] = useState(false)
  const dispatch = useAppDispatch()

  const toggleModal = () => {
    // SetPopup(!popup);
    setopenPopup(false)
  }
  const SendMessage = () => {
    setLoading(true)
    setSendToggle(true)
    dispatch(sendMessage({conversationid, message}))
    // dispatch(SendproposalFunction({message, post, budget}))
  }
  const send = useAppSelector(state => state.MessageReducer.send)
  useEffect(() => {
    if (send === true) {
      setLoading(false)
      // setSendToggle(false)
    }
  }, [send])
  return (
    <div>
      {openPopup && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          {sendToggle ? (
            <div className="modal-content">
              {loading ? (
                <div className="connectt">
                  <div className="loader"></div>
                </div>
              ) : (
                <div className="connectt">
                  <div className="tik">
                    <MdCheckCircle
                      className="tik"
                      // size={50}
                      style={{
                        backgroundColor: "white",
                        borderRadius: "50%",
                      }}
                      color="green"
                    />
                  </div>
                  <p>Message Send</p>
                </div>
              )}
            </div>
          ) : (
            <div className="modal-content">
              <div className="connect">
                <img
                  src={mainDesign?.UserProfileImage}
                  className="profile3"
                  alt=""
                />
                <p>
                  Reach out to
                  <span>{mainDesign?.creator.username}</span>
                </p>
              </div>
              <h1>Message</h1>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
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
                <button className="btn5" onClick={SendMessage}>
                  Send Message
                </button>
                {/* <div className="loader"></div> */}
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
