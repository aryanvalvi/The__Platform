import React, { useEffect, useState } from 'react'
import "./sucess.scss"
import { MdCheckCircle } from 'react-icons/md';
const SuccessPopup = ({setopenPopup, openPopup ,success} ) => {
  const[popup,setPop]= useState(true)
//   useEffect(()=>{
// setopenPopup(false)
//   },[success])
  const toggleModal = (e) => {
e.preventDefault();
    // SetPopup(!popup);
    if(success){


      setopenPopup(false);
    }
  };
  return (
    <>
    {popup &&

      <div className='modal'>
      <div onClick={toggleModal} className="overlay">
      <div className="modal-content">
        {success?
        <div>
    <div className='connecttt'>
              <div className="tikk">

            <MdCheckCircle size={50} style={{
                backgroundColor: "white", 
                borderRadius:"50%"
            }} color='green'/>
              </div>
              <h1>
            Message Send

              </h1>
            </div>
          
        </div> :
        <div className="loaderContainer">

          <div className="loader"></div>
        </div>
        
      }
      {/* <button onClick={toggleModal}>click</button> */}
      </div>
      </div>
      </div>
    }
    </>
    )
}

export default SuccessPopup