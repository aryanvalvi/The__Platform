import React from "react";
import Home from "./pages/Home/Home";
import Router from "./pages/Home/Router";
import { HomeContextProvider } from "./Context/Home";
const App = () => {
  return (
    <div>
      <HomeContextProvider>
        <Router></Router>
      </HomeContextProvider>
    </div>
  );
};

export default App;
