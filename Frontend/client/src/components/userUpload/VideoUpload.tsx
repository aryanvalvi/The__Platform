// "use client"
// import {useAppDispatch, useAppSelector} from "@/ReduxStore/hook/CustomHook"

// import React, {useEffect, useState} from "react"
// import {RiFolderVideoFill} from "react-icons/ri"
// import {IoMdImage} from "react-icons/io"
// import {FaCloudUploadAlt} from "react-icons/fa"
// import {Swiper, SwiperSlide} from "swiper/react"
// import {Navigation, Pagination, Scrollbar, A11y, Autoplay} from "swiper/modules"
// import "swiper/css"
// import "swiper/css/navigation"
// import "swiper/css/pagination"
// import "swiper/css/scrollbar"

// // import "./test.scss"
// import {
//   postPostFunction,
//   setDescription,
//   setFile,
//   setTitle,
// } from "@/ReduxStore/slices/PostpostSlice"
// const VideoUpload = () => {
//   const dispatch = useAppDispatch()
//   const Data = useAppSelector(state => state.postPostReducer)
//   const Des = Data.description
//   const Title = Data.Title
//   console.log(Des, Title)
//   const [moveIcon, setMoveIcon] = useState(false)
//   const [showLines, setShowLines] = useState(false)
//   const [showEndIcons, setShowEndIcons] = useState(false)
//   const [select, setSelect] = useState(false)
//   const [visible, setVisible] = useState(false)
//   const [visible2, setVisible2] = useState(false)
//   const [visible3, setVisible3] = useState(false)
//   const [visible4, setVisible4] = useState(false)
//   const [file, setFile] = useState(null)
//   const [multi, setMulti] = useState([])
//   const [url, setUrl] = useState("")
//   console.log(multi)

//   const HandleDiscriptionChange = e => {
//     dispatch(setDescription(e.target.value))
//   }
//   const HandleTitleChange = e => {
//     dispatch(setTitle(e.target.value))
//   }
//   const handleFileChange = e => {
//     const selectedFile = e.target.files[0]
//     if (selectedFile && selectedFile.type.startsWith("video/")) {
//       setFile(selectedFile)
//       setUrl(URL.createObjectURL(selectedFile))
//     } else {
//       alert("please select a video file")
//     }
//     // setUrl(URL.createObjectURL(selectedFile))
//     console.log(file)
//   }
//   const MultipleFileChange = e => {
//     const selectMultiple = Array.from(e.target.files).filter(file =>
//       file.type.startsWith("video/")
//     )
//     if (selectMultiple.length > 3) {
//       alert("Behen ke lode please only put 3 image")
//       return
//     }
//     const urls = selectMultiple.map(file => URL.createObjectURL(file))
//     console.log(urls)
//     setMulti(urls)
//   }
//   const handleUpload = async e => {
//     e.preventDefault()
//     const formData = new FormData()
//     formData.append("video", file)
//     const DesTitle = {Des, Title}
//     formData.append("description", JSON.stringify(DesTitle))
//     console.log("FormData Entries:")
//     for (let pair of formData.entries()) {
//       console.log(pair[0], pair[1]) // Debugging: See all appended formData values
//     }
//     // dispatch(postPostFunction({formData}))
//     // setopenPopup(true)
//   }
//   useEffect(() => {
//     // setTimeout(() => {
//     //   setVisible(true)
//     // }, 2000)

//     if (file) {
//       setTimeout(() => setMoveIcon(true), 1000) // Show lines after 1s
//       setTimeout(() => setShowEndIcons(true), 3000) // Show end icons after 2s
//       setTimeout(() => setVisible3(true), 1000) // Show end icons after 2s
//       setTimeout(() => setVisible4(true), 3700) // Show end icons after 2s

//       console.log(file)
//       setVisible(true)
//       const timeout = setTimeout(() => {
//         setVisible2(true)
//         // setVisible4(true)
//       }, 3600)

//       return () => clearTimeout(timeout)
//     }
//     if (multi) {
//       console.log(multi)
//     }
//     if (url) {
//       console.log(url)
//     }
//   }, [file, multi])
//   return (
//     <>
//       <div className="CreateContainer">
//         <div className="createFlex">
//           {url ? (
//             <video className="createMainImg" src={url} autoPlay loop></video>
//           ) : (
//             <img
//               className="createMainImg"
//               src={`${url ? url : "./image/Your Design2.jpg"}`}
//               alt=""
//             />
//           )}

//           <div className="rightCreateUpload">
//             <>
//               <div className="uploadContainer">
//                 <label htmlFor="file-input">
//                   <div className="FaCloudContainer">
//                     <FaCloudUploadAlt
//                       className={`uploadIconn2 ${
//                         moveIcon ? "moveTopLeft" : ""
//                       }`}
//                     />
//                     {visible2 && (
//                       <p className="FaP">Click to select main title Video</p>
//                     )}
//                     <p className={`${moveIcon ? "Fap3" : "FaP4"}`}>
//                       Click to select main title Video
//                     </p>
//                   </div>
//                 </label>

//                 <input
//                   id="file-input"
//                   type="file"
//                   accept="video/"
//                   onChange={handleFileChange}
//                   style={{display: "none"}}
//                 />

//                 {visible3 && (
//                   <div className="lineContainer">
//                     <div className={`linee2 ${showLines ? "show" : ""}`}></div>
//                     <div className={`linee3 ${showLines ? "show" : ""}`}></div>
//                   </div>
//                 )}

//                 <div
//                   className={`hiddenIcons ${showEndIcons ? "showIcons" : ""}`}
//                 >
//                   <div>
//                     <IoMdImage
//                       className="uploadIcon3"
//                       style={{fontSize: "50px"}}
//                     />
//                   </div>
//                   <div>
//                     <RiFolderVideoFill
//                       className="uploadIcon3"
//                       style={{fontSize: "50px"}}
//                     />
//                   </div>
//                 </div>
//                 {visible2 && (
//                   <p className="Fap2">
//                     select image or Video upto max 3 qauntity
//                   </p>
//                 )}
//               </div>
//               {/* <div className={`${visible3 ? "RightUplodFlex" : ""}`}>
//                   <div className={`${visible3 ? "afterselect" : ""}`}>
//                     <div
//                       className={`${!visible ? "AddContent" : "AddContent2"}`}
//                     >
//                       <div className="LeftAddContent">
//                         <label htmlFor="file-input">
//                           <FaCloudUploadAlt
//                             className={`uploadIcon2 ${
//                               moveIcon ? "moveTopLeft" : ""
//                             }`}
//                           />
//                           <p>Click to select main title Video</p>
//                         </label>
//                         <input
//                           id="file-input"
//                           name="video"
//                           accept="video/"
//                           type="file"
//                           style={{display: "none"}}
//                           onChange={handleFileChange}
//                         />
//                         <div className="lineContainer">
//                           <div className={`${visible && "line2"}`}></div>
//                           <div className={`${visible && "line3"}`}></div>
//                         </div>
//                         {visible2 && (
//                           <div className="secondUploadContainer">
//                             <label htmlFor="file-input2">
//                               <FaCloudUploadAlt className="uploadIcon" />
//                               <p>Select upto max 3 side video</p>
//                             </label>
//                             <input
//                               id="file-input2"
//                               name="video"
//                               accept="video/"
//                               multiple
//                               type="file"
//                               style={{display: "none"}}
//                               onChange={MultipleFileChange}
//                             />

//                             <label htmlFor="file-input2">
//                               <FaCloudUploadAlt className="uploadIcon" />
//                               <p>Select upto max 3 side video</p>
//                             </label>
//                             <input
//                               id="file-input2"
//                               name="video"
//                               accept="video/"
//                               multiple
//                               type="file"
//                               style={{display: "none"}}
//                               onChange={MultipleFileChange}
//                             />
//                           </div>
//                         )}

//                       </div>
//                     </div>
//                   </div>

//                 </div> */}

//               {visible4 && (
//                 <div className="upload-container2">
//                   <label className="input-label">Description:</label>
//                   <textarea
//                     name="message"
//                     rows="4"
//                     cols="50"
//                     placeholder="Write your description..."
//                     className="description"
//                     onChange={HandleDiscriptionChange}
//                   ></textarea>

//                   <label className="input-label">Title:</label>
//                   <input
//                     onChange={HandleTitleChange}
//                     className="title-input"
//                     type="text"
//                     placeholder="Enter title..."
//                   />

//                   <label className="input-label">Tags:</label>
//                   <input
//                     type="text"
//                     className="tags-input"
//                     placeholder="Add tags..."
//                   />

//                   <button onClick={handleUpload} className="upload-btn">
//                     Upload
//                   </button>
//                 </div>
//               )}
//             </>
//           </div>
//         </div>
//       </div>
//       <div className="sideImagesContainer">
//         {/* <p>Side images</p> */}
//         {multi.length > 1 ? (
//           <>
//             {multi.map(img => (
//               <div className="sideImages">
//                 <video src={img} className="sideimgs" autoPlay loop />
//               </div>
//             ))}
//           </>
//         ) : (
//           <></>
//         )}
//       </div>
//       {/* <h1>Description:</h1> */}
//     </>
//   )
// }

// export default VideoUpload
// // next thing is to add image and video both
