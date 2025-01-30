import React, { useState } from "react";
import { MdImage } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "@/ReduxStore/hook/CustomHook";
import{
  setFile,setbuttonClick,setDescription,setTitle,setVideoFile,
  postPostFunction,
  postPostFunction2,
  postPostFunction3
} from "../ReduxStore/slices/PostpostSlice"
const Both = () => {
   const dispatch = useAppDispatch();
    const Data = useAppSelector((state)=>state.postPostReducer)
const [file,setFile] = useState(null)
  const [videoFile,setVideoFile]= useState(null);

  console.log("videoFile",videoFile)
  const type = Data.type;
  const Des = Data.description;
  const Title = Data.Title;
  const fileInputRef = React.createRef();

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0])
    // setBothFile(e.target.files[0]);
  };
  const HandleTitleChange = (e) => {
dispatch(setTitle(e.target.value))
  };

  const handleFileChange = (e) => {
    // setFile(e.target.files[0]);
    setFile(e.target.files[0])
  };
  const HandleDiscriptionChange = (e) => {
  dispatch(setDescription(e.target.value))
  };

  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("image", file);
    const desTitle = { Des, Title };
    formData.append("description", JSON.stringify(desTitle));
    // Iterate over FormData entries and log them
 dispatch(postPostFunction3({formData}))
  };

  const handleClearFile = () => {
    // if (fileInputRef.current) {
    fileInputRef.current.value = "";
    // }
    // VideoContext.VideoDispatch({
    //   type: "File_Changes",
    //   value: null,
    // });
    // console.log(BothFile);
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
          <label htmlFor="file-input" className="custom-file-input-label2">
            <div className="uploadImage"></div>
            <img className="uploadPng2" src="image/upload.png" alt="" />
            <p>Select a Image</p>
          </label>
          <div className="Selected">
            {file ? (
              <div className="ganddd">
                <MdImage
                  style={{
                    fontSize: "30px",
                    marginTop: "5px",
                    color: "white",
                  }}
                />
                <p>{file.name}</p>
                <RxCross2
                  onClick={handleClearFile}
                  className="CrossIcon"
                  style={{ fontSize: "30px" }}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
          <input
            id="file-video"
            type="file"
            // name="video"
            style={{ display: "none" }}
            accept="video/*"
            onChange={handleVideoChange}
          />
          <input
            id="file-input"
            name="image"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          <h1>Description:</h1>
          <textarea
            name="message"
            rows="3"
            cols="50"
            placeholder="Writr Your description"
            className="discription"
            onChange={HandleDiscriptionChange}
          ></textarea>
          <h1>Title:</h1>
          <input
            onChange={HandleTitleChange}
            className="Title"
            type="text"
          />{" "}
          <br />
          {file && <button className="btn2 btn3">Upload</button>}
        </form>
      </div>
    </div>
  );
};

export default Both;
