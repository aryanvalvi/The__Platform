"use client"
import {useAppDispatch, useAppSelector} from "@/ReduxStore/hook/CustomHook"

import React, {useEffect, useState} from "react"
import {RiFolderVideoFill} from "react-icons/ri"
import {IoMdImage} from "react-icons/io"
import {FaCloudUploadAlt} from "react-icons/fa"
import {Swiper, SwiperSlide} from "swiper/react"
import {Navigation, Pagination, Scrollbar, A11y, Autoplay} from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"

import "./test.scss"
import {
  postPostFunction,
  setDescription,
  setFile,
  setTitle,
} from "@/ReduxStore/slices/PostpostSlice"
import ImageUpload from "@/components/userUpload/ImageUpload"
import VideoUpload from "@/components/userUpload/VideoUpload"
const Test = () => {
  const dispatch = useAppDispatch()
  const Data = useAppSelector(state => state.postPostReducer)
  const Des = Data.description
  const Title = Data.Title
  console.log(Des, Title)
  const [select, setSelect] = useState(null)
  console.log(select)
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [visible3, setVisible3] = useState(false)
  const [visible4, setVisible4] = useState(false)
  const [file, setFile] = useState(null)
  const [multi, setMulti] = useState([])
  const [url, setUrl] = useState("")
  console.log(multi)

  const HandleDiscriptionChange = e => {
    dispatch(setDescription(e.target.value))
  }
  const HandleTitleChange = e => {
    dispatch(setTitle(e.target.value))
  }
  const handleFileChange = e => {
    setFile(e.target.files[0])
    const selectedFile = e.target.files[0]
    setUrl(URL.createObjectURL(selectedFile))
    console.log(file)
  }
  const MultipleFileChange = e => {
    const selectMultiple = Array.from(e.target.files)
    if (selectMultiple.length > 3) {
      alert("Behen ke lode please only put 3 image")
      return
    }
    const urls = selectMultiple.map(file => URL.createObjectURL(file))
    console.log(urls)
    setMulti(urls)
  }
  const handleUpload = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("image", file)
    const DesTitle = {Des, Title}
    formData.append("description", JSON.stringify(DesTitle))
    console.log("FormData Entries:")
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]) // Debugging: See all appended formData values
    }
    // dispatch(postPostFunction({formData}))
    // setopenPopup(true)
  }
  useEffect(() => {
    // setTimeout(() => {
    //   setVisible(true)
    // }, 2000)

    if (file) {
      console.log(file)
      setVisible(true)
      const timeout = setTimeout(() => {
        setVisible2(true)
        setVisible4(true)
      }, 1110)
      setVisible3(true)

      return () => clearTimeout(timeout)
    }
    if (multi) {
      console.log(multi)
    }
    if (url) {
      console.log(url)
    }
  }, [file, multi, select])
  return (
    <>
      {select === "image" ? (
        <ImageUpload></ImageUpload>
      ) : select === "video" ? (
        <VideoUpload></VideoUpload>
      ) : (
        <div className="CreateContainer">
          <div className="createFlex">
            <img
              className="createMainImg"
              src={`${url ? url : "./image/Your Design2.jpg"}`}
              alt=""
            />

            <div className="rightCreateUpload">
              {!select ? (
                <>
                  <h1>Select a type of Content that you have to publish</h1>
                  <div className="uploadOption">
                    <div
                      onClick={() => setSelect("image")}
                      className="uploadOptionContainer"
                    >
                      <IoMdImage style={{fontSize: "60px"}}></IoMdImage>
                    </div>
                    <p className="Fap5">Images with sub-images</p>
                    <div className="verticalLine"></div>
                    <div
                      onClick={() => setSelect("video")}
                      className="uploadOptionContainer"
                    >
                      <RiFolderVideoFill
                        style={{fontSize: "60px"}}
                      ></RiFolderVideoFill>
                    </div>
                    <p className="Fap6">Video with Sub-Images or Sub-Videos</p>
                  </div>
                </>
              ) : (
                <>
                  {/* <div className={`${visible3 ? "RightUplodFlex" : ""}`}>
                  <div className={`${visible3 ? "afterselect" : ""}`}>
                    <div
                      className={`${!visible ? "AddContent" : "AddContent2"}`}
                    >
                      <div className="LeftAddContent">
                        <label htmlFor="file-input">
                          <FaCloudUploadAlt className="uploadIcon" />
                        </label>
                        <input
                          id="file-input"
                          name="image"
                          type="file"
                          style={{display: "none"}}
                          onChange={handleFileChange}
                        />
                        <p>Click to select main title image</p>
                        <div className={`${visible && "line"}`}></div>
                        {visible2 && (
                          <>
                            <label htmlFor="file-input2">
                              <FaCloudUploadAlt className="uploadIcon" />
                            </label>
                            <input
                              id="file-input2"
                              name="image"
                              multiple
                              type="file"
                              style={{display: "none"}}
                              onChange={MultipleFileChange}
                            />
                            <p>Select upto max 3 side images</p>
                          </>
                        )}
             
                      </div>

                   
                    </div>
                  </div>
                  {visible4 && (
                    <div className="upload-container">
                      <label className="input-label">Description:</label>
                      <textarea
                        name="message"
                        rows="4"
                        cols="50"
                        placeholder="Write your description..."
                        className="description"
                        onChange={HandleDiscriptionChange}
                      ></textarea>

                      <label className="input-label">Title:</label>
                      <input
                        onChange={HandleTitleChange}
                        className="title-input"
                        type="text"
                        placeholder="Enter title..."
                      />

                      <label className="input-label">Tags:</label>
                      <input
                        type="text"
                        className="tags-input"
                        placeholder="Add tags..."
                      />

                      <button onClick={handleUpload} className="upload-btn">
                        Upload
                      </button>
                    </div>
                  )}
                </div> */}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* <h1>Description:</h1> */}
    </>
  )
}

export default Test
