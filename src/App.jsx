import React from "react";
import "./App.css";
import useAuthCheck from "./hooks/useAuthCheck";
import Routers from "./Routers";

function App() {
  const authChecked = useAuthCheck();
  return !authChecked ? <div>Checking authentication....</div> : <Routers />;
}

export default App;
