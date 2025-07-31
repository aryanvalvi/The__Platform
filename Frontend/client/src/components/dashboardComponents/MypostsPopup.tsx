"use client"
import React, {useEffect, useRef, useState} from "react"
import "./dashboardComponents.scss"
import {RiArrowDropDownLine, RiImageEditLine} from "react-icons/ri"
import {hugeToolsList} from "@/utils/tools/tools"
import {search} from "@/utils/search/search"
import {RxCross1} from "react-icons/rx"
import {
  postUpdateFunction,
  resetPostUpdateSuccess,
} from "@/ReduxStore/slices/PostpostSlice"

import {useAppDispatch, useAppSelector} from "@/ReduxStore/hook/CustomHook"
import {UserDashBoardFunction} from "@/ReduxStore/slices/UserProfile"
import {DesignPost} from "../../ReduxStore/slices/UserProfile"

interface MypostsPopupProps {
  data: DesignPost
  id: string[] | string | undefined
  setpopupClicked: React.Dispatch<React.SetStateAction<boolean>>
}

const MypostsPopup = ({setpopupClicked, data, id}: MypostsPopupProps) => {
  console.log(setpopupClicked, data, id)
  console.log(id, "id is")
  const dispatch = useAppDispatch()
  console.log(data)
  interface formdata {
    title: string
    description: string
    tags: string[]
    visibility: "public" | "private"
    images_url_for_preview: string
    tools: string
    cover: string
    category: string
    externalLinks: string
  }
  const [formData, setFormData] = useState<formdata>({
    title: data.title || "",
    description: data.description || "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    visibility: data.visibility || "public",
    images_url_for_preview: Array.isArray(data.images)
      ? data.images[0] || ""
      : "",
    tools: Array.isArray(data.tools) ? data.tools[0] || "" : "",
    cover: "",
    category: "",
    externalLinks: "",
  })
  const [dropdown2, setDropdown2] = useState<boolean>(false)
  const [newImageFile, setNewImageFile] = useState<File | null>(null)
  const [dropdownValue2, setDropDownValue2] = useState<string>("Tool")
  const [isToggled, setIsToggled] = useState<boolean>(false)
  const [showTools, setShowTools] = useState<boolean>(true)
  const [showTag, setShowTag] = useState<boolean>(true)
  const [showSearchOption, setShowSearchOption] = useState<boolean>(false)
  const [inputTag, setInputTag] = useState<string>("")
  const [filterData, setFilterData] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [mobileStep, setMobileStep] = useState<number>(1)
  const returnDataFromUpdate = useAppSelector(
    state => state.postPostReducer.postUpdateSuccess
  )
  console.log("checkiiing", returnDataFromUpdate)
  const handleToggle = (type: string) => {
    if (type === "tools") {
      setShowTools(!showTools)
      setFormData(prev => ({
        ...prev,
        tools: "",
      }))
      setIsToggled(prev => !prev)
    } else {
      setShowTag(!showTag)
      setFormData(prev => ({
        ...prev,
        tags: [],
      }))
      setIsToggled(prev => !prev)
    }
  }
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const onInputChange = (e: string) => {
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
  const TagSelectorFucntion = (e: any) => {
    setShowSearchOption(false)
    if (!tags.includes(e)) {
      setTags(prev => [...prev, e])
      setFormData(prev => ({...prev, tags: [...tags, e]}))
      console.log("afatrt selecting tag formdata", formData)
    }

    console.log(e)
  }
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove)) // Remove the tag
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }))
    console.log("after filtering array", formData)
  }
  console.log(formData)
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const {name, value} = e.target
    console.log(name, value, filterData, dropdownValue2)
    setFormData(prev => ({...prev, [name]: value}))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        images_url_for_preview: URL.createObjectURL(file),
      }))
      setNewImageFile(file)
    }
  }

  const handleSave = () => {
    const updateFormData = new FormData()
    if (newImageFile) {
      updateFormData.append("image", newImageFile)
    }

    const userFormInput = {
      Title: formData.title,
      Des: formData.description,
      tags: formData.tags,
      dropdownValue: formData.category,
      dropdownValue2: formData.tools,
      linkset: formData.externalLinks,
      visibility: formData.visibility,
    }
    updateFormData.append("userFormInput", JSON.stringify(userFormInput))

    for (const pair of updateFormData.entries()) {
      console.log("update form data entry", pair[0], pair[1])
    }
    dispatch(postUpdateFunction({postId: data._id, formData: updateFormData}))
  }
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowSearchOption(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
  useEffect(() => {
    if (returnDataFromUpdate) {
      alert("Post updated successfully!")
      if (id) {
        dispatch(UserDashBoardFunction(id))
      }
      setpopupClicked(false)
      dispatch(resetPostUpdateSuccess())
      setpopupClicked(false) // Close the popup
    }
  }, [returnDataFromUpdate, dispatch, setpopupClicked, id])

  return (
    <div className="modal">
      <div onClick={() => setpopupClicked(false)} className="overlay"></div>
      <div className="modal-content">
        <h2>Edit Your Project</h2>
        <div className="left-right-container">
          <div className="modal-content-left">
            <label htmlFor="file-input">
              Change Image
              <div className="imageContentt">
                <img
                  className="mgand"
                  src={formData.images_url_for_preview}
                  alt=""
                />
                <RiImageEditLine className="img-replace"></RiImageEditLine>
              </div>
            </label>
          </div>
          <div className="modal-content-right">
            <span
              className={mobileStep === 1 ? "input-visible" : "input-hidden"}
            >
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </span>

            <span
              className={mobileStep === 1 ? "input-visible" : "input-hidden"}
            >
              <label>Description</label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
              />
            </span>

            <span
              className={mobileStep === 2 ? "input-visible" : "input-hidden"}
            >
              <div className="toolsLabel-Togglecont">
                <label className="input-label">Tags:</label>
                <div className="toggle-container">
                  <div
                    className={`toggle-switch ${!showTag ? "active" : ""}`}
                    onClick={() => handleToggle("tag")}
                  >
                    <div className="toggle-circle"></div>
                  </div>
                  <span className="toggle-label">
                    {isToggled ? "Not to Mentioned" : "Not to Mentioned"}
                  </span>
                </div>
              </div>

              {showTag && (
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
              )}
              {formData?.tags.length > 0 && (
                <div className="selected-tags">
                  {formData.tags.map((tag, index) => (
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
            </span>

            <span
              className={mobileStep === 2 ? "input-visible" : "input-hidden"}
            >
              <div className="tools">
                <div className="toolsLabel-Togglecont">
                  <label className="input-label">Tools:</label>
                  <div className="toggle-container">
                    <div
                      className={`toggle-switch ${!showTools ? "active" : ""}`}
                      onClick={() => handleToggle("tools")}
                    >
                      <div className="toggle-circle"></div>
                    </div>
                    <span className="toggle-label">
                      {isToggled ? "Not to Mentioned" : "Not to Mentioned"}
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
                              setFormData(prev => ({...prev, tools: e}))
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
            </span>

            <span
              className={mobileStep === 2 ? "input-visible" : "input-hidden"}
            >
              <label>Visibility</label>
              <select
                name="visibility"
                value={formData.visibility}
                onChange={handleChange}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </span>
          </div>
        </div>

        <input
          type="file"
          className="file-input"
          id="file-input"
          onChange={handleImageChange}
        />
        {/* <label>Cover Image</label>
        {formData.images && (
          <img
            src={formData.images}
            alt="cover preview"
            style={{width: "100%", marginTop: "10px", borderRadius: "8px"}}
          />
        )} */}

        {/* Optional Collaborator field */}
        {/* <label>Collaborators</label>
        <input type="text" name="collaborators" placeholder="email1, email2" /> */}

        <div className="popup-actions">
          {mobileStep === 1 && (
            <button onClick={() => setMobileStep(2)}>Next</button>
          )}
          {mobileStep === 2 && (
            <button onClick={() => setMobileStep(1)}>back</button>
          )}
          <button onClick={() => setpopupClicked(false)}>Cancel</button>
          {mobileStep === 2 && (
            <button className="saveButton" onClick={handleSave}>
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default MypostsPopup
