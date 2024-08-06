import { useReducer } from "react";

const initialState = {
  loading: true,
  data: [],
  error: "",
  popup: false,
  userInfo: [],
  Eg: [],
};
const Reducer = (state, action) => {
  switch (action.type) {
    case "Getdata_Success":
      return {
        ...state,
        loading: false,
        data: action.value,
        error: "",
      };
    // case "Getdata_Failure":
    //   return {
    //     ...state,
    //     loading: false,
    //     error: "Something went Wrong No Data Found",
    //   };
    case "PopUp":
      return {
        ...state,
        popup: !state.popup,
      };
    case "Userdata":
      return {
        ...state,
        userInfo: action.value,
      };
    case "Eg":
      return {
        ...state,
        Eg: action.value,
      };
  }
};

export { Reducer, initialState };
