import { createContext, useReducer, useState } from "react";
import { initialState, Reducer } from "../Reducer/HomeReducer";
import { useEffect } from "react";
import { InitialStateUpload, ReducerUpload } from "../Reducer/UploadReducer";

export const Homecontext = createContext();

export const HomeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const [stateUpload, dispatchUpload] = useReducer(
    ReducerUpload,
    InitialStateUpload
  );
  //Data Fetching

  const [skip, Setskip] = useState(0);
  // console.log("skip", skip);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 2; // Number of posts per page
  const fetchPosts = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/auth/Getdata?page=${currentPage}&limit=${limit}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      console.log(data.data);
      // setPosts((prevData) => [...prevData, ...data.data]);
      dispatch({
        type: "Getdata_Success",
        value: [...state.data, ...data.data],
      });
      setTotalPages(data.totalPages); // Use `data` instead of `res` to set total pages
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [currentPage]);
  const HandleInfiniteScroll = async () => {
    // console.log("scrollHeight", document.documentElement.scrollHeight);
    // console.log("innerHeight", window.innerHeight);
    // console.log("scrolltop", document.documentElement.scrollTop);
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setCurrentPage((prev) => prev + 1);
      }
      // console.log("hello");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", HandleInfiniteScroll);
    return () => window.removeEventListener("scroll", HandleInfiniteScroll);
  }, []);

  // const fetching = async () => {
  //   try {
  //     const res = await fetch(
  //       `http://localhost:5000/auth/Getdata?skip=${skip}`,
  //       {
  //         method: "GET",

  //         credentials: "include",
  //       }
  //     );
  //     const data = await res.json();
  //     console.log("res is", data.design);
  //     if (data.design.length > 0) {
  //       const newDesign = data.design.filter(
  //         (newItem) =>
  //           !state.data.some((existingItem) => existingItem._id === newItem._id)
  //       );
  //       dispatch({
  //         type: "Getdata_Success",
  //         value: [...state.data, ...newDesign],
  //       });

  //       Setskip((prevSkip) => prevSkip + newDesign.length);
  //       console.log("design length", newDesign.length);
  //     } else {
  //       console.log("Lund ke bal kohli");
  //     }
  //   } catch (error) {
  //     dispatch({ type: "Getdata_Failure" });
  //   }
  // };

  // useEffect(() => {
  //   fetching();
  // }, []);
  // console.log("Function called", skip);

  // useEffect(() => {
  //   console.log("Updated state:", state.data);
  // }, [state.data]);

  //Personal Info Getting
  // const getUserPersonal = async () => {
  //   try {
  //     // Ensure the body is a JSON string
  //     const res = await fetch("http://localhost:5000/auth/getUserPersonal", {
  //       method: "POST",
  //       credentials: "include",
  //       headers: {
  //         "Content-Type": "application/json", // Set content type to JSON
  //       },
  //       body: JSON.stringify(Data.map((f) => f.creator)), // Convert array to JSON
  //     });

  //     if (!res.ok) {
  //       throw new Error(`Error: ${res.status}`); // Check for non-200 responses
  //     }

  //     const data = await res.json(); // Parse the response body as JSON
  //     dispatch({ type: "PersonalInfo", value: data });
  //     console.log("data is", data);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };
  // useEffect(() => {
  //   getUserPersonal();
  // }, []);

  return (
    <Homecontext.Provider
      value={{
        HomeState: state,
        HomeDispatch: dispatch,
        VideoState: stateUpload,
        VideoDispatch: dispatchUpload,
        fetchPosts,
      }}
    >
      {children}
    </Homecontext.Provider>
  );
};
