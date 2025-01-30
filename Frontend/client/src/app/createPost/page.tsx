"use client"
import { useAppDispatch, useAppSelector } from '@/ReduxStore/hook/CustomHook';
import React, { useEffect, useState } from 'react'
import { MdImage } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import{
  setFile,setbuttonClick,setDescription,setTitle,setVideoFile,
  postPostFunction
} from "../../ReduxStore/slices/PostpostSlice"
import "./Upload.scss"
import Videoupload from '@/components/Videoupload';
import Both from '@/components/Both';
import Popup from '@/components/Popup';
import SuccessPopup from '@/components/successPopup';
const pages = () => {
  const dispatch = useAppDispatch();
  const Data = useAppSelector((state)=>state.postPostReducer)
  console.log("Data",Data)
   const [openPopup, setopenPopup] = useState(false);
  // const VideoContext = useContext(Homecontext);
  // console.log(VideoContext);
  const success = Data.success
  const [file,setFile] = useState(null)
  const filee =Data.file;
  console.log(file)
  const Des  = Data.description
  const Title = Data.Title;
  // console.log("video file", file)
  
  // VideoContext.VideoState.file;
  const type = Data.type;
  // const Des = VideoContext.VideoState.description;
  // const Title = VideoContext.VideoState.Title;
  // console.log(Des);
  // console.log();
  

  // const [description, setDescription] = useState("");
  // console.log(file);

  const fileInputRef = React.createRef();
  const HandleDiscriptionChange = (e) => {


dispatch(setDescription(e.target.value))
  
  };
  const HandleTitleChange = (e) => {
 dispatch(setTitle(e.target.value))
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0])

  };
  // console.log(file.name);
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    const DesTitle = { Des, Title };
    formData.append("description", JSON.stringify(DesTitle));
dispatch(postPostFunction({formData}))
setopenPopup(true)



  
    // const Data = { formData, Des };
    // formData.append("Des",Des);
    // try {
    //   const res = await fetch(
    //     "http://localhost:5000/auth/xyz",

    //     {
    //       method: "POST",
    //       body: formData,
    //       credentials: "include",
    //       // headers: {
    //       //   "Content-Type": "application/json",
    //       // },
    //     }
    //   );
    //   console.log(res.data);
    // } catch (error) {
    //   console.log("error while uploading the img", error);
    // }

  
  };
  const handleButtonclick = (Bindex, div) => {

    dispatch(setbuttonClick({buttonclick:Bindex,type:div}))
  
  };
  const getButtonStyle = (index) => {
    return {
      backgroundColor:
        Data.buttonclick === index ? "orange" : "white",
    };
  };
  const getChnageLeft = (index) => {
    switch (Data.buttonclick) {
      case 1:
        return { left: "365px" };
      case 2:
        return { left: "490px" };
      case 3:
        return { left: "629px" };
      default:
        return { left: "0px" };
    }
  };

  const handleClearFile = () => {
    setFile(null);
    fileInputRef.current.value = null; // Reset the file input
  };
  // const Test = () => {
  //   console.log("Des when i", VideoContext.VideoState.file);
  //   console.log("Des when i2", Des);
  // };
  // useEffect(()=>{
  //   if(success){

  //     setopenPopup(true)
  //   }
  // },[success])

  return (
    <div className="MainUploadContainer">
      {/* <button onClick={Test}>Click me bruhh</button> */}
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
                    <div className="uploadImage"></div>
                    <img className="uploadPng" src="image/upload.png" alt="" />
                    <p>Select a Image</p>
                  </label>
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
                  {file && (
                    <button
                      className="uploadButtom btn2"
                      onClick={handleUpload}
                    >
                      Upload
                    </button>
                  )}
                </div>
              </div>
            )}
            {type === "div2" && <Videoupload></Videoupload>}
            {type === "div3" && <Both></Both>}



            {openPopup && (
              <SuccessPopup setopenPopup={setopenPopup}  openPopup={openPopup} success={success}></SuccessPopup>
            )}

            <div className="rightdescription">
              <img src="./image/Your Design2.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default pages