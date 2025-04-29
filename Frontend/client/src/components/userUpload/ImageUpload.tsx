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
import {dribbbleTags} from "../../utils/tags/tags"
// import "./test.scss"
import {
  postPostFunction,
  setDescription,
  setFile,
  setTitle,
} from "@/ReduxStore/slices/PostpostSlice"
import {isArray} from "lodash"

const ImageUpload = () => {
  const dispatch = useAppDispatch()
  const Data = useAppSelector(state => state.postPostReducer)
  const Des = Data.description
  const Title = Data.Title
  console.log(Des, Title)

  const [select, setSelect] = useState(false)
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [visible3, setVisible3] = useState(false)
  const [visible4, setVisible4] = useState(false)
  const [file, setFile] = useState(null)
  const [multi, setMulti] = useState([])
  const [multiImgFile, setMultiImgFile] = useState([])
  const [url, setUrl] = useState("")
  const [inputTag, setInputTag] = useState("") // For the tag input value
  const [tags, setTags] = useState([]) // Array of selected tags
  const [filtertag, setFilterTag] = useState([])
  console.log(tags)
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
    const filesArray = selectMultiple.map(file => file)
    console.log("files array", filesArray)
    const urls = selectMultiple.map(file => URL.createObjectURL(file))
    console.log(urls)
    setMultiImgFile(filesArray)
    setMulti(urls)
  }
  const handleUpload = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("image", file)
    multiImgFile.forEach(file => {
      formData.append(`side_images[]`, file)
    })
    const DesTitle = {Des, Title}
    formData.append("description", JSON.stringify(DesTitle))
    formData.append("side_images", multi)
    formData.append("tags", JSON.stringify(tags)) // Send tags as JSON string
    console.log("FormData Entries:")
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1])
    }
    dispatch(postPostFunction({formData}))
  }

  useEffect(() => {
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
  }, [file, multi])

  const TagChanged = e => {
    const inputValue = e
    setInputTag(inputValue) // Update the input value
    if (inputValue) {
      const result = dribbbleTags.filter(tag =>
        tag.toLowerCase().startsWith(inputValue.toLowerCase())
      )
      setFilterTag(result)
      console.log("filtered tags", result)
    } else {
      setFilterTag([])
    }
  }

  const addTag = selectedTag => {
    if (!tags.includes(selectedTag)) {
      setTags([...tags, selectedTag]) // Add the selected tag to the array
    }
    setInputTag("") // Clear the input
    setFilterTag([]) // Clear the suggestions
  }

  const removeTag = tagToRemove => {
    setTags(tags.filter(tag => tag !== tagToRemove)) // Remove the tag
  }

  return (
    <>
      <div className="CreateContainer">
        <div className="createFlex">
          <img
            className="createMainImg"
            src={`${url ? url : "./image/Your Design2.jpg"}`}
            alt=""
          />
        </div>

        <div className="rightCreateUpload">
          <>
            <div className={`${visible3 ? "RightUplodFlex" : ""}`}>
              <div className={`${visible3 ? "afterselect" : ""}`}>
                <div className={`${!visible ? "AddContent" : "AddContent2"}`}>
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
                    value={Des}
                  ></textarea>

                  <label className="input-label">Title:</label>
                  <input
                    onChange={HandleTitleChange}
                    className="title-input"
                    type="text"
                    placeholder="Enter title..."
                    value={Title}
                  />

                  <label className="input-label">Tags:</label>
                  <input
                    onInput={e => TagChanged(e.target.value)}
                    value={inputTag}
                    type="text"
                    className="tags-input"
                    placeholder="Add tags..."
                  />
                  {/* Display selected tags */}
                  {tags.length > 0 && (
                    <div className="selected-tags">
                      {tags.map((tag, index) => (
                        <span key={index} className="tag-chip">
                          {tag}
                          <button
                            onClick={() => removeTag(tag)}
                            className="remove-tag-btn"
                          >
                            x
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  {/* Display tag suggestions */}
                  {filtertag.length > 0 && (
                    <div className="tag-suggestions">
                      {filtertag.map((e, index) => (
                        <div className="tags-input2" key={index}>
                          <p onClick={() => addTag(e)}>{e}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                    porro ipsa ex reprehenderit corrupti, eos corporis
                    obcaecati! Obcaecati tempore vero aut, officiis excepturi
                    culpa ea nesciunt beatae, tempora, temporibus incidunt.
                  </p>

                  <button onClick={handleUpload} className="upload-btn">
                    Upload
                  </button>
                </div>
              )}
            </div>
          </>
        </div>
      </div>
      <div className="sideImagesContainer">
        {multi.length > 1 ? (
          <>
            {multi.map(img => (
              <div className="sideImages">
                <img src={img} className="sideimgs" alt="" />
              </div>
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}

export default ImageUpload
