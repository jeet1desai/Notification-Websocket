import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NullPage from "./pages/NullPage";
import PostPage from "./pages/PostPage";

import socketIO from "socket.io-client";
const socket = socketIO.connect("http://localhost:4000");

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/post" element={<PostPage socket={socket} />} />
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<NullPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
