"use client"
import React, {useEffect, useRef, useState, Suspense} from "react"
import {useAppDispatch, useAppSelector} from "@/ReduxStore/hook/CustomHook"
import {useRouter} from "next/navigation"
import {
  postPostFunction,
  setDescription,
  setTitle,
} from "@/ReduxStore/slices/PostpostSlice"
import {
  FaCloudUploadAlt,
  FaArrowLeft,
  FaArrowRight,
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
  FaLink,
} from "react-icons/fa"
import {FaCircleArrowLeft} from "react-icons/fa6"
import {RxCrossCircled, RxCross1} from "react-icons/rx"
import {RiArrowDropDownLine, RiEditLine} from "react-icons/ri"
import {AiOutlinePlusCircle} from "react-icons/ai"
import {Swiper, SwiperSlide} from "swiper/react"
import {Navigation, Pagination, Scrollbar, A11y} from "swiper/modules"
import ProtectedRoutes from "@/components/protectedRoutes/ProtectedRoutes"
import {hugeProjectTypes, hugeToolsList} from "../../utils/tools/tools"
import getSocialMedia from "../../utils/hooks/getSocialMedia"
import {search} from "@/utils/search/search"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import "./test.scss"

type FileChangeEvent = React.ChangeEvent<HTMLInputElement>
type ImageItem = {url: string; type: string}
type LinkItem = {Icon: React.ComponentType<{className?: string}>; link: string}

const PublishContent = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [dropdown, setDropdown] = useState<boolean>(false)
  const [dropdownValue, setDropDownValue] = useState<string>("category")
  const [dropdown2, setDropdown2] = useState<boolean>(false)
  const [dropdownValue2, setDropDownValue2] = useState<string>("Tool")
  const [upload, setUpload] = useState<boolean>(true)
  const [upload2, setUpload2] = useState<boolean>(false)
  const [arryImage, setArryImage] = useState<ImageItem[]>([])
  const [next, setNext] = useState<boolean>(false)
  const [filterData, setFilterData] = useState<string[]>([])
  const [selectedTag, setSelectedTags] = useState<string[]>([])
  const [showSearchOption, setShowSearchOption] = useState<boolean>(false)
  const [link, setLink] = useState<string | undefined>(undefined)
  const [showCategory, setShowCategory] = useState<boolean>(true)
  const [showTools, setShowTools] = useState<boolean>(true)
  const [linkset, SetLinkSet] = useState<LinkItem[]>([])
  const [edit, setEdit] = useState<boolean>(false)
  const [index, setIndex] = useState<number | undefined>(undefined)
  const [file, setFile] = useState<File | null>(null)
  const [multi, setMulti] = useState<string[]>([])
  const [multiImgFile, setMultiImgFile] = useState<File[]>([])
  const [inputTag, setInputTag] = useState<string>("")
  const [tags, setTags] = useState<string[]>([])
  const [isToggled, setIsToggled] = useState<boolean>(false)
  const [publish, setPublish] = useState<boolean>(false)
  const [sux, setSux] = useState(false)
  const [error, setError] = useState(false)
  const success = useAppSelector(state => state.postPostReducer.success)
  const status = useAppSelector(state => state.postPostReducer.status)
  const Data = useAppSelector(state => state.postPostReducer)
  const userData = useAppSelector(state => state.UserDataFetchReducer.userData)
  const Des = Data.description
  const Title = Data.Title

  const iconMap = {
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
    FaLink,
  }

  const handleFileChange = (e: FileChangeEvent) => {
    setUpload(false)
    setUpload2(true)
    setFile(e.target.files?.[0] || null)
    const selectedFile = e.target.files?.[0] || null
    if (selectedFile) {
      const img = {
        url: URL.createObjectURL(selectedFile),
        type: selectedFile.type,
      }
      setArryImage(prev => [...prev, img])
    }
  }

  const MultipleFileChange = (e: FileChangeEvent) => {
    const filelist = e.target.files
    if (!filelist) return
    const selectMultiple = Array.from(filelist)
    if (selectMultiple.length > 4) {
      alert("max side images size is 4")
      return
    }
    const filesArray = selectMultiple.map(file => file)
    const urls = selectMultiple.map(file => ({
      url: URL.createObjectURL(file),
      type: file.type,
    }))
    setArryImage(prev => [...prev, ...urls])
    setMultiImgFile(filesArray)
    setMulti(urls.map(item => item.url))
  }

  const handleUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setPublish(true)
    setSux(true)
    e.preventDefault()
    if (!file) {
      alert("Main image is required")
      return
    }
    const formData = new FormData()
    formData.append("image", file)
    multiImgFile.forEach(file => formData.append(`side_images[]`, file))
    const formUserInput = {
      Des,
      Title,
      tags,
      dropdownValue,
      dropdownValue2,
      linkset,
    }
    formData.append("userFormInput", JSON.stringify(formUserInput))
    dispatch(postPostFunction({formData}))
  }

  const addLink = () => {
    if (!link || link.trim() === "") return
    const iconKey = getSocialMedia(link)
    const selectedIcon =
      iconMap[iconKey as keyof typeof iconMap] || iconMap.FaLink
    SetLinkSet((prev: any) => [...prev, {Icon: selectedIcon, link: link}])
    setLink("")
  }

  const handleToggle = (type: "category" | "tools") => {
    if (type === "category") {
      setShowCategory(!showCategory)
      setDropDownValue("")
      setIsToggled(prev => !prev)
    } else {
      setShowTools(!showTools)
      setDropDownValue2("")
      setIsToggled(prev => !prev)
    }
  }

  const nextFunc = () => {
    if (!Title.trim() || !Des.trim()) return
    setNext(true)
  }

  const OptionClearTag = (e: string) => {
    const clear = selectedTag.filter(data => data !== e)
    setSelectedTags(clear)
  }

  const onInputChange = (value: string) => {
    setShowSearchOption(true)
    setInputTag(value)
    if (value.trim() === "") {
      setFilterData([])
    } else {
      const filterData = search
        .filter(text => text.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5)
      setFilterData(filterData)
    }
  }

  const TagSelectorFucntion = (e: string) => {
    setShowSearchOption(false)
    if (!tags.includes(e)) {
      setTags(prev => [...prev, e])
    }
  }

  const editFunction = (action: "delete" | "change") => {
    if (action === "delete") {
      setArryImage(prev => prev.filter((_, i) => i !== index))
      setEdit(false)
    } else if (action === "change") {
      const fileInput = document.getElementById("file-input3")
      fileInput?.click()
      setEdit(false)
    }
  }

  const editChangeFileFunction = (e: FileChangeEvent) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile || index === undefined) return
    const img = URL.createObjectURL(selectedFile)
    setArryImage(prev => {
      const Updated = [...prev]
      Updated[index] = {url: img, type: selectedFile.type}
      return Updated
    })
  }

  const HandleDiscriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch(setDescription(e.target.value))
  }

  const HandleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(e.target.value))
  }

  const removeTag = (tagToRemove: any) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const okayFunction = () => {
    setPublish(false)
    if (!error && userData?._id) {
      router.push(`/dashboard/profile/${userData._id}`)
    }
  }

  useEffect(() => {
    if (status === "succeeded") {
      setSux(false)
    } else if (status === "failed") {
      setSux(false)
      setError(true)
    }
  }, [status])

  useEffect(() => {
    if (file) {
      const timeout = setTimeout(() => {}, 1110)
      return () => clearTimeout(timeout)
    }
  }, [file, multi])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowSearchOption(false)
      }
      if (
        overlayRef.current &&
        !overlayRef.current.contains(e.target as Node)
      ) {
        setEdit(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <ProtectedRoutes>
      <div
        className={
          arryImage.length > 0 ? "create-container-after" : "create-container"
        }
      >
        <div
          className={
            arryImage.length > 0 ? "content-wrapper-after" : "content-wrapper"
          }
        >
          <div className="create-flex">
            {publish && (
              <div className="overlay">
                <div className="inOverlay">
                  {sux ? (
                    <div className="loader" />
                  ) : (
                    <div className="TikContainer">
                      <span>
                        {!error ? (
                          <svg className="checkmark" viewBox="0 0 52 52">
                            <circle
                              className="circle"
                              cx="26"
                              cy="26"
                              r="25"
                              fill="none"
                            />
                            <path
                              className="check"
                              fill="none"
                              d="M14.1 27.2l7.1 7.2 16.7-16.8"
                            />
                          </svg>
                        ) : (
                          <></>
                        )}
                        {error ? (
                          <h1>error while uploading</h1>
                        ) : (
                          <h1>Published</h1>
                        )}
                      </span>
                      <button onClick={okayFunction} className="okay">
                        Okay
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            {edit && (
              <div className="overlay">
                <div className="inOverlay" ref={overlayRef}>
                  <RxCrossCircled
                    onClick={() => setEdit(false)}
                    className="crossCircle"
                  />
                  <RiEditLine className="edit2" />
                  <p>Are you sure</p>
                  <p>you want to make changes to this image?</p>
                  <div className="inOverlayFlex">
                    <button
                      onClick={() => editFunction("change")}
                      className="publish-btn"
                    >
                      Replace
                    </button>
                    {arryImage.length > 1 ? (
                      <button
                        onClick={() => editFunction("delete")}
                        className="delete"
                      >
                        delete
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
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
                      <RiEditLine
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
                    <div>
                      <FaCloudUploadAlt className="upload-icon" />
                    </div>
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
                        rows={4}
                        cols={50}
                        required
                        placeholder="Write your description..."
                        className="description"
                        onChange={HandleDiscriptionChange}
                        value={Des}
                      />
                      {tags.length > 0 && (
                        <div className="selected-tags">
                          {tags.map(tag => (
                            <span key={tag} className="tag-chip">
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
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onInputChange(e.target.value)
                          }
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
                        <div className="label-toggle">
                          <label className="input-label">Category:</label>
                          <div className="toggle-container">
                            <div
                              className={`toggle-switch ${
                                !showCategory ? "active" : ""
                              }`}
                              onClick={() => handleToggle("category")}
                            >
                              <div className="toggle-circle" />
                            </div>
                            <span className="toggle-label">
                              {isToggled
                                ? "Not to Mentioned"
                                : "Not to Mentioned"}
                            </span>
                          </div>
                        </div>
                        {showCategory && (
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
                                      setDropDownValue(e)
                                      setDropdown(false)
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
                        )}
                      </div>
                      <div className="tools">
                        <div className="label-toggle">
                          <label className="input-label">Tools:</label>
                          <div className="toggle-container">
                            <div
                              className={`toggle-switch ${
                                !showTools ? "active" : ""
                              }`}
                              onClick={() => handleToggle("tools")}
                            >
                              <div className="toggle-circle" />
                            </div>
                            <span className="toggle-label">
                              {isToggled
                                ? "Not to Mentioned"
                                : "Not to Mentioned"}
                            </span>
                          </div>
                        </div>
                        {showTools && (
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
                                      setDropDownValue2(e)
                                      setDropdown2(false)
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
                        )}
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
      </div>
    </ProtectedRoutes>
  )
}

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PublishContent />
    </Suspense>
  )
}

export default Page
