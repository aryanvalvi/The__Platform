"use client"
import {useAppDispatch, useAppSelector} from "@/ReduxStore/hook/CustomHook"
import React, {useEffect, useRef, useState} from "react"
import {RiFolderVideoFill} from "react-icons/ri"
import {IoMdImage} from "react-icons/io"
import {FaCloudUploadAlt} from "react-icons/fa"
import {Swiper, SwiperSlide} from "swiper/react"
import {Navigation, Pagination, Scrollbar, A11y, Autoplay} from "swiper/modules"
import "swiper/css"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import {
  FaDribbble,
  FaBehance,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaGithub,
  FaPinterest,
  FaReddit,
  FaTiktok,
  FaMedium,
  FaDeviantart,
  FaCodepen,
} from "react-icons/fa"
import {FaCircleArrowLeft} from "react-icons/fa6"
import {FiEdit} from "react-icons/fi"
import {AiOutlineDelete} from "react-icons/ai"
import {AiOutlineEdit} from "react-icons/ai"
import {RxCrossCircled} from "react-icons/rx"

import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import {RxCross1} from "react-icons/rx"
import {hugeProjectTypes, hugeToolsList} from "../../utils/tools/tools"
import {dribbbleTags} from "../../utils/tags/tags"
import {RiArrowDropDownLine} from "react-icons/ri"
import "./test.scss"
import {FaArrowLeft, FaArrowRight} from "react-icons/fa"
import {HiArrowSmallRight} from "react-icons/hi2"
import {
  postPostFunction,
  setDescription,
  setFile,
  setTitle,
} from "@/ReduxStore/slices/PostpostSlice"
import {isArray} from "lodash"
import {AiOutlinePlusCircle} from "react-icons/ai"
import {search} from "@/utils/search/search"
import getSocialMedia from "../../utils/hooks/getSocialMedia"
const ImageUpload = () => {
  const iconMap = {
    FaDribbble: FaDribbble,
    FaBehance: FaBehance,
    FaInstagram: FaInstagram,
    FaFacebook: FaFacebook,
    FaLinkedin: FaLinkedin,
    FaTwitter: FaTwitter,
    FaYoutube: FaYoutube,
    FaGithub: FaGithub,
    FaPinterest: FaPinterest,
    FaReddit: FaReddit,
    FaTiktok: FaTiktok,
    FaMedium: FaMedium,
    FaDeviantart: FaDeviantart,
    FaCodepen: FaCodepen,
  }
  console.log(getSocialMedia("www.dribbble.com"))
  const wrapperRef = useRef()
  const [dropdown, setDropdown] = useState(false)
  const [dropdownValue, setDropDownValue] = useState("category")
  const [dropdown2, setDropdown2] = useState(false)
  const [dropdownValue2, setDropDownValue2] = useState("Tool")
  const [upload, setUpload] = useState(true)
  const [upload2, setUpload2] = useState(false)
  const [arryImage, setArryImage] = useState([])
  const [next, setNext] = useState(false)
  const [filterData, setFilterData] = useState([])
  const [selectedTag, setSelectedTags] = useState([])
  const [showSearchOption, setShowSearchOption] = useState(false)
  const [link, setLink] = useState()
  console.log(link)
  const [linkset, SetLinkSet] = useState([])
  console.log(linkset)
  const [l, setL] = useState()
  const [edit, setEdit] = useState(false)
  console.log("selected tags", selectedTag)
  const [toggle1, setToggle1] = useState(false)
  console.log("NEXT", next)
  // const [s]
  console.log(arryImage)
  console.log(linkset)

  const success = useAppSelector(state => state.postPostReducer.success)
  const nextFunc = () => {
    if (!Title.trim()) {
      // alert("bruhh")
    }
    if (!Des.trim()) {
    }
    // if (tags.length === 0) {
    //   // setNext(false)
    // } else {
    else setNext(true)
    // }
  }
  const addLink = () => {
    console.log(getSocialMedia(`${link}`))
    const bruh = getSocialMedia(`${link}`)
    console.log(bruh)
    const realIcon = iconMap[bruh]
    SetLinkSet(prev => [...prev, {Icon: realIcon, link: link}])
    setLink("")
  }

  const OptionClearTag = e => {
    const clear = selectedTag.filter(data => data !== e)
    console.log(clear)
    setSelectedTags(clear)
  }
  const onInputChange = e => {
    setShowSearchOption(true)
    setInputTag(e)
    if (e.trim() === "") {
      setFilterData([])
    } else {
      const filterData = search
        .filter(text => text.toLowerCase().includes(e.toLowerCase()))
        .slice(0, 5)
      setFilterData(filterData)
    }
  }
  const TagSelectorFucntion = e => {
    setShowSearchOption(false)
    if (!tags.includes(e)) {
      setTags(prev => [...prev, e])
    }

    console.log(e)
  }
  const editFunction = action => {
    console.log(arryImage)
    if (action === "delete") {
      console.log(index, "delete")
      setArryImage(prev => prev.filter((_, i) => i !== index))
      setEdit(false)
    } else if (action === "change") {
      // setArryImage(prev => prev.filter((_, i) => i !== index))
      const fileInput = document.getElementById("file-input3")
      fileInput?.click()

      setEdit(false)

      console.log("change")
    }
  }

  const editChangeFileFunction = e => {
    const selectedFile = e.target.files[0]
    const img = URL.createObjectURL(selectedFile)
    setArryImage(prev => {
      const Updated = [...prev]
      Updated[index] = img
      return Updated
    })
  }
  const dispatch = useAppDispatch()
  const Data = useAppSelector(state => state.postPostReducer)
  const Des = Data.description
  const Title = Data.Title
  console.log(Des, Title)
  const [index, setIndex] = useState()
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
    console.log("are lavde ke bal")
    console.log("bruhhhhh", e.target.files)
    setUpload(false)
    setUpload2(true)
    setFile(e.target.files[0])
    const selectedFile = e.target.files[0]

    console.log(file)
    setUrl(URL.createObjectURL(selectedFile))
    const img = {
      url: URL.createObjectURL(selectedFile),
      type: selectedFile.type,
    }

    console.log("are bkl gandu sale,", img)
    setArryImage(prev => [...prev, img])
  }
  const MultipleFileChange = e => {
    console.log("open gannum styles", e.target.files)
    const selectMultiple = Array.from(e.target.files)
    if (selectMultiple.length > 4) {
      alert("max side images size is 4")
      return
    }
    console.log(
      "despacito,",
      selectMultiple.map(bruh => bruh)
    )
    const filesArray = selectMultiple.map(file => file)
    console.log("files array", filesArray)
    const urls = selectMultiple.map(file => ({
      url: URL.createObjectURL(file),
      type: file.type,
    }))
    setArryImage(prev => [...prev, ...urls])
    console.log(urls)
    setToggle1(true)
    setMultiImgFile(filesArray)

    setMulti(urls.map(item => item.url))
  }
  const handleUpload = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("image", file)
    multiImgFile.forEach(file => {
      formData.append(`side_images[]`, file)
    })
    const formUserInput = {
      Des,
      Title,
      tags,
      dropdownValue,
      dropdownValue2,
      linkset,
    }
    formData.append("userFormInput", JSON.stringify(formUserInput))

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

  useEffect(() => {
    const handleClickOutside = e => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSearchOption(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
  return (
    <>
      <div
        className={
          arryImage.length > 0 ? "create-container-after" : "create-container"
        }
        // className="create-container"
      >
        <div
          className={
            arryImage.length > 0 ? "content-wrapper-after" : "content-wrapper"
          }
        >
          <div className="create-flex">
            {/* <FiEdit></FiEdit> */}
            {edit && (
              <div className="overlay">
                <div className="inOverlay">
                  <RxCrossCircled className="crossCircle"></RxCrossCircled>
                  <AiOutlineEdit className="edit2"></AiOutlineEdit>
                  <p>Are you sure </p>
                  <p>you want to make changes to this image?</p>
                  <div className="inOverlayFlex">
                    <button
                      onClick={() => editFunction("change")}
                      className="publish-btn"
                    >
                      Replace
                    </button>
                    <button
                      onClick={() => editFunction("delete")}
                      className="delete"
                    >
                      delete
                    </button>
                  </div>
                  {/* <AiOutlineDelete /> */}
                </div>
              </div>
            )}
            <label htmlFor="file-input2" className="plus-button-wrapper">
              {arryImage.length > 0 && (
                <AiOutlinePlusCircle className="plus-button" />
              )}
            </label>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              navigation={{
                nextEl: ".custom-swiper-button-next",
                prevEl: ".custom-swiper-button-prev",
              }}
              slidesPerView={1.2}
              spaceBetween={20}
              centeredSlides={true}
              className="swiper"
            >
              {arryImage.length > 0 ? (
                arryImage.map((e, index) => {
                  const isVideo = e.type && e.type.startsWith("video/")
                  console.log("isVideo:", isVideo)
                  return (
                    <SwiperSlide key={index} className="swiper-slide">
                      {isVideo ? (
                        <video
                          className="create-main-img"
                          src={e.url}
                          autoPlay
                          muted
                          loop
                        />
                      ) : (
                        <img
                          className="create-main-img"
                          src={e.url}
                          alt="Uploaded content"
                        />
                      )}

                      <FiEdit
                        onClick={() => {
                          setIndex(index)
                          setEdit(true)
                        }}
                        className="edit"
                      />
                    </SwiperSlide>
                  )
                })
              ) : (
                <SwiperSlide className="swiper-slide">
                  <div className="placeholder-image">
                    <img
                      className="create-main-img"
                      src="./client_images/Your Design2.jpg"
                      alt=""
                    />
                  </div>
                </SwiperSlide>
              )}

              {/* Navigation arrows */}
              <>
                <div className="custom-swiper-button-prev">
                  <FaArrowLeft
                    style={{display: arryImage.length > 1 ? "flex" : "none"}}
                  />
                </div>
                <div className="custom-swiper-button-next">
                  <FaArrowRight
                    style={{display: arryImage.length > 1 ? "flex" : "none"}}
                  />
                </div>
              </>
            </Swiper>
          </div>
          <div
            className={
              arryImage.length > 0
                ? "right-create-upload-after"
                : "right-create-upload"
            }
          >
            {upload && (
              <div className="left-add-content">
                <div className="upload-icon-container">
                  <label htmlFor="file-input" className="upload-icon-wrapper">
                    <FaCloudUploadAlt className="upload-icon" />
                    <div className="info">
                      <p>Choose a file or drag and drop here!</p>
                      <p>
                        Use high quality .jpg files less than 20 MB or .mp4
                        files less than 50 MB.
                      </p>
                      <p>Only upload files you own the rights</p>
                    </div>
                  </label>
                  <input
                    accept="image/*,video/*"
                    id="file-input"
                    name="image"
                    type="file"
                    className="file-input"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            )}

            {upload2 && (
              <>
                {!next && (
                  <div className="upload-container">
                    <form onSubmit={e => e.preventDefault()}>
                      <input
                        type="file"
                        id="file-input3"
                        name="image"
                        className="file-input"
                        onChange={editChangeFileFunction}
                      />
                      <input
                        id="file-input2"
                        name="image"
                        multiple
                        type="file"
                        accept="image/*,video/*"
                        className="file-input"
                        onChange={MultipleFileChange}
                      />
                      <label className="input-label">Title:</label>
                      <input
                        onChange={HandleTitleChange}
                        className="title-input"
                        type="text"
                        required
                        placeholder="Enter title..."
                        value={Title}
                      />

                      <label className="input-label">Description:</label>
                      <textarea
                        name="message"
                        rows="4"
                        cols="50"
                        required
                        placeholder="Write your description..."
                        className="description"
                        onChange={HandleDiscriptionChange}
                        value={Des}
                      ></textarea>
                      {tags.length > 0 && (
                        <div className="selected-tags">
                          {tags.map((tag, index) => (
                            <span key={index} className="tag-chip">
                              {tag}
                              <button
                                onClick={() => removeTag(tag)}
                                className="remove-tag-btn"
                              >
                                <RxCross1 />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                      <label className="input-label">Tags:</label>
                      <div className="tags-wrapper">
                        <input
                          onChange={e => onInputChange(e.target.value)}
                          value={inputTag}
                          type="text"
                          required
                          className="tags-input"
                          placeholder="Add tags..."
                        />
                        <div ref={wrapperRef} className="filter">
                          {showSearchOption && filterData?.length > 0
                            ? filterData.map(e => (
                                <div
                                  onClick={() => TagSelectorFucntion(e)}
                                  className="search-tags"
                                  key={e}
                                >
                                  <p>{e}</p>
                                </div>
                              ))
                            : null}
                        </div>
                      </div>
                      <div className="tags">
                        {selectedTag?.map(e => (
                          <div className="tag" key={e}>
                            {e}
                            <RxCross1
                              onClick={() => OptionClearTag(e)}
                              className="cross-icon"
                            />
                          </div>
                        ))}
                      </div>
                      <button
                        type="submit"
                        onClick={nextFunc}
                        className="next-btn"
                      >
                        Next
                      </button>
                    </form>
                  </div>
                )}

                {next && (
                  <div className="upload-container">
                    <div className="form2">
                      <div className="category">
                        <label className="input-label">Category:</label>
                        <div className="select">
                          <div
                            onClick={() => setDropdown(!dropdown)}
                            className="search-tag"
                          >
                            {dropdownValue}
                            <RiArrowDropDownLine className="drop-icon" />
                          </div>
                          {dropdown && (
                            <div className="select-options">
                              {hugeProjectTypes.map(e => (
                                <div
                                  onClick={() => {
                                    setDropDownValue(e), setDropdown(false)
                                  }}
                                  className="search-tag"
                                  key={e}
                                >
                                  {e}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="tools">
                        <label className="input-label">Tools:</label>
                        <div className="select">
                          <div
                            onClick={() => setDropdown2(!dropdown2)}
                            className="search-tag"
                          >
                            {dropdownValue2}
                            <RiArrowDropDownLine className="drop-icon" />
                          </div>
                          {dropdown2 && (
                            <div className="select-options">
                              {hugeToolsList.map(e => (
                                <div
                                  onClick={() => {
                                    setDropDownValue2(e), setDropdown2(false)
                                  }}
                                  className="search-tag"
                                  key={e}
                                >
                                  {e}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="external-link-container">
                        <label className="input-label">External links:</label>
                        <div className="link-input-wrapper">
                          <input
                            onChange={e => setLink(e.target.value)}
                            className="title-input"
                            type="text"
                            placeholder="Enter link..."
                            value={link}
                          />
                          <button onClick={addLink} className="add-btn">
                            Add
                          </button>
                        </div>
                        <div className="links">
                          {linkset.map(({Icon, link}, index) => (
                            <div className="inside-link" key={index}>
                              <Icon className="icon" />
                              <p>{link}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="button-container">
                      <button
                        onClick={() => setNext(false)}
                        className="back-btn"
                      >
                        <FaCircleArrowLeft />
                        <p>Back</p>
                      </button>
                      {!success ? (
                        <button onClick={handleUpload} className="publish-btn">
                          Publish
                        </button>
                      ) : (
                        <h1>Published</h1>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        {/* <div className="side-images-container">
          {multi.length > 1 ? (
            <>
              {multi.map((img, index) => (
                <div className="side-images" key={index}>
                  <img src={img} className="side-imgs" alt="Side image" />
                </div>
              ))}
            </>
          ) : (
            <></>
          )}
        </div> */}
      </div>
      {/* <div className="sideImagesContainer">
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
      </div> */}
    </>
  )
}

export default ImageUpload
