import { createContext, useReducer } from "react";
import { initialState, Reducer } from "../Reducer/HomeReducer";
import { useEffect } from "react";

export const Homecontext = createContext();

export const HomeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  //Data Fetching

  useEffect(() => {
    const fetching = async () => {
      try {
        const res = await fetch("http://localhost:5000/explore");
        const data = await res.json();
        dispatch({ type: "Getdata_Success", value: data });
      } catch (error) {
        dispatch({ type: "Getdata_Failure" });
      }
    };

    fetching();
  }, []);

  return (
    <Homecontext.Provider value={{ HomeState: state, HomeDispatch: dispatch }}>
      {children}
    </Homecontext.Provider>
  );
};
