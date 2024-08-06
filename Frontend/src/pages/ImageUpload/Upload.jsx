import React, { useState } from "react";
import axios from "axios";
import "./Upload.scss";
const Upload = () => {
  const [color, setColor] = useState("orange");
  const [buttonclick, setButtonClick] = useState(1);
  const [file, setFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [des, setDes] = useState("");
  const [type, setType] = useState("div1");
  console.log(file);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  // console.log(file.name);
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post("http://localhost:5000/auth/xyz", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
    } catch (error) {
      console.log("error while uploading the img", error);
    }

    if (des) {
      axios.post("http://localhost:5000/uploadData", { des });
    } else {
      alert("please write some description");
    }
  };
  const handleButtonclick = (Bindex, div) => {
    setButtonClick(Bindex);
    setType(div);
  };
  const getButtonStyle = (index) => {
    return {
      backgroundColor: buttonclick === index ? "orange" : "white",
    };
  };
  const getChnageLeft = (index) => {
    switch (buttonclick) {
      case 1:
        return { left: "390px" };
      case 2:
        return { left: "510px" };
      case 3:
        return { left: "629px" };
      default:
        return { left: "0px" };
    }
  };

  //video

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  };
  console.log("file is", videoFile);
  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile) {
      console.log("File is not there");
    }
    const formdata = new FormData();
    formdata.append("video", videoFile);
    // Iterate over FormData entries and log them
    for (let [key, value] of formdata.entries()) {
      console.log(`xxxxxxxxxxx${key}:`, value);
    }
    if (formdata) {
      try {
        const res = await axios.post(
          "http://localhost:5000/auth/UserVideoUpload",
          formdata,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(res);
      } catch (error) {
        console.log("error while uploading", error);
      }
    }
  };

  return (
    <div className="MainUploadContainer">
      <div className="Option">
        <div className="Options">
          <button
            onClick={() => handleButtonclick(1, "div1")}
            style={getButtonStyle(1)}
            className="btn2"
          >
            Image
          </button>
          <button
            onClick={() => handleButtonclick(2, "div2")}
            style={getButtonStyle(2)}
            className="btn2"
          >
            Video
          </button>
          <button
            onClick={() => handleButtonclick(3, "div3")}
            style={getButtonStyle(3)}
            className="btn2"
          >
            Both
          </button>
        </div>

        <div className="MainShape">
          <div style={getChnageLeft()} className="shape"></div>
          <div className="Uploadcontainer">
            {type === "div1" && (
              <div className="ImageUpload">
                <div className="leftDescription">
                  <label
                    htmlFor="file-input"
                    className="custom-file-input-label"
                  >
                    <div className="uploadImage">
                      {file ? (
                        <div className="UploadP">
                          <p>{file.name}</p>
                        </div>
                      ) : (
                        <div className="UploadP">
                          <p> select a img</p>
                        </div>
                      )}
                      <img src="image/upload.png" alt="" />
                    </div>
                  </label>
                  <input
                    id="file-input"
                    name="image"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <br />
                  <textarea
                    name="message"
                    rows="3"
                    cols="50"
                    placeholder="Writr Your description"
                    className="discription"
                    onChange={(e) => setDes(e.target.value)}
                  ></textarea>

                  <br />
                </div>
              </div>
            )}
            {type === "div2" && (
              <div className="VideoUpload">
                <form onSubmit={handleVideoSubmit}>
                  <input
                    type="file"
                    // name="video"
                    accept="video/*"
                    onChange={handleVideoChange}
                  />
                  {videoFile && <button>Upload</button>}
                </form>
              </div>
            )}
            {type === "div3" && (
              <div className="BothUpload">
                <h1>Both</h1>
              </div>
            )}

            {file && (
              <button className="uploadButtom" onClick={handleUpload}>
                Upload
              </button>
            )}

            <div className="rightdescription">
              <p className="UploadText">Show Your Talent To The World</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
