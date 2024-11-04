import React from "react";
import { useContext } from "react";
import { Homecontext } from "../../Context/Home";
import { MdImage } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
const Both = () => {
  const VideoContext = useContext(Homecontext);
  const file = VideoContext.VideoState.file;
  const videoFile = VideoContext.VideoState.videoFile;
  const type = VideoContext.VideoState.type;
  const Des = VideoContext.VideoState.description;
  const Title = VideoContext.VideoState.Title;
  const fileInputRef = React.createRef();

  const handleVideoChange = (e) => {
    VideoContext.VideoDispatch({
      type: "Set_VideoFile",
      value: e.target.files[0],
    });
    console.log(BothFile);
    e.target.value = null;
    // setBothFile(e.target.files[0]);
  };
  const HandleTitleChange = (e) => {
    VideoContext.VideoDispatch({
      type: "File_Changes",
      field: "Title",
      value: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    // setFile(e.target.files[0]);
    VideoContext.VideoDispatch({
      type: "File_Changes",
      field: "file",
      value: e.target.files[0],
    });
  };
  const HandleDiscriptionChange = (e) => {
    VideoContext.VideoDispatch({
      type: "File_Changes",
      field: "description",
      value: e.target.value,
    });
  };

  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      console.log("File is not there");
    }
    const formdata = new FormData();
    formdata.append("video", videoFile);
    formdata.append("image", file);
    const desTitle = { Des, Title };
    formdata.append("description", JSON.stringify(desTitle));
    // Iterate over FormData entries and log them
    for (let [key, value] of formdata.entries()) {
      console.log(`xxxxxxxxxxx${key}:`, value);
    }
    if (formdata) {
      try {
        const res = await fetch(
          "http://localhost:5000/auth/both",

          {
            method: "POST",
            body: formdata,
            credentials: "include",
          }
        );
        console.log(res.data);
      } catch (error) {
        console.log("error while uploading", error);
      }
    }
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
