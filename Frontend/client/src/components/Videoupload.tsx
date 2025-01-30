import React, { useContext, useState } from "react";
import { MdImage } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "@/ReduxStore/hook/CustomHook";
import{
  setFile,setbuttonClick,setDescription,setTitle,setVideoFile,
  postPostFunction,
  postPostFunction2
} from "../ReduxStore/slices/PostpostSlice"
const Videoupload = () => {
  const dispatch = useAppDispatch();
  const Data = useAppSelector((state)=>state.postPostReducer)
  
  const VideoContext = Data.videoFile;
  const [videoFile,setVideoFile]= useState(null);
  console.log(VideoContext);
  // const videoFile = VideoContext.VideoState.videoFile;
  // console.log(videoFile);
  // const type = VideoContext.VideoState.type;
  // console.log(type);
  //video
  const Des = Data.description
  const Title = Data.Title;

  const fileInputRef = React.createRef();

  const handleVideoChange = (e) => {

    setVideoFile(e.target.files[0])
  
    // setVideoFile(e.target.files[0]);
  };

  const HandleDiscriptionChange = (e) => {
dispatch(setDescription(e.target.value))
  };

  const HandleTitleChange = (e) => {
dispatch(setTitle(e.target.value))
  };

  // console.log("file is", videoFile);
  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("video", videoFile);
    const DesTitle = { Des, Title };
    formData.append("description", JSON.stringify(DesTitle));
    dispatch(postPostFunction2({formData}))


    // if (!videoFile) {
    //   console.log("File is not there");
    // }
    // // Iterate over FormData entries and log them
    // for (let [key, value] of formdata.entries()) {
    //   console.log(`xxxxxxxxxxx${key}:`, value);
    // }
    // if (formdata) {
    //   try {
    //     const res = await fetch("http://localhost:5000/auth/UserVideoUpload", {
    //       method: "POST",
    //       body: formdata,
    //       credentials: "include",
    //     });
    //     console.log(res.data);

    //     // const res = await axios.post(
    //     //   "http://localhost:5000/auth/UserVideoUpload",
    //     //   formdata,
    //     //   {
    //     //     withCredentials: true,
    //     //     headers: {
    //     //       "Content-Type": "multipart/form-data",
    //     //     },
    //     //   }
    //     // );
    //   } catch (error) {
    //     console.log("error while uploading", error);
    //   }
    // }
  };

  const handleClearFile = () => {
    setVideoFile(null)
    fileInputRef.current.value = null;
    
  };
  return (
    <div className="VideoUpload">
      <div className="leftDescription">
        <form onSubmit={handleVideoSubmit}>
          <label htmlFor="file-video" className="custom-file-input-label">
            <div className="uploadImage"></div>
            <img className="uploadPng" src="image/upload.png" alt="" />
            <p className="VideoP"> select a Video</p>
          </label>
          {videoFile ? (
            <div className="ganddd">
              <MdImage
                style={{
                  fontSize: "30px",
                  marginTop: "5px",
                  color: "white",
                }}
              />
              <p>{videoFile.name}</p>
              <RxCross2
                onClick={handleClearFile}
                className="CrossIcon"
                style={{ fontSize: "30px" }}
              />
            </div>
          ) : (
            <></>
          )}
          <input
            id="file-video"
            type="file"
            // name="video"
            style={{ display: "none" }}
            accept="video/*"
            onChange={handleVideoChange}
          />
          <h1>Description:</h1>
          <textarea
            onChange={HandleDiscriptionChange}
            name="message"
            rows="3"
            cols="50"
            placeholder="Writr Your description"
            className="discription"
          ></textarea>
          <h1>Title:</h1>
          <input onChange={HandleTitleChange} className="Title" type="text" />
          <br />
          {videoFile && <button className="btn2 btn3">Upload</button>}
        </form>
      </div>
    </div>
  );
};

export default Videoupload;
