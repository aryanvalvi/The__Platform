const InitialStateUpload = {
  buttonclick: 1,
  file: null,
  videoFile: null,
  description: "",
  type: "div1",
  Title: "",
};

const ReducerUpload = (state, action) => {
  switch (action.type) {
    case "File_Changes":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "Button_Click":
      return {
        ...state,
        buttonclick: action.payload.buttonclick,
        type: action.payload.type,
      };
    case "Set_VideoFile":
      return {
        ...state,
        videoFile: action.value,
      };
  }
};
export { ReducerUpload, InitialStateUpload };
